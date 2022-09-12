import Pokemon from "../../domain/Pokemon";
import {usePokemonConst} from "../hook/PokemonConst";
import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItemButton,
    ListItemText
} from "@mui/material";
import {Loading} from "../particle/Loading";
import useToken from "../hook/useToken";

export function GoodEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {token} = useToken()
    const {goodList} = usePokemonConst()
    const [isLoading, setIsLoading] = useState(false)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    async function onClickItem(id: number, name: string) {
        props.pokemon.good = name
        await sendData(id)
        props.onClose()
    }

    async function sendData(id: number) {
        setIsLoading(true)
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({ids: [id], itemSelect: 3})
        }
        await fetch(baseUrl + "/v1/pokemon-build/grown-pokemons/" + props.pokemon.personalId, parameter)
        setIsLoading(false)
    }

    return (<>
        <Dialog
            open={props.open}
            keepMounted
            onClose={props.onClose}
        >
            <DialogTitle>道具を変更する</DialogTitle>
            <DialogContent>
                <DialogContentText>現在の道具：{props.pokemon.good}</DialogContentText>
                <List>
                    {goodList?.map((good) =>
                        <ListItemButton key={good[0]} onClick={() => onClickItem(good[0], good[1])}>
                            <ListItemText primary={good[1]}></ListItemText>
                        </ListItemButton>
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        <Loading isLoading={isLoading}/>
    </>);
}