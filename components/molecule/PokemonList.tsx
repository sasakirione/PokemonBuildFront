import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PokemonRow from "../atomic/PokemonRow";
import Pokemon from "../../domain/Pokemon";
import React, {Dispatch, SetStateAction} from "react";
import {usePokemonConst} from "../hook/PokemonConst";

interface PokemonListProps {
    pokemonList: Pokemon[],
    pokemonListFunc: Dispatch<SetStateAction<Pokemon[]>>
    removePokemon: (personalId: number) => void
}


const PokemonList = React.memo(function PokemonList(props: PokemonListProps) {
    const pokemonList = props.pokemonList
    const {setting} = usePokemonConst()

    return (
        <TableContainer component={Paper} className="table-container">
            <Table aria-label="collapsible table pokemon-table">
                <TableHead>
                    <TableRow>
                        <TableCell className={"pokemon-table-head-item"}/>
                        <TableCell
                            className={"pokemon-table-head-item"}>{setting.isUsedNickname ? "ニックネーム" : "ポケモン名"}</TableCell>
                        <TableCell className={"pokemon-table-head-item"}>テラスタイプ</TableCell>
                        <TableCell className={"pokemon-table-head-item"}>役割</TableCell>
                        <TableCell className={"pokemon-table-head-item"}>性格</TableCell>
                        <TableCell className={"pokemon-table-head-item"}>特性</TableCell>
                        <TableCell className={"pokemon-table-head-item"}>道具</TableCell>
                        <TableCell className={"pokemon-table-head-item"}>努力値</TableCell>
                        <TableCell className={"pokemon-table-head-item"}>実数値</TableCell>
                        <TableCell className={"pokemon-table-head-item"}>削除</TableCell>
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
})

export default PokemonList
