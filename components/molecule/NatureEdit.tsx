import Pokemon from "../../domain/Pokemon";
import React, {useState} from "react";
import {PokemonNature, PokemonValue} from "../../type/type";
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
import {getNatureList} from "../../domain/PokemonData";
import {Loading} from "../particle/Loading";
import useToken from "../hook/useToken";

export function NatureEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {token} = useToken()
    const [isLoading, setIsLoading] = useState(false)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    async function onClickItem(nature: [PokemonNature, string, string, PokemonValue]) {
        await sendData(nature[0])
        props.pokemon.nature = nature[0]
        props.pokemon.status.changeNature(nature[1], nature[2])
        props.onClose()
    }

    async function sendData(nature: string) {
        setIsLoading(true)
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({values: [nature], itemSelect: 5})
        }
        await fetch(baseUrl + "/v1/pokemon-build/grown-pokemons/" + props.pokemon.personalId + "/value", parameter)
        setIsLoading(false)
    }

    return (<>
        <Dialog
            open={props.open}
            keepMounted
            onClose={props.onClose}
        >
            <DialogTitle>性格を変更する</DialogTitle>
            <DialogContent>
                <DialogContentText>現在の性格：{props.pokemon.nature}</DialogContentText>
                <List>
                    {getNatureList().map((nature, index) =>
                        <ListItemButton key={index} onClick={() => onClickItem(nature)}>
                            <ListItemText primary={nature[0] + "：" + "↑" + nature[1] + " ↓" + nature[2]}></ListItemText>
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