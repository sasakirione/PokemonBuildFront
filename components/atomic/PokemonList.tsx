import {NextPage} from "next";
import {CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PokemonRow from "../particle/PokemonRow";
import Pokemon from "../../domain/Pokemon";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {responseGoodList} from "../../type/type";

interface PokemonListProps {
    pokemonList: Pokemon[],
    pokemonListFunc: Dispatch<SetStateAction<Pokemon[]>>
}

const PokemonList: NextPage<PokemonListProps> = (props: PokemonListProps) => {
    const pokemonList = props.pokemonList
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const [isLoading3, setIsLoading3] = useState(false)
    const [goodList, setGoodList] = useState<[number, string][]>()
    const [tags, setTags] = useState<string[]>()
    const [moves, setMoves] = useState<string[]>()

    useEffect(() => {
            setIsLoading(true)
            setIsLoading2(true)
            setIsLoading3(true)
            fetch(baseUrl + "/v1/pokemon_data/get_goods")
                .then((res: { json: () => any; }) => res.json())
                .then((data: responseGoodList) => {
                        setGoodList(data.goods.map(good => [good.id, good.name]))
                        setIsLoading(false)
                    }
                ).catch(
                (reason: any) => {
                    console.log(reason)
                    setIsLoading(false)
                }
            )
            fetch(baseUrl + "/v1/pokemon_data/get_tags")
                .then((res: { json: () => any; }) => res.json())
                .then((data: string[]) => {
                    setTags(data)
                    setIsLoading2(false)
                }).catch(
                (reason: any) => {
                    console.log(reason)
                    setIsLoading2(false)
                }
            )
            fetch(baseUrl + "/v1/pokemon_data/get_moves")
                .then((res: { json: () => any; }) => res.json())
                .then((data: string[]) => {
                    setMoves(data)
                    setIsLoading3(false)
                }).catch(
                (reason: any) => {
                    console.log(reason)
                    setIsLoading3(false)
                }
            )
        }, []
    )

    if (isLoading || isLoading2 || isLoading3) {
        return (<div>
            <CircularProgress color="inherit"/>
        </div>)
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>ポケモン名</TableCell>
                        <TableCell>役割</TableCell>
                        <TableCell>性格</TableCell>
                        <TableCell>特性</TableCell>
                        <TableCell>道具</TableCell>
                        <TableCell>努力値</TableCell>
                        <TableCell>S実数値</TableCell>
                        <TableCell>削除</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        pokemonList.map((pokemon) =>
                            <PokemonRow key={pokemon.name} pokemon={pokemon} goodList={goodList!} tagList={tags!} moveList={moves!}/>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PokemonList
