import Pokemon from "../../domain/Pokemon";
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
import {usePokemonConst} from "../hook/PokemonConst";

export function AbilityEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {token} = useToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const [isLoading, setIsLoading] = useState(false)
    const {setToast} = usePokemonConst()

    async function onClickItem(ability: string) {
        setIsLoading(true)
        await sendData(ability)
        props.pokemon.ability = ability
        setIsLoading(false)
        props.onClose()
    }

    async function sendData(ability: string) {
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({values: [ability], itemSelect: 1})
        }
        await fetch(baseUrl + "/v1/pokemon-build/grown-pokemons/" + props.pokemon.personalId + "/value", parameter)
            .catch((reason) => {
                console.log(reason)
                setToast("特性の更新に失敗しました。", "error")
            })
    }


    return (
        <>
            <Dialog
                open={props.open}
                keepMounted
                onClose={props.onClose}
            >
                <DialogTitle>特性を変更する</DialogTitle>
                <DialogContent>
                    <DialogContentText>現在の特性：{props.pokemon.ability}</DialogContentText>
                    <List>
                        {props.pokemon.abilityList.map((ability, index) =>
                            <ListItemButton key={index} onClick={() => onClickItem(ability)}>
                                <ListItemText primary={ability}></ListItemText>
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