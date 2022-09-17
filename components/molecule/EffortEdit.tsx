import Pokemon from "../../domain/Pokemon";
import React, {useEffect, useState} from "react";
import {PokemonValue} from "../../type/type";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import StatusForm from "../atomic/StatusForm";
import {Loading} from "../particle/Loading";
import useToken from "../hook/useToken";

export function EffortEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {h, a, b, c, d, s} = props.pokemon.status.effort
    const {token} = useToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const [defaultValue, setDefaultValue] = useState<PokemonValue>(props.pokemon.status.effort)
    const [hp, setHp] = useState<number>(props.pokemon.status.effort.h)
    const [attack, setAttack] = useState<number>(props.pokemon.status.effort.a)
    const [defense, setDefense] = useState<number>(props.pokemon.status.effort.b)
    const [spAttack, setSpAttack] = useState<number>(props.pokemon.status.effort.c)
    const [spDefense, setSpDefense] = useState<number>(props.pokemon.status.effort.d)
    const [speed, setSpeed] = useState<number>(props.pokemon.status.effort.s)
    const [isLoading, setIsLoading] = useState(false)
    let sum = (hp + attack + defense + spAttack + spDefense + speed)

    useEffect(() => {
            setDefaultValue({h: h, a: a, b: b, c: c, d: d, s: s})
        }, [h, a, b, c, d, s]
    )

    useEffect(() => {
            setDefaultValue(props.pokemon.status.effort)
            setHp(props.pokemon.status.effort.h)
            setAttack(props.pokemon.status.effort.a)
            setDefense(props.pokemon.status.effort.b)
            setSpAttack(props.pokemon.status.effort.c)
            setSpDefense(props.pokemon.status.effort.d)
            setSpeed(props.pokemon.status.effort.s)
        }, [props.pokemon]
    )

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
            <DialogTitle>{props.pokemon.name}の努力値を変更する</DialogTitle>
            <DialogContent>
                <StatusForm defaultValues={defaultValue} setHp={setHp} setAttack={setAttack}
                            setDefense={setDefense} setSpAttack={setSpAttack} setSpDefense={setSpDefense}
                            setSpeed={setSpeed} sum={sum} statusType={"EV"} isTab={true}
                            pokemon={props.pokemon}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={saveEffort} disabled={sum > 508}>OK</Button>
            </DialogActions>
        </Dialog>
        <Loading isLoading={isLoading}/>
    </>)
}