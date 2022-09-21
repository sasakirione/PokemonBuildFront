import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Pokemon from "../../domain/Pokemon";
import React from "react";
import {PokemonRowPublic} from "../atomic/PokemonRowPublic";

interface PokemonListProps {
    pokemonList: Pokemon[]
    isUsedNickname: boolean
}

const PokemonList = (props: PokemonListProps) => {
    const pokemonList = props.pokemonList

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>{props.isUsedNickname ? "ニックネーム" : "ポケモン名"}</TableCell>
                        <TableCell>役割</TableCell>
                        <TableCell>性格</TableCell>
                        <TableCell>特性</TableCell>
                        <TableCell>道具</TableCell>
                        <TableCell>努力値</TableCell>
                        <TableCell>個体値</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        pokemonList.map((pokemon) =>
                            <PokemonRowPublic key={pokemon.name} pokemon={pokemon}
                                              isUsedNickname={props.isUsedNickname}/>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PokemonList
