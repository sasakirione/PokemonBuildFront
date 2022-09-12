import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PokemonRow from "../atomic/PokemonRow";
import Pokemon from "../../domain/Pokemon";
import React, {Dispatch, SetStateAction} from "react";

interface PokemonListProps {
    pokemonList: Pokemon[],
    pokemonListFunc: Dispatch<SetStateAction<Pokemon[]>>
    removePokemon: (personalId: number) => void
}


const PokemonList = (props: PokemonListProps) => {
    const pokemonList = props.pokemonList

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
                            <PokemonRow key={pokemon.name} pokemon={pokemon} removePokemon={props.removePokemon}/>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PokemonList