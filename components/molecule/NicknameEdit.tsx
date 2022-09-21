import Pokemon from "../../domain/Pokemon";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import useToken from "../hook/useToken";
import React, {useEffect, useState} from "react";
import {Loading} from "../particle/Loading";

export const NicknameEdit = (props: { open: boolean, onClose: () => void, pokemon: Pokemon }) => {
    const {token} = useToken()
    const [isLoading, setIsLoading] = useState(false)
    const [nickname, setNickname] = useState(props.pokemon.nickname)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
        setNickname(props.pokemon.nickname)
    }, [props.open, props.pokemon.nickname])

    async function onClickItem() {
        await sendData()
        props.pokemon.nickname = nickname
        close()
    }

    async function sendData() {
        setIsLoading(true)
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({values: [nickname], itemSelect: 7})
        }
        await fetch(baseUrl + "/v1/pokemon-build/grown-pokemons/" + props.pokemon.personalId + "/value", parameter)
        setIsLoading(false)
    }

    function close() {
        setNickname("")
        props.onClose()
    }

    return (<>
        <Dialog
            open={props.open}
            keepMounted
            onClose={props.onClose}
        >
            <DialogTitle>ニックネームを変更する</DialogTitle>
            <DialogContent>
                <DialogContentText>選択されたポケモン：{props.pokemon.name}</DialogContentText>
                <DialogContentText>現在のニックネーム：{props.pokemon.nickname}</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="ニックネーム"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>キャンセル</Button>
                <Button onClick={onClickItem}>OK</Button>
            </DialogActions>
        </Dialog>
        <Loading isLoading={isLoading}/>
    </>)
}