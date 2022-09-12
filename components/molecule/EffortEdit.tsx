import Pokemon from "../../domain/Pokemon";
import React, {useEffect, useState} from "react";
import {fieldType, PokemonValue, SpeedComparison} from "../../type/type";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slider, Tab} from "@mui/material";
import StatusForm from "../atomic/StatusForm";
import {Loading} from "../particle/Loading";
import useToken from "../hook/useToken";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SpeedTribeValue} from "../particle/Value";
import {StatusValueField} from "../particle/Field";

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
    const [tabIndex, setTabIndex] = useState("1")
    const [speedComparison, setSpeedComparison] = useState<SpeedComparison>({
        noItem: {
            fastSpeed: 0,
            latestSpeed: 0,
            semiSpeed: 0
        }, realSpeed: 0, scarf: {fastSpeed: 0, semiSpeed: 0}
    })
    let sum = (hp + attack + defense + spAttack + spDefense + speed)

    useEffect(() => {
            setDefaultValue({h: h, a: a, b: b, c: c, d: d, s: s})
        }, [h, a, b, c, d, s]
    )

    useEffect(() => {
        setSpeedComparison(props.pokemon.getSpeedComparison(speed))
    }, [props.pokemon, speed])

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

    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTabIndex(newValue);
    };

    const changeSpeed = (event: Event, newValue: number | number[]) => {
        setSpeed(newValue as number);
    };

    return (<>
        <Dialog
            open={props.open}
            keepMounted
            onClose={props.onClose}
        >
            <DialogTitle>努力値を変更する</DialogTitle>
            <DialogContent>
                <TabContext value={tabIndex}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={changeTab}>
                            <Tab label="入力" value="1"/>
                            <Tab label="S調整" value="2"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <StatusForm defaultValues={defaultValue} setHp={setHp} setAttack={setAttack}
                                    setDefense={setDefense} setSpAttack={setSpAttack} setSpDefense={setSpDefense}
                                    setSpeed={setSpeed} sum={sum} statusType={"EV"} speed={speed}/>
                    </TabPanel>
                    <TabPanel value="2">
                        <Grid container spacing={2}>
                            <Grid xs={4}>
                                <SpeedTribeValue speedValue={speedComparison.noItem.latestSpeed} label={"最遅"}/>
                            </Grid>
                            <Grid xs={4}>
                                <SpeedTribeValue speedValue={speedComparison.noItem.semiSpeed} label={"準速"}/>
                            </Grid>
                            <Grid xs={4}>
                                <SpeedTribeValue speedValue={speedComparison.noItem.fastSpeed} label={"最速"}/>
                            </Grid>
                            <Grid xs={6}>
                                <SpeedTribeValue speedValue={speedComparison.scarf.semiSpeed} label={"スカーフ(S+1)準速"}/>
                            </Grid>
                            <Grid xs={6}>
                                <SpeedTribeValue speedValue={speedComparison.scarf.fastSpeed} label={"スカーフ(S+1)最速"}/>
                            </Grid>
                        </Grid>
                        <Slider step={4} marks min={0} max={252} value={speed} onChange={changeSpeed}/>
                        <StatusValueField defaultValue={speed} value={speed} max={252} label={"素早さ"}
                                          onChange={(e: fieldType) => setSpeed(Number(e.target.value))}/>
                    </TabPanel>
                </TabContext>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={saveEffort} disabled={sum > 508}>OK</Button>
            </DialogActions>
        </Dialog>
        <Loading isLoading={isLoading}/>
    </>)
}