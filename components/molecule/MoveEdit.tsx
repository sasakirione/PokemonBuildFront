import Pokemon from "../../domain/Pokemon";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useState} from "react";
import {Moves} from "../../type/type";
import {MoveForm} from "../atomic/MoveForm";
import {Loading} from "../particle/Loading";
import {usePokemonConst} from "../hook/PokemonConst";
import useToken from "../hook/useToken";
import {usePokemonMove} from "../hook/usePokemonMove";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

export function MoveEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {token} = useToken()
    const [move1, setMove1] = useState<[number, string]>([0, props.pokemon.moves[0]])
    const [move2, setMove2] = useState<[number, string]>([0, props.pokemon.moves[1]])
    const [move3, setMove3] = useState<[number, string]>([0, props.pokemon.moves[2]])
    const [move4, setMove4] = useState<[number, string]>([0, props.pokemon.moves[3]])
    const [isLoading, setIsLoading] = useState(false)
    const {setToast} = usePokemonConst()
    const {moveList} = usePokemonMove(props.pokemon.id)

    async function saveMove() {
        const moves: Moves = [move1[1], move2[1], move3[1], move4[1]]
        await sendData(moves)
        props.pokemon.moves = moves
        props.onClose()
    }

    async function sendData(moves: Moves) {
        setIsLoading(true)
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({values: moves, itemSelect: 4})
        }
        await fetch(baseUrl + "/v1/pokemon-build/grown-pokemons/" + props.pokemon.personalId + "/value", parameter).catch(
            () => {
                setToast("技の更新に失敗しました。", "error")
            }
        )
        setIsLoading(false)
    }

    return (<>
        <Dialog
            open={props.open}
            keepMounted
            onClose={props.onClose}
            fullWidth={false}
        >
            <DialogTitle>技を変更する</DialogTitle>
            <DialogContent>
                <MoveForm moveList={moveList} moves={[move1, move2, move3, move4]}
                          setMoves={[setMove1, setMove2, setMove3, setMove4]}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={saveMove}>OK</Button>
            </DialogActions>
        </Dialog>
        <Loading isLoading={isLoading}/>
    </>);
}
