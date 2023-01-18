import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    List,
    useMediaQuery,
    useTheme
} from "@mui/material";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import {
    GrownPokemon,
    KotlinTupleOfIdAndValue,
    Moves,
    PokemonNature,
    PokemonResponse,
    PokemonValue,
    PostPokemonData, selectItem,
    selectItem2
} from "../../type/type";
import StatusForm from "../atomic/StatusForm";
import {MoveForm} from "../atomic/MoveForm";
import Pokemon from "../../domain/Pokemon";
import PokemonStatus from "../../domain/PokemonStatus";
import {Loading} from "../particle/Loading";
import {Iv6V, PokemonTypeList, zeroValue} from "../../domain/PokemonData";
import {usePokemonConst} from "../hook/PokemonConst";
import useToken from "../hook/useToken";
import useSWR from "swr";
import axios from "axios";
import {usePokemonMove} from "../hook/usePokemonMove";

const defaultPokemonList: [number, string][] = [[0, "ポケモンの選択なし"]]
const defaultMove: [number, string] = [0, "技の選択なし"]
const defaultValue3: PokemonValue = {
    a: 1, b: 1, c: 1, d: 1, h: 1, s: 1
}
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

const NewPokemon = React.memo(function NewPokemon(props: { open: boolean, onClose: () => void, setPokemon: (pokemon: Pokemon) => void, isBuild: boolean, buildId: number }) {
    const {token} = useToken()
    const [IvHp, setIvHp] = useState<number>(31)
    const [IvAttack, setIvAttack] = useState<number>(31)
    const [IvDefense, setIvDefense] = useState<number>(31)
    const [IvSpAttack, setIvSpAttack] = useState<number>(31)
    const [IvSpDefense, setIvSpDefense] = useState<number>(31)
    const [IvSpeed, setIvSpeed] = useState<number>(31)
    const [EvHp, setEvHp] = useState<number>(0)
    const [EvAttack, setEvAttack] = useState<number>(0)
    const [EvDefense, setEvDefense] = useState<number>(0)
    const [EvSpAttack, setEvSpAttack] = useState<number>(0)
    const [EvSpDefense, setEvSpDefense] = useState<number>(0)
    const [EvSpeed, setEvSpeed] = useState<number>(0)
    const [move1, setMove1] = useState<[number, string]>(defaultMove)
    const [move2, setMove2] = useState<[number, string]>(defaultMove)
    const [move3, setMove3] = useState<[number, string]>(defaultMove)
    const [move4, setMove4] = useState<[number, string]>(defaultMove)
    const [pokemonId, setPokemonId] = useState<number>(0)
    const [goodName, setGoodName] = useState<string>("選択なし")
    const [terastype, setTerastype] = useState<string>("選択なし")
    const {setToast, goodList} = usePokemonConst()
    const sum = EvHp + EvAttack + EvDefense + EvSpAttack + EvSpDefense + EvSpeed
    const [pokemonList, setPokemonList] = useState<[number, string][]>(defaultPokemonList)
    const [isLoading, setIsLoading] = useState(false)
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const fetcher = (url: string) => axios.get(url).then(res => res.data)
    const {data: pokemonListRow} = useSWR<KotlinTupleOfIdAndValue[]>(baseUrl + "/v1/pokemon-data/pokemons", fetcher)
    const {moveList} = usePokemonMove(pokemonId)


    const createOption = (value: number, label: string): selectItem2 => ({
        value,
        label
    })

    const createOption2 = (value: string, label: string): selectItem => ({
        value,
        label
    })

    const resetValue = () => {
        setIvHp(31)
        setIvAttack(31)
        setIvDefense(31)
        setIvSpAttack(31)
        setIvSpDefense(31)
        setIvSpeed(31)
        setEvHp(0)
        setEvAttack(0)
        setEvDefense(0)
        setEvSpAttack(0)
        setEvSpDefense(0)
        setEvSpeed(0)
        setMove1(defaultMove)
        setMove2(defaultMove)
        setMove3(defaultMove)
        setMove4(defaultMove)
        setGoodName("選択なし")
        setPokemonId(0)
    }

    useEffect(() => {
        if (pokemonListRow) {
            setPokemonList(pokemonListRow.map((row) => [row.first, row.second]))
        }
    }, [pokemonListRow])

    async function savePokemon() {
        setIsLoading(true)
        const ev: PokemonValue = {a: EvAttack, b: EvDefense, c: EvSpAttack, d: EvSpDefense, h: EvHp, s: EvSpeed}
        const iv: PokemonValue = {a: IvAttack, b: IvDefense, c: IvSpAttack, d: IvSpDefense, h: IvHp, s: IvSpeed}
        const moves: Moves = [move1[1], move2[1], move3[1], move4[1]]
        const good = goodName
        const nature: PokemonNature = "まじめ"
        let abilities: string[]
        let ability: string = ""
        let bv: PokemonValue = {a: 0, b: 0, c: 0, d: 0, h: 0, s: 0}
        let name: string = ""

        abilities = await fetch(baseUrl + "/v1/pokemon-data/pokemons/" + pokemonId.toString())
            .then((res: { json: () => any; }) => res.json())
            .then((data: PokemonResponse) => {
                    name = data.name
                    bv = {
                        a: data.base[1],
                        b: data.base[2],
                        c: data.base[3],
                        d: data.base[4],
                        h: data.base[0],
                        s: data.base[5]
                    }
                    return data.abilities
                }
            ).catch((reason: any) => {
                    console.log(reason)
                    return [""]
                }
            )
        if (abilities[0] == "") {
            setIsLoading(false)
            return
        }
        ability = abilities[0]
        const newPokemon2: GrownPokemon = {
            ability: ability,
            abilityList: [],
            bv: [],
            ev: [ev.h, ev.a, ev.b, ev.c, ev.d, ev.s],
            good: good,
            id: pokemonId,
            iv: [iv.h, iv.a, iv.b, iv.c, iv.d, iv.s],
            moveList: moves,
            name: "",
            nature: 25,
            personalId: 0,
            tag: [],
            nickname: "",
            terastal: "選択なし"
        }
        const sendData: PostPokemonData | GrownPokemon = props.isBuild ? {
            buildId: props.buildId,
            pokemon: newPokemon2
        } : newPokemon2
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "POST",
            body: JSON.stringify(sendData)
        }
        const apiUrl = props.isBuild ? baseUrl + "/v1/pokemon-build/builds/" + props.buildId + "/pokemon" : baseUrl + "/v1/pokemon-build/grown-pokemons"
        let personalId = await fetch(apiUrl, parameter).then(
            (res: { json: () => any; }) => res.json()).then((data: { pokemonId: number }) =>
            data.pokemonId
        )
            .catch((reason: any) => {
                setToast("ポケモンの追加に失敗しました", "error")
                console.log(reason)
                return 0
            })
        if (personalId == 0) {
            setIsLoading(false)
            return
        }
        const status = new PokemonStatus(bv, ev, iv, defaultValue3)
        const newPokemon = new Pokemon(name, pokemonId, personalId!, status, nature, ability, abilities, good, [], moves, "", terastype)
        props.setPokemon(newPokemon)
        props.onClose()
        resetValue()
        setIsLoading(false)
    }

    return (
        <>
            <Dialog
                open={props.open}
                keepMounted
                onClose={props.onClose}
                fullScreen={fullScreen}
                maxWidth={"xl"}
                className={"dialog-new-pokemon"}
            >
                <DialogTitle>ポケモンを新規登録する</DialogTitle>
                <DialogContent
                    style={{height: '560px'}}
                >
                    <Grid container spacing={2} direction="row" justifyContent="center" alignItems="stretch">
                        <Grid item xs={12} sm={6}>
                            <div className="new-pokemon-contents">
                                <DialogContentText>ポケモンの選択</DialogContentText>
                                <List>
                                    <Select className="pokemon-select" isSearchable
                                            options={pokemonList!.map(pokemon => createOption(pokemon[0], pokemon[1]))}
                                            onChange={row => setPokemonId(row?.value!)}></Select>
                                </List>
                            </div>
                            <div className="new-pokemon-contents">
                                <DialogContentText>ポケモンの道具</DialogContentText>
                                <List>
                                    <Select className="good-select" isSearchable
                                            options={goodList.map(good => createOption(good[0], good[1]))}
                                            onChange={row => setGoodName(row?.label!)}></Select>
                                </List>
                            </div>
                            <div className="new-pokemon-contents">
                                <DialogContentText>ポケモンのテラスタイプ</DialogContentText>
                                <List>
                                    <Select className="type-select" isSearchable defaultValue={createOption2("選択なし", "選択なし")}
                                            options={PokemonTypeList.map(pokemonType => createOption2(pokemonType, pokemonType))}
                                            onChange={row => setTerastype(row?.label!)}></Select>
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="new-pokemon-contents">
                                <DialogContentText>わざ</DialogContentText>
                                <MoveForm moveList={moveList} moves={[move1, move2, move3, move4]}
                                          setMoves={[setMove1, setMove2, setMove3, setMove4]}/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="new-pokemon-contents">
                                <DialogContentText>個体値</DialogContentText>
                                <StatusForm defaultValues={Iv6V} setHp={setIvHp} setAttack={setIvAttack}
                                            setDefense={setIvDefense}
                                            setSpAttack={setIvSpAttack} setSpDefense={setIvSpDefense}
                                            setSpeed={setIvSpeed}
                                            sum={0} statusType={"IV"} isTab={false} pokemon={null}/>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className="new-pokemon-contents">
                                <DialogContentText>努力値</DialogContentText>
                                <StatusForm defaultValues={zeroValue} setHp={setEvHp} setAttack={setEvAttack}
                                            setDefense={setEvDefense}
                                            setSpAttack={setEvSpAttack} setSpDefense={setEvSpDefense}
                                            setSpeed={setEvSpeed}
                                            sum={sum} statusType={"EV"} isTab={false} pokemon={null}/>
                            </div>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button onClick={savePokemon} disabled={isLoading}>OK</Button>
                </DialogActions>
            </Dialog>
            <Loading isLoading={isLoading}/>
        </>
    )
})

export default NewPokemon