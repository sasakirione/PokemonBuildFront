import Pokemon from "../../domain/Pokemon";
import {
    Box,
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, InputLabel,
    List,
    ListItemButton, ListItemText, MenuItem, OutlinedInput, SelectChangeEvent, TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {fieldType, PokemonNature, PokemonValue, selectItem} from "../../type/type";
import {getNatureList} from "../../domain/PokemonData";
import Select from "react-select";

export function GoodEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon, goodList: [number, string][] }) {
    const [goodId, setGoodId] = useState<number>(props.goodList?.filter(good => good[1] == props.pokemon.good).map(good => good[0])[0])

    useEffect(() => {

    }, [goodId])

    function onClickItem(id: number, name: string) {
        props.pokemon.good = name
        setGoodId(id)
        props.onClose()
    }

    return <Dialog
        open={props.open}
        keepMounted
        onClose={props.onClose}
    >
        <DialogTitle>道具を変更する</DialogTitle>
        <DialogContent>
            <DialogContentText>現在の道具：{props.pokemon.good}</DialogContentText>
            <List>
                {props.goodList?.map((good) =>
                    <ListItemButton key={good[0]} onClick={() => onClickItem(good[0], good[1])}>
                        <ListItemText primary={good[1]}></ListItemText>
                    </ListItemButton>
                )}
            </List>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
        </DialogActions>
    </Dialog>;
}

export function EffortEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const [hp, setHp] = useState<number>(props.pokemon.status.effort.h)
    const [attack, setAttack] = useState<number>(props.pokemon.status.effort.a)
    const [defense, setDefense] = useState<number>(props.pokemon.status.effort.b)
    const [spAttack, setSpAttack] = useState<number>(props.pokemon.status.effort.c)
    const [spDefense, setSpDefense] = useState<number>(props.pokemon.status.effort.d)
    const [speed, setSpeed] = useState<number>(props.pokemon.status.effort.s)
    let sum = (hp + attack + defense + spAttack + spDefense + speed)

    function setHpHandler(e: fieldType) {
        setHp(Number(e.target.value))
    }

    function setAttackHandler(e: fieldType) {
        setAttack(Number(e.target.value))
    }

    function setDefenseHandler(e: fieldType) {
        setDefense(Number(e.target.value))
    }

    function setSpAttackHandler(e: fieldType) {
        setSpAttack(Number(e.target.value))
    }

    function setSpDefenseHandler(e: fieldType) {
        setSpDefense(Number(e.target.value))
    }

    function setSpeedHandler(e: fieldType) {
        setSpeed(Number(e.target.value))
    }

    function saveEffort() {
        const effortStatus: PokemonValue = {h: hp, a: attack, b: defense, c: spAttack, d: spDefense, s: speed}
        props.pokemon.status.changeEffort(effortStatus)
        props.onClose()
    }

    return <Dialog
        open={props.open}
        keepMounted
        onClose={props.onClose}
    >
        <DialogTitle>努力値を変更する</DialogTitle>
        <DialogContent>
            <TextField
                id="hp"
                label="HP"
                type="number"
                InputProps={{inputProps: {min: 0, max: 252},}}
                defaultValue={props.pokemon.status.effort.h}
                onChange={setHpHandler}
                margin="normal"
            />
            <TextField
                id="outlined-required"
                label="攻撃"
                type="number"
                InputProps={{inputProps: {min: 0, max: 252},}}
                defaultValue={props.pokemon.status.effort.a}
                onChange={setAttackHandler}
                margin="normal"
            />
            <TextField
                id="outlined-required"
                label="防御"
                type="number"
                InputProps={{inputProps: {min: 0, max: 252},}}
                defaultValue={props.pokemon.status.effort.b}
                onChange={setDefenseHandler}
                margin="normal"
            />
            <TextField
                id="outlined-required"
                label="特攻"
                type="number"
                InputProps={{inputProps: {min: 0, max: 252}}}
                defaultValue={props.pokemon.status.effort.c}
                onChange={setSpAttackHandler}
                margin="normal"
            />
            <TextField
                id="outlined-required"
                label="特防"
                type="number"
                InputProps={{inputProps: {min: 0, max: 252}}}
                defaultValue={props.pokemon.status.effort.d}
                onChange={setSpDefenseHandler}
                margin="normal"
            />
            <TextField
                id="outlined-required"
                label="素早さ"
                type="number"
                InputProps={{inputProps: {min: 0, max: 252}}}
                defaultValue={props.pokemon.status.effort.s}
                onChange={setSpeedHandler}
                margin="normal"
            />
            {sum > 508 ?
                (<div>努力値の合計が508を超えています！{sum - 508}減らしてください！</div>) :
                (<div>残り努力値：{508 - sum}</div>)}
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={saveEffort} disabled={sum > 508}>OK</Button>
        </DialogActions>
    </Dialog>
}

export function AbilityEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {

    function onClickItem(ability: string) {
        props.pokemon.ability = ability
        props.onClose()
    }

    return <Dialog
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
    </Dialog>;
}

export function NatureEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {

    function onClickItem(nature: [PokemonNature, string, string]) {
        props.pokemon.nature = nature[0]
        props.pokemon.status.changeNature(nature[1], nature[2])
        props.onClose()
    }

    return <Dialog
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
    </Dialog>;
}

export function MoveEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon, moveList: string[] }) {
    const [move1, setMove1] = useState<string>(props.pokemon.moves[0])
    const [move2, setMove2] = useState<string>(props.pokemon.moves[1])
    const [move3, setMove3] = useState<string>(props.pokemon.moves[2])
    const [move4, setMove4] = useState<string>(props.pokemon.moves[3])

    const createOption = (label: string): selectItem => ({
        label,
        value: label,
    })

    function saveMove() {
        props.pokemon.moves = [move1, move2, move3, move4]
        props.onClose()
    }

    return <Dialog
        open={props.open}
        keepMounted
        onClose={props.onClose}
        fullWidth={true}
    >
        <DialogTitle>技を変更する</DialogTitle>
        <DialogContent
            style={{height:'450px'}}
        >
            <List>
                <Select isSearchable options={props.moveList?.map(move => createOption(move))} value={createOption(move1)} onChange={value => setMove1(value?.value!)} />
                <Select isSearchable options={props.moveList?.map(move => createOption(move))} value={createOption(move2)} onChange={value => setMove2(value?.value!)} />
                <Select isSearchable options={props.moveList?.map(move => createOption(move))} value={createOption(move3)} onChange={value => setMove3(value?.value!)} />
                <Select isSearchable options={props.moveList?.map(move => createOption(move))} value={createOption(move4)} onChange={value => setMove4(value?.value!)} />
            </List>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={saveMove}>OK</Button>
        </DialogActions>
    </Dialog>;
}