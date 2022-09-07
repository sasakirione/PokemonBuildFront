import Pokemon from "../../domain/Pokemon";
import React, {useState} from "react";
import {PokemonValue} from "../../type/type";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import StatusForm from "../atomic/StatusForm";
import {Loading} from "../particle/Loading";
import useToken from "../hook/useToken";

export function EffortEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {token} = useToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const [hp, setHp] = useState<number>(props.pokemon.status.effort.h)
    const [attack, setAttack] = useState<number>(props.pokemon.status.effort.a)
    const [defense, setDefense] = useState<number>(props.pokemon.status.effort.b)
    const [spAttack, setSpAttack] = useState<number>(props.pokemon.status.effort.c)
    const [spDefense, setSpDefense] = useState<number>(props.pokemon.status.effort.d)
    const [speed, setSpeed] = useState<number>(props.pokemon.status.effort.s)
    const [isLoading, setIsLoading] = useState(false)
    let sum = (hp + attack + defense + spAttack + spDefense + speed)

    async function saveEffort() {
        const effortStatus: PokemonValue = {h: hp, a: attack, b: defense, c: spAttack, d: spDefense, s: speed}
        await sendData()
        props.pokemon.status.changeEffort(effortStatus)
        props.onClose()
    }

    async function sendData() {
        setIsLoading(true)
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                ids: [hp, attack, defense, spAttack, spDefense, speed],
                itemSelect: 2
            })
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
            <DialogTitle>努力値を変更する</DialogTitle>
            <DialogContent>
                <StatusForm defaultValues={props.pokemon.status.effort} setHp={setHp} setAttack={setAttack}
                            setDefense={setDefense} setSpAttack={setSpAttack} setSpDefense={setSpDefense}
                            setSpeed={setSpeed} sum={sum} statusType={"EV"}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={saveEffort} disabled={sum > 508}>OK</Button>
            </DialogActions>
        </Dialog>
        <Loading isLoading={isLoading}/>
    </>)
}