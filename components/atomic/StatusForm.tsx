import {fieldType, PokemonValue, SpeedComparison, StatusType} from "../../type/type";
import {StatusValueField} from "../particle/Field";
import React, {useEffect, useState} from "react";
import EffortPresetButtons from "./EffortPresetButtons";
import IndividualPresetButton from "./IndividualPresetButton";
import {Box, Grid, Slider, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SpeedTribeValue} from "../particle/Value";
import Pokemon from "../../domain/Pokemon";

function StatusForm(props: {
    defaultValues: PokemonValue,
    setHp: (hp: number) => void,
    setAttack: (a: number) => void,
    setDefense: (b: number) => void,
    setSpAttack: (c: number) => void,
    setSpDefense: (d: number) => void,
    setSpeed: (s: number) => void
    sum: number, statusType: StatusType,
    isTab: boolean,
    pokemon: Pokemon | null
}) {
    const [value, setValue] = useState<PokemonValue>(props.defaultValues)
    const [tabIndex, setTabIndex] = useState("1")
    const [speedComparison, setSpeedComparison] = useState<SpeedComparison>({
        noItem: {
            fastSpeed: 0,
            latestSpeed: 0,
            semiSpeed: 0
        }, realSpeed: 0, scarf: {fastSpeed: 0, semiSpeed: 0}
    })

    useEffect(() => {
            setValue(props.defaultValues)
        }, [props.defaultValues]
    )

    let max = props.statusType == "EV" ? 252 : 31

    useEffect(() => {
        if (props.isTab && tabIndex == "2" && props.pokemon != null) {
            setSpeedComparison(props.pokemon.getSpeedComparison(value.s))
        }
    }, [props.isTab, props.pokemon, tabIndex, value.s])

    function setHpHandler(e: fieldType) {
        props.setHp(Number(e.target.value))
        value.h = Number(e.target.value)
    }

    function setAttackHandler(e: fieldType) {
        props.setAttack(Number(e.target.value))
        value.a = Number(e.target.value)
    }

    function setDefenseHandler(e: fieldType) {
        props.setDefense(Number(e.target.value))
        value.b = Number(e.target.value)
    }

    function setSpAttackHandler(e: fieldType) {
        props.setSpAttack(Number(e.target.value))
        value.c = Number(e.target.value)
    }

    function setSpDefenseHandler(e: fieldType) {
        props.setSpDefense(Number(e.target.value))
        value.d = Number(e.target.value)
    }

    function setSpeedHandler(e: fieldType) {
        props.setSpeed(Number(e.target.value))
        value.s = Number(e.target.value)
    }

    function sumWarning() {
        return props.sum > 508 ?
            (<div>努力値の合計が508を超えています！{props.sum - 508}減らしてください！</div>) :
            (<div>残り努力値：{508 - props.sum}</div>)
    }

    function setPresetValue(newValue: PokemonValue) {
        props.setHp(newValue.h)
        props.setAttack(newValue.a)
        props.setDefense(newValue.b)
        props.setSpAttack(newValue.c)
        props.setSpDefense(newValue.d)
        props.setSpeed(newValue.s)
        setValue(newValue)
    }

    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTabIndex(newValue);
    };

    const changeSpeed = (event: Event, newValue: number | number[]) => {
        props.setSpeed(newValue as number)
        value.s = newValue as number
    };

    return props.isTab ? (
        <TabContext value={tabIndex}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={changeTab}>
                    <Tab label="入力" value="1"/>
                    <Tab label="S調整" value="2"/>
                </TabList>
            </Box>
            <TabPanel value="1">
                <StatusValueField defaultValue={props.defaultValues.h} max={max} label={"HP"}
                                  value={value.h} onChange={setHpHandler}/>
                <StatusValueField defaultValue={props.defaultValues.a} max={max} label={"攻撃"}
                                  value={value.a} onChange={setAttackHandler}/>
                <StatusValueField defaultValue={props.defaultValues.b} max={max} label={"防御"}
                                  value={value.b} onChange={setDefenseHandler}/>
                <StatusValueField defaultValue={props.defaultValues.c} max={max} label={"特攻"}
                                  value={value.c} onChange={setSpAttackHandler}/>
                <StatusValueField defaultValue={props.defaultValues.d} max={max} label={"特防"}
                                  value={value.d} onChange={setSpDefenseHandler}/>
                <StatusValueField defaultValue={props.defaultValues.s} max={max} label={"素早さ"}
                                  value={value.s} onChange={setSpeedHandler}/>
                {props.statusType == "EV" &&
                    <EffortPresetButtons onChange={setPresetValue}/>
                }
                {props.statusType == "EV" && sumWarning()}
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
                <Slider step={4} marks min={0} max={252} value={value.s} onChange={changeSpeed}
                        valueLabelDisplay="auto"/>
            </TabPanel>
        </TabContext>
    ) : (<>
        <StatusValueField defaultValue={props.defaultValues.h} max={max} label={"HP"}
                          value={value.h} onChange={setHpHandler}/>
        <StatusValueField defaultValue={props.defaultValues.a} max={max} label={"攻撃"}
                          value={value.a} onChange={setAttackHandler}/>
        <StatusValueField defaultValue={props.defaultValues.b} max={max} label={"防御"}
                          value={value.b} onChange={setDefenseHandler}/>
        <StatusValueField defaultValue={props.defaultValues.c} max={max} label={"特攻"}
                          value={value.c} onChange={setSpAttackHandler}/>
        <StatusValueField defaultValue={props.defaultValues.d} max={max} label={"特防"}
                          value={value.d} onChange={setSpDefenseHandler}/>
        <StatusValueField defaultValue={props.defaultValues.s} max={max} label={"素早さ"}
                          value={value.s} onChange={setSpeedHandler}/>
        {props.statusType == "EV" &&
            <EffortPresetButtons onChange={setPresetValue}/>
        }
        {props.statusType == "IV" &&
            <IndividualPresetButton onChange={setPresetValue}/>
        }
        {props.statusType == "EV" && sumWarning()}
    </>);
}

export default StatusForm