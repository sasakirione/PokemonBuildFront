import {NextPage} from "next";
import Pokemon from "../../domain/Pokemon";
import {useState} from "react";
import {Box, Button, Collapse, IconButton, TableCell, TableRow} from "@mui/material";
import React from "react";

interface Props {
    pokemon: Pokemon
}

const PokemonList: NextPage<Props> = (props: Props) => {
    const {pokemon} = props
    const [open, setOpen] = useState(false)
    return(
        <React.Fragment>
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
                <TableCell>{pokemon.tag.map(tag => <Button key={tag}>{tag}</Button>)}</TableCell>
                <TableCell>{pokemon.nature}</TableCell>
                <TableCell>{pokemon.ability}</TableCell>
                <TableCell>{pokemon.good}</TableCell>
                <TableCell>{pokemon.getEffortText()}</TableCell>
                <TableCell>{pokemon.status.real.s}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <h4>わざ</h4>
                            {pokemon.moves.map(move => <Button variant="contained" color="success" key={move}>{move}</Button>)}
                            <br />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export default PokemonList