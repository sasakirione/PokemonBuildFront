import {fieldType, PokemonValue, StatusType} from "../../type/type";
import {StatusValueField} from "../particle/Field";
import React from "react";

function StatusForm(props: {
    defaultValues: PokemonValue,
    setHp: (hp: number) => void,
    setAttack: (a: number) => void,
    setDefense: (b: number) => void,
    setSpAttack: (c: number) => void,
    setSpDefense: (d: number) => void,
    setSpeed: (s: number) => void,
    sum: number, statusType: StatusType
}) {

    let max: number
    if (props.statusType == "EV") {
        max = 252
    } else {
        max = 31
    }

    function setHpHandler(e: fieldType) {
        props.setHp(Number(e.target.value))
    }

    function setAttackHandler(e: fieldType) {
        props.setAttack(Number(e.target.value))
    }

    function setDefenseHandler(e: fieldType) {
        props.setDefense(Number(e.target.value))
    }

    function setSpAttackHandler(e: fieldType) {
        props.setSpAttack(Number(e.target.value))
    }

    function setSpDefenseHandler(e: fieldType) {
        props.setSpDefense(Number(e.target.value))
    }

    function setSpeedHandler(e: fieldType) {
        props.setSpeed(Number(e.target.value))
    }

    function sumWarning() {
        return props.sum > 508 ?
            (<div>努力値の合計が508を超えています！{props.sum - 508}減らしてください！</div>) :
            (<div>残り努力値：{508 - props.sum}</div>)
    }

    return <>
        <StatusValueField defaultValue={props.defaultValues.h} max={max} label={"HP"}
                          onChange={setHpHandler}/>
        <StatusValueField defaultValue={props.defaultValues.a} max={max} label={"攻撃"}
                          onChange={setAttackHandler}/>
        <StatusValueField defaultValue={props.defaultValues.b} max={max} label={"防御"}
                          onChange={setDefenseHandler}/>
        <StatusValueField defaultValue={props.defaultValues.c} max={max} label={"特攻"}
                          onChange={setSpAttackHandler}/>
        <StatusValueField defaultValue={props.defaultValues.d} max={max} label={"特防"}
                          onChange={setSpDefenseHandler}/>
        <StatusValueField defaultValue={props.defaultValues.s} max={max} label={"素早さ"}
                          onChange={setSpeedHandler}/>
        {props.statusType == "EV" ? sumWarning() : ""}
    </>;
}

export default StatusForm