import {NextPage} from "next";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import PokemonRow from "../particle/PokemonRow";
import {pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6} from "../../mock/PokemonData";

const PokemonList: NextPage = () => {
    // MockData
    const pokemonList = [pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6]

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ポケモン名</TableCell>
                        <TableCell>役割</TableCell>
                        <TableCell>性格</TableCell>
                        <TableCell>特性</TableCell>
                        <TableCell>道具</TableCell>
                        <TableCell>努力値</TableCell>
                        <TableCell>S実数値</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        pokemonList.map((pokemon) =>
                            <PokemonRow key={pokemon.name} pokemon={pokemon}/>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PokemonList
