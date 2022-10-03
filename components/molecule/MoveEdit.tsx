import Pokemon from "../../domain/Pokemon";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Moves} from "../../type/type";
import {MoveForm} from "../atomic/MoveForm";
import {Loading} from "../particle/Loading";
import {usePokemonConst} from "../hook/PokemonConst";
import useToken from "../hook/useToken";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

export function MoveEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {token} = useToken()
    const [move1, setMove1] = useState<[number, string]>([0, props.pokemon.moves[0]])
    const [move2, setMove2] = useState<[number, string]>([0, props.pokemon.moves[1]])
    const [move3, setMove3] = useState<[number, string]>([0, props.pokemon.moves[2]])
    const [move4, setMove4] = useState<[number, string]>([0, props.pokemon.moves[3]])
    const [isLoading, setIsLoading] = useState(false)
    const {moveList, setToast} = usePokemonConst()
    const [moveList2, setMoveList2] = useState<[number, string][]>([])

    async function saveMove() {
        const moves: Moves = [move1[1], move2[1], move3[1], move4[1]]
        await sendData(moves)
        props.pokemon.moves = moves
        props.onClose()
    }

    useEffect(() => {
            fetch(baseUrl + "/v1/pokemon-data/pokemons/" + props.pokemon.id + "/moves").then(
                async (res) => {
                    if (res.ok) {
                        const data = await res.json()
                        if (data[0] == 0) {
                            setMoveList2(moveList)
                        } else {
                            setMoveList2(moveList.filter((move) => data.includes(move[0])))
                        }
                    } else {
                        setToast("通信エラー", "error")
                    }
                }
            )
        }, [moveList, props.pokemon.id, setToast]
    )

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
            fullWidth={true}
        >
            <DialogTitle>技を変更する</DialogTitle>
            <DialogContent
                style={{height: '450px'}}
            >
                <MoveForm moveList={moveList2} moves={[move1, move2, move3, move4]}
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
