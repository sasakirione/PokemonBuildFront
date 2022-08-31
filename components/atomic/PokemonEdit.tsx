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
import React, {useState} from "react";
import {Moves, PokemonNature, PokemonValue} from "../../type/type";
import {getNatureList} from "../../domain/PokemonData";
import StatusForm from "./StatusForm";
import {MoveForm} from "./MoveForm";
import {useAuth0} from "@auth0/auth0-react";
import {Loading} from "../particle/Loading";
import usePokemonConst from "../hook/usePokemonConst";

export function GoodEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {getAccessTokenSilently, getIdTokenClaims} = useAuth0()
    const {goodList} = usePokemonConst()
    const [isLoading, setIsLoading] = useState(false)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    async function onClickItem(id: number, name: string) {
        props.pokemon.good = name
        await sendData(id)
        props.onClose()
    }

    async function sendData(id: number) {
        setIsLoading(true)
        await getAccessTokenSilently()
        let token = await getIdTokenClaims()
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token?.__raw!,
                "Content-Type": 'application/json'
            },
            method: "POST",
            body: JSON.stringify({goodId: id, pokemonId: props.pokemon.personalId})
        }
        await fetch(baseUrl + "/v1/pokemon_build/post_good", parameter)
        setIsLoading(false)
    }

    return (<>
        <Dialog
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
        </Dialog>
        <Loading isLoading={isLoading}/>
    </>);
}

export function EffortEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {getAccessTokenSilently, getIdTokenClaims} = useAuth0()
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
        await getAccessTokenSilently()
        let token = await getIdTokenClaims()
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token?.__raw!,
                "Content-Type": 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                ev: [hp, attack, defense, spAttack, spDefense, speed],
                pokemonId: props.pokemon.personalId
            })
        }
        await fetch(baseUrl + "/v1/pokemon_build/post_ev", parameter)
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

export function AbilityEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {getAccessTokenSilently, getIdTokenClaims} = useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const [isLoading, setIsLoading] = useState(false)

    async function onClickItem(ability: string) {
        setIsLoading(true)
        await sendData(ability)
        props.pokemon.ability = ability
        setIsLoading(false)
        props.onClose()
    }

    async function sendData(ability: string) {
        await getAccessTokenSilently()
        let token = await getIdTokenClaims()
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token?.__raw!,
                "Content-Type": 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ability: ability, pokemonId: props.pokemon.personalId})
        }
        await fetch(baseUrl + "/v1/pokemon_build/post_ability", parameter)
    }


    return (
        <>
            <Dialog
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
            </Dialog>
            <Loading isLoading={isLoading}/>
        </>);
}

export function NatureEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {getAccessTokenSilently, getIdTokenClaims} = useAuth0()
    const [isLoading, setIsLoading] = useState(false)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    async function onClickItem(nature: [PokemonNature, string, string, PokemonValue]) {
        await sendData(nature[0])
        props.pokemon.nature = nature[0]
        props.pokemon.status.changeNature(nature[1], nature[2])
        props.onClose()
    }

    async function sendData(nature: string) {
        setIsLoading(true)
        await getAccessTokenSilently()
        let token = await getIdTokenClaims()
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token?.__raw!,
                "Content-Type": 'application/json'
            },
            method: "POST",
            body: JSON.stringify({nature: nature, pokemonId: props.pokemon.personalId})
        }
        await fetch(baseUrl + "/v1/pokemon_build/post_nature", parameter)
        setIsLoading(false)
    }

    return (<>
        <Dialog
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
        </Dialog>
        <Loading isLoading={isLoading}/>
    </>);
}

export function MoveEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {getAccessTokenSilently, getIdTokenClaims} = useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const [move1, setMove1] = useState<[number, string]>([0, props.pokemon.moves[0]])
    const [move2, setMove2] = useState<[number, string]>([0, props.pokemon.moves[1]])
    const [move3, setMove3] = useState<[number, string]>([0, props.pokemon.moves[2]])
    const [move4, setMove4] = useState<[number, string]>([0, props.pokemon.moves[3]])
    const [isLoading, setIsLoading] = useState(false)
    const {moveList} = usePokemonConst()

    async function saveMove() {
        const moves: Moves = [move1[1], move2[1], move3[1], move4[1]]
        await sendData(moves)
        props.pokemon.moves = moves
        props.onClose()
    }

    async function sendData(moves: Moves) {
        setIsLoading(true)
        await getAccessTokenSilently()
        let token = await getIdTokenClaims()
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token?.__raw!,
                "Content-Type": 'application/json'
            },
            method: "POST",
            body: JSON.stringify({moves: moves, pokemonId: props.pokemon.personalId})
        }
        await fetch(baseUrl + "/v1/pokemon_build/post_moves", parameter)
        setIsLoading(false)
    }

    return (<>
        <Dialog
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
        </Dialog>
        <Loading isLoading={isLoading}/>
    </>);
}
