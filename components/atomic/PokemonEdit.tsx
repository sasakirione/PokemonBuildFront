import Pokemon from "../../domain/Pokemon";
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
import React, {useContext, useEffect, useState} from "react";
import {PokemonNature, PokemonValue} from "../../type/type";
import {getNatureList} from "../../domain/PokemonData";
import StatusForm from "./StatusForm";
import {GoodListContext, MoveListContext} from "../../pages/build";
import {MoveForm} from "./MoveForm";

export function GoodEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const goodList = useContext(GoodListContext)
    const [goodId, setGoodId] = useState<number>(goodList?.filter(good => good[1] == props.pokemon.good).map(good => good[0])[0])


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
                {goodList?.map((good) =>
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
            <StatusForm defaultValues={props.pokemon.status.effort} setHp={setHp} setAttack={setAttack}
                        setDefense={setDefense} setSpAttack={setSpAttack} setSpDefense={setSpDefense}
                        setSpeed={setSpeed} sum={sum} statusType={"EV"}/>
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

    function onClickItem(nature: [PokemonNature, string, string, PokemonValue]) {
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

export function MoveEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const [move1, setMove1] = useState<[number, string]>([0, props.pokemon.moves[0]])
    const [move2, setMove2] = useState<[number, string]>([0, props.pokemon.moves[1]])
    const [move3, setMove3] = useState<[number, string]>([0, props.pokemon.moves[2]])
    const [move4, setMove4] = useState<[number, string]>([0, props.pokemon.moves[3]])
    const moveList = useContext(MoveListContext)

    function saveMove() {
        props.pokemon.moves = [move1[1], move2[1], move3[1], move4[1]]
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
            style={{height: '450px'}}
        >
            <MoveForm moveList={moveList} moves={[move1, move2, move3, move4]}
                      setMoves={[setMove1, setMove2, setMove3, setMove4]}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={saveMove}>OK</Button>
        </DialogActions>
    </Dialog>;
}
