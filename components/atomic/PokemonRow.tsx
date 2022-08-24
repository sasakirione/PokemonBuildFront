import {NextPage} from "next";
import Pokemon from "../../domain/Pokemon";
import React, {useState} from "react";
import {Box, Button, Collapse, IconButton, TableCell, TableRow} from "@mui/material";
import {AbilityEdit, EffortEdit, GoodEdit, MoveEdit, NatureEdit} from "./PokemonEdit";
import {TagEdit} from "../ molecule/TagEdit";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    pokemon: Pokemon
    removePokemon: (personalId: number) => void
}

const PokemonList: NextPage<Props> = (props: Props) => {
    const {pokemon, removePokemon} = props
    const [openMoveList, setOpenMoveList] = useState(false)
    const [openTagEdit, setOpenTagEdit] = useState(false)
    const [openNatureEdit, setOpenNatureEdit] = useState(false)
    const [openAbilityEdit, setOpenAbilityEdit] = useState(false)
    const [openGoodEdit, setOpenGoodEdit] = useState(false)
    const [openEffortEdit, setOpenEffortEdit] = useState(false)
    const [openMoveEdit, setOpenMoveEdit] = useState(false)

    const handleClickOpenGoodEdit = () => {
        setOpenGoodEdit(true);
    };

    const handleCloseGoodEdit = () => {
        setOpenGoodEdit(false);
    };

    const handleClickOpenEffortEdit = () => {
        setOpenEffortEdit(true);
    };

    const handleCloseEffortEdit = () => {
        setOpenEffortEdit(false);
    };

    const handleClickOpenAbilityEdit = () => {
        setOpenAbilityEdit(true);
    };

    const handleCloseAbilityEdit = () => {
        setOpenAbilityEdit(false);
    };

    const handleClickOpenNatureEdit = () => {
        setOpenNatureEdit(true);
    };

    const handleCloseNatureEdit = () => {
        setOpenNatureEdit(false);
    };

    const handleClickOpenTagEdit = () => {
        setOpenTagEdit(true);
    };

    const handleCloseTagEdit = () => {
        setOpenTagEdit(false);
    };

    const handleClickOpenMoveEdit = () => {
        setOpenMoveEdit(true);
    };

    const handleCloseMoveEdit = () => {
        setOpenMoveEdit(false);
    };

    const clickRemove = () => {

        removePokemon(pokemon.personalId)
    };

    return (
        <React.Fragment>
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
                <TableCell>{pokemon.name}</TableCell>
                <TableCell onClick={handleClickOpenTagEdit}>{pokemon.tag.map(tag => <Button variant="outlined"
                                                                                            key={tag}>{tag}</Button>)}</TableCell>
                <TableCell onClick={handleClickOpenNatureEdit}>{pokemon.nature}</TableCell>
                <TableCell onClick={handleClickOpenAbilityEdit}>{pokemon.ability}</TableCell>
                <TableCell onClick={handleClickOpenGoodEdit}>{pokemon.good}</TableCell>
                <TableCell onClick={handleClickOpenEffortEdit}>{pokemon.getEffortText()}</TableCell>
                <TableCell>{pokemon.getRealSpeed()}</TableCell>
                <TableCell>
                    <DeleteIcon
                        onClick={clickRemove}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={8}>
                    <Collapse in={openMoveList} timeout="auto" unmountOnExit>
                        <Box>
                            <h4>わざ</h4>
                            {pokemon.moves.map(move => <Button variant="outlined" color="success"
                                                               key={move}>{move}</Button>)}
                            <Button onClick={handleClickOpenMoveEdit}>編集</Button>
                            <br/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <GoodEdit open={openGoodEdit} onClose={handleCloseGoodEdit} pokemon={pokemon}/>
            <EffortEdit open={openEffortEdit} onClose={handleCloseEffortEdit} pokemon={pokemon}/>
            <AbilityEdit open={openAbilityEdit} onClose={handleCloseAbilityEdit} pokemon={pokemon}/>
            <NatureEdit open={openNatureEdit} onClose={handleCloseNatureEdit} pokemon={pokemon}/>
            <TagEdit open={openTagEdit} onClose={handleCloseTagEdit} pokemon={pokemon}/>
            <MoveEdit open={openMoveEdit} onClose={handleCloseMoveEdit} pokemon={pokemon}/>
        </React.Fragment>
    )
}

export default PokemonList