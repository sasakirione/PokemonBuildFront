import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Select from "react-select";
import React, {useContext, useEffect, useState} from "react";
import {
    KotlinTupleOfIdAndValue,
    Moves,
    PokemonNature,
    PokemonResponse,
    PokemonValue,
    selectItem, selectItem2
} from "../../type/type";
import StatusForm from "../atomic/StatusForm";
import {GoodListContext, MoveListContext} from "../../pages/build";
import {MoveForm} from "../atomic/MoveForm";
import Pokemon from "../../domain/Pokemon";
import PokemonStatus from "../../domain/PokemonStatus";

const NewPokemon = (props: { open: boolean, onClose: () => void, setPokemon: (pokemon: Pokemon) => void}) => {
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
    const [move1, setMove1] = useState<string>("選択なし")
    const [move2, setMove2] = useState<string>("選択なし")
    const [move3, setMove3] = useState<string>("選択なし")
    const [move4, setMove4] = useState<string>("選択なし")
    const [pokemonId, setPokemonId] = useState<number>(0)
    const goodList = useContext(GoodListContext)
    const moveList = useContext(MoveListContext)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const sum = EvHp + EvAttack + EvDefense + EvSpAttack + EvSpDefense + EvSpeed
    const [pokemonList, setPokemonList] = useState<[number, string][]>([])
    const defaultValue: PokemonValue = {
        a: 31, b: 31, c: 31, d: 31, h: 31, s: 31
    }
    const defaultValue2: PokemonValue = {
        a: 0, b: 0, c: 0, d: 0, h: 0, s: 0
    }
    const defaultValue3: PokemonValue = {
        a: 1, b: 1, c: 1, d: 1, h: 1, s: 1
    }

    const createOption = (value: number, label: string): selectItem2 => ({
        value,
        label
    })

    useEffect(() => {
        if (pokemonList == null || pokemonList.length == 0) {
            fetch(baseUrl + "/v1/pokemon_data/pokemon_list")
                .then((res: { json: () => any; }) => res.json())
                .then((data: KotlinTupleOfIdAndValue[]) => {
                    setPokemonList(data.map(pokemon => [pokemon.first, pokemon.second]))
                }
                ).catch((reason: any) => {
                    console.log(reason)
                }
            )
        }
    }, [])
    
    function savePokemon() {
        const ev: PokemonValue = {a: EvAttack, b: EvDefense, c: EvSpAttack, d: EvSpDefense, h: EvHp, s: EvSpeed}
        const iv: PokemonValue = {a: IvAttack, b: IvDefense, c: IvSpAttack, d: IvSpDefense, h: IvHp, s: IvSpeed}
        const moves: Moves = [move1, move2, move3, move4]
        const good = "選択なし"
        const nature: PokemonNature = "まじめ"
        let abilities: string[] = []
        let ability: string = ""
        let bv: PokemonValue = {a: 0, b: 0, c: 0, d: 0, h: 0, s: 0}
        let name: string = ""

        fetch(baseUrl + "/v1/pokemon_data/" + pokemonId.toString())
            .then((res: { json: () => any; }) => res.json())
            .then((data: PokemonResponse) => {
                name = data.name
                bv = {a: data.base[1], b: data.base[2], c: data.base[3], d: data.base[4], h: data.base[0], s: data.base[5]}
                abilities = data.abilities
                ability = abilities[0]
                let personalId = 10
                const status = new PokemonStatus(bv, ev, iv, defaultValue3)
                const newPokemon = new Pokemon(name, pokemonId, personalId, status, nature, ability, abilities, good, [], moves)
                props.setPokemon(newPokemon)
            }
            ).catch((reason: any) => {
                console.log(reason)
                return
            }
        )

        props.onClose()
    }

    return (
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
                <div>
                    <DialogContentText>ポケモンの選択</DialogContentText>
                    <Select isSearchable options={pokemonList!.map(pokemon => createOption(pokemon[0], pokemon[1]))} onChange={row => setPokemonId(row?.value!)}></Select>
                </div>
                <div>
                    <DialogContentText>個体値</DialogContentText>
                    <StatusForm defaultValues={defaultValue} setHp={setIvHp} setAttack={setIvAttack} setDefense={setIvDefense}
                                setSpAttack={setIvSpAttack} setSpDefense={setIvSpDefense} setSpeed={setIvSpeed}
                                sum={0} statusType={"IV"}/>
                </div>
                <div>
                    <DialogContentText>努力値</DialogContentText>
                    <StatusForm defaultValues={defaultValue2} setHp={setEvHp} setAttack={setEvAttack} setDefense={setEvDefense}
                                setSpAttack={setEvSpAttack} setSpDefense={setEvSpDefense} setSpeed={setEvSpeed}
                                sum={sum} statusType={"EV"}/>
                </div>
                <div>
                    <DialogContentText>わざ</DialogContentText>
                    <MoveForm moveList={moveList} moves={[move1, move2, move3, move4]} setMoves={[setMove1, setMove2, setMove3, setMove4]} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button　onClick={savePokemon}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewPokemon