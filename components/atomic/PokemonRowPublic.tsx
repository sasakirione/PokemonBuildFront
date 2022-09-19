import Pokemon from "../../domain/Pokemon";
import {Box, Button, Collapse, IconButton, TableCell, TableRow} from "@mui/material";
import React, {useState} from "react";

export const PokemonRowPublic = (props: { pokemon: Pokemon, isUsedNickname: boolean }) => {
    const {pokemon} = props
    const [openMoveList, setOpenMoveList] = useState(false)
    const nickname = pokemon.nickname == "" ? pokemon.name : pokemon.nickname
    const name = props.isUsedNickname ? nickname : pokemon.name

    return (
        <>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenMoveList(!openMoveList)}
                    >
                        {openMoveList ? "↑" : "↓"}
                    </IconButton>
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{pokemon.tag.map(tag => <Button variant="outlined" key={tag}>{tag}</Button>)}</TableCell>
                <TableCell>{pokemon.nature}</TableCell>
                <TableCell>{pokemon.ability}</TableCell>
                <TableCell>{pokemon.good}</TableCell>
                <TableCell>{pokemon.getEffortText()}</TableCell>
                <TableCell>{pokemon.getIVText()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={8}>
                    <Collapse in={openMoveList} timeout="auto" unmountOnExit>
                        <Box>
                            <h4>わざ</h4>
                            {pokemon.moves.map(move => <Button variant="outlined" color="success"
                                                               key={move}>{move}</Button>)}
                            <br/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}