import {fieldType, PokemonValue, StatusType} from "../../type/type";
import {StatusValueField} from "../particle/Field";
import React, {useEffect, useState} from "react";
import EffortPresetButtons from "./EffortPresetButtons";
import IndividualPresetButton from "./IndividualPresetButton";

function StatusForm(props: {
    defaultValues: PokemonValue,
    setHp: (hp: number) => void,
    setAttack: (a: number) => void,
    setDefense: (b: number) => void,
    setSpAttack: (c: number) => void,
    setSpDefense: (d: number) => void,
    setSpeed: (s: number) => void,
    speed: number,
    sum: number, statusType: StatusType
}) {
    const [value, setValue] = useState<PokemonValue>(props.defaultValues)

    let max = props.statusType == "EV" ? 252 : 31

    useEffect(() => {
        value.s = props.speed
    }, [props.speed, value])

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

    return <>
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
    </>;
}

export default StatusForm