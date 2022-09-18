import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Select from "react-select";
import React, {useEffect, useState} from "react";
import {
    GrownPokemon,
    KotlinTupleOfIdAndValue,
    Moves,
    PokemonNature,
    PokemonResponse,
    PokemonValue,
    PostPokemonData,
    selectItem2
} from "../../type/type";
import StatusForm from "../atomic/StatusForm";
import {MoveForm} from "../atomic/MoveForm";
import Pokemon from "../../domain/Pokemon";
import PokemonStatus from "../../domain/PokemonStatus";
import {Loading} from "../particle/Loading";
import {Iv6V, zeroValue} from "../../domain/PokemonData";
import {usePokemonConst} from "../hook/PokemonConst";
import useToken from "../hook/useToken";

const NewPokemon = (props: { open: boolean, onClose: () => void, setPokemon: (pokemon: Pokemon) => void, isBuild: boolean, buildId: number }) => {
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
    const [move1, setMove1] = useState<[number, string]>([0, "選択なし"])
    const [move2, setMove2] = useState<[number, string]>([0, "選択なし"])
    const [move3, setMove3] = useState<[number, string]>([0, "選択なし"])
    const [move4, setMove4] = useState<[number, string]>([0, "選択なし"])
    const [pokemonId, setPokemonId] = useState<number>(0)
    const {moveList} = usePokemonConst()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const sum = EvHp + EvAttack + EvDefense + EvSpAttack + EvSpDefense + EvSpeed
    const [pokemonList, setPokemonList] = useState<[number, string][]>([])
    const [isLoading, setIsLoading] = useState(false)
    const defaultValue3: PokemonValue = {
        a: 1, b: 1, c: 1, d: 1, h: 1, s: 1
    }

    const createOption = (value: number, label: string): selectItem2 => ({
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
        setMove1([0, "選択なし"])
        setMove2([0, "選択なし"])
        setMove3([0, "選択なし"])
        setMove4([0, "選択なし"])
        setPokemonId(0)
    }

    useEffect(() => {
        fetch(baseUrl + "/v1/pokemon-data/pokemons")
            .then((res: { json: () => any; }) => res.json())
            .then((data: KotlinTupleOfIdAndValue[]) => {
                    setPokemonList(data.map(pokemon => [pokemon.first, pokemon.second]))
                }
            ).catch((reason: any) => {
                console.log(reason)
            }
        )
    }, [baseUrl])

    async function savePokemon() {
        setIsLoading(true)
        const ev: PokemonValue = {a: EvAttack, b: EvDefense, c: EvSpAttack, d: EvSpDefense, h: EvHp, s: EvSpeed}
        const iv: PokemonValue = {a: IvAttack, b: IvDefense, c: IvSpAttack, d: IvSpDefense, h: IvHp, s: IvSpeed}
        const moves: Moves = [move1[1], move2[1], move3[1], move4[1]]
        const good = "選択なし"
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
            nickname: ""
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
                console.log(reason)
                return 0
            })
        if (personalId == 0) {
            setIsLoading(false)
            return
        }
        const status = new PokemonStatus(bv, ev, iv, defaultValue3)
        const newPokemon = new Pokemon(name, pokemonId, personalId!, status, nature, ability, abilities, good, [], moves, "")
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
                fullWidth={true}
            >
                <DialogTitle>ポケモンを新規登録する</DialogTitle>
                <DialogContent
                    style={{height: '450px'}}
                >
                    <div className="new-pokemon-contents">
                        <DialogContentText>ポケモンの選択</DialogContentText>
                        <Select className="pokemon-select" isSearchable
                                options={pokemonList!.map(pokemon => createOption(pokemon[0], pokemon[1]))}
                                onChange={row => setPokemonId(row?.value!)}></Select>
                    </div>
                    <div className="new-pokemon-contents">
                        <DialogContentText>個体値</DialogContentText>
                        <StatusForm defaultValues={Iv6V} setHp={setIvHp} setAttack={setIvAttack}
                                    setDefense={setIvDefense}
                                    setSpAttack={setIvSpAttack} setSpDefense={setIvSpDefense} setSpeed={setIvSpeed}
                                    sum={0} statusType={"IV"} isTab={false} pokemon={null}/>
                    </div>
                    <div className="new-pokemon-contents">
                        <DialogContentText>努力値</DialogContentText>
                        <StatusForm defaultValues={zeroValue} setHp={setEvHp} setAttack={setEvAttack}
                                    setDefense={setEvDefense}
                                    setSpAttack={setEvSpAttack} setSpDefense={setEvSpDefense} setSpeed={setEvSpeed}
                                    sum={sum} statusType={"EV"} isTab={false} pokemon={null}/>
                    </div>
                    <div className="new-pokemon-contents">
                        <DialogContentText>わざ</DialogContentText>
                        <MoveForm moveList={moveList} moves={[move1, move2, move3, move4]}
                                  setMoves={[setMove1, setMove2, setMove3, setMove4]}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>
                    <Button onClick={savePokemon} disabled={isLoading}>OK</Button>
                </DialogActions>
            </Dialog>
            <Loading isLoading={isLoading}/>
        </>
    )
}

export default NewPokemon