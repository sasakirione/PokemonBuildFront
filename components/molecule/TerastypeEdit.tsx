import Pokemon from "../../domain/Pokemon";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select
} from "@mui/material";
import useToken from "../hook/useToken";
import React, {useEffect, useState} from "react";
import {Loading} from "../particle/Loading";
import {usePokemonConst} from "../hook/PokemonConst";

export const TerastypeEdit = (props: { open: boolean, onClose: () => void, pokemon: Pokemon }) => {
    const {token} = useToken()
    const [isLoading, setIsLoading] = useState(false)
    const [terastype, setTerastype] = useState(props.pokemon.telastype)
    const {setToast} = usePokemonConst()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
        setTerastype(props.pokemon.telastype)
    }, [props.open, props.pokemon.telastype])

    async function onClickItem() {
        await sendData()
        props.pokemon.telastype = terastype
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
            body: JSON.stringify({values: [terastype], itemSelect: 8})
        }
        await fetch(baseUrl + "/v1/pokemon-build/grown-pokemons/" + props.pokemon.personalId + "/value", parameter).catch(
            (reason: any) => {
                setToast("ニックネームの変更に失敗しました。エラーコード：" + reason.status, "error")
            }
        )
        setIsLoading(false)
    }

    function close() {
        setTerastype("")
        props.onClose()
    }

    return <>
        <Dialog
            open={props.open}
            keepMounted
            onClose={props.onClose}
        >
            <DialogTitle>テラスタイプを変更する</DialogTitle>
            <DialogContent>
                <DialogContentText>選択されたポケモン：{props.pokemon.name}</DialogContentText>
                <DialogContentText>現在のテラスタイプ：{props.pokemon.telastype}</DialogContentText>
                <Select
                    value={terastype}
                    label="テラスタイプ"
                    onChange={(e) => setTerastype(e.target.value)}
                    fullWidth={true}
                >
                    <MenuItem value={"設定なし"}>設定なし</MenuItem>
                    <MenuItem value={"ノーマル"}>ノーマル</MenuItem>
                    <MenuItem value={"ほのお"}>ほのお</MenuItem>
                    <MenuItem value={"みず"}>みず</MenuItem>
                    <MenuItem value={"でんき"}>でんき</MenuItem>
                    <MenuItem value={"くさ"}>くさ</MenuItem>
                    <MenuItem value={"こおり"}>こおり</MenuItem>
                    <MenuItem value={"かくとう"}>かくとう</MenuItem>
                    <MenuItem value={"どく"}>どく</MenuItem>
                    <MenuItem value={"じめん"}>じめん</MenuItem>
                    <MenuItem value={"ひこう"}>ひこう</MenuItem>
                    <MenuItem value={"エスパー"}>エスパー</MenuItem>
                    <MenuItem value={"むし"}>むし</MenuItem>
                    <MenuItem value={"いわ"}>いわ</MenuItem>
                    <MenuItem value={"ゴースト"}>ゴースト</MenuItem>
                    <MenuItem value={"ドラゴン"}>ドラゴン</MenuItem>
                    <MenuItem value={"あく"}>あく</MenuItem>
                    <MenuItem value={"はがね"}>はがね</MenuItem>
                    <MenuItem value={"フェアリー"}>フェアリー</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>キャンセル</Button>
                <Button onClick={onClickItem}>OK</Button>
            </DialogActions>
        </Dialog>
        <Loading isLoading={isLoading}/>
    </>
}