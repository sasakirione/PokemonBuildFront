import {NextPage} from "next";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Pokemon from "../../domain/Pokemon";
import PokemonStatus from "../../domain/PokemonStatus";
import PokemonRow from "../particle/PokemonRow";

const PokemonList: NextPage = () => {
    // MockData
    const pokemonList = [pokemon1, pokemon2, pokemon3]

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>ポケモン名</TableCell>
                        <TableCell>役割</TableCell>
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

// MockData
const cowardice = {
    h: 1.0,
    a: 0.9,
    b: 1.0,
    c: 1.0,
    d: 1.0,
    s: 1.1
}

const cs = {
    h: 4,
    a: 0,
    b: 0,
    c: 252,
    d: 0,
    s: 252
}

const hc = {
    h: 252,
    a: 0,
    b: 0,
    c: 252,
    d: 0,
    s: 4
}

const withoutA = {
    h: 31,
    a: 0,
    b: 31,
    c: 31,
    d: 31,
    s: 31
}

const pokemon1 = new Pokemon("ムゲンダイナ",
    new PokemonStatus(
        {
            h: 140,
            a: 85,
            b: 95,
            c: 145,
            d: 95,
            s: 130
        },
        cs,
        withoutA,
        cowardice
    ),
    "おくびょう",
    "プレッシャー",
    "いのちのたま",
    ["禁伝", "特殊アタッカー"])
const pokemon2 = new Pokemon("レジエレキ",
    new PokemonStatus(
        {
            h: 80,
            a: 100,
            b: 50,
            c: 100,
            d: 50,
            s: 200
        },
        hc,
        withoutA,
        {
            h: 1.0,
            a: 0.9,
            b: 1.0,
            c: 1.1,
            d: 1.0,
            s: 1.0
        }
    ),
    "ひかえめ",
    "トランジスタ",
    "ひかりのねんど",
    ["特殊アタッカー", "壁"])
const pokemon3 = new Pokemon("インテレオン",
    new PokemonStatus(
        {
            h: 70,
            a: 85,
            b: 65,
            c: 125,
            d: 65,
            s: 120
        },
        cs,
        withoutA,
        cowardice
    ),
    "おくびょう",
    "スナイパー",
    "ピントレンズ",
    ["特殊アタッカー", "ダイマ"])

