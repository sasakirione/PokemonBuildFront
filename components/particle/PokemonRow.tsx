import {NextPage} from "next";
import Pokemon from "../../domain/Pokemon";
import {useState} from "react";
import {Button, IconButton, TableCell, TableRow} from "@mui/material";

interface Props {
    pokemon: Pokemon
}

const PokemonList: NextPage<Props> = (props: Props) => {
    const {pokemon} = props
    const [open, setOpen] = useState(false)
    return(
        <div>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? "↑" : "↓"}
                    </IconButton>
                </TableCell>
                <TableCell>{pokemon.name}</TableCell>
                <TableCell align="right">{pokemon.tag.map(tag => <Button key={tag}>{tag}</Button>)}</TableCell>
                <TableCell align="right">{pokemon.ability}</TableCell>
                <TableCell align="right">{pokemon.good}</TableCell>
                <TableCell align="right">努力値</TableCell>
                <TableCell align="right">{pokemon.status.real.s}</TableCell>
            </TableRow>
        </div>
    )
}

export default PokemonList