import {NextPage} from "next";
import Pokemon from "../../domain/Pokemon";
import React, {useEffect, useState} from "react";
import {Box, Button, Collapse, IconButton, TableCell, TableRow} from "@mui/material";
import {MoveEdit} from "../molecule/MoveEdit";
import {TagEdit} from "../molecule/TagEdit";
import DeleteIcon from '@mui/icons-material/Delete';
import {GoodEdit} from "../molecule/GoodEdit";
import {EffortEdit} from "../molecule/EffortEdit";
import {AbilityEdit} from "../molecule/AbilityEdit";
import {NatureEdit} from "../molecule/NatureEdit";
import {usePokemonConst} from "../hook/PokemonConst";
import {NicknameEdit} from "../molecule/NicknameEdit";
import {TerastypeEdit} from "../molecule/TerastypeEdit";
import {useMediaQuery} from "react-responsive";
import {getPokemonTypeImagePath} from "../../util/converter";
import Image from "next/image";

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
    const [openNicknameEdit, setOpenNicknameEdit] = useState(false)
    const [openTerastypeEdit, setOpenTerastypeEdit] = useState(false)
    const [pokemonTypePath, setPokemonTypePath] = useState<string>("/type/no_type.png")
    const [pokemonImagePath, setPokemonImagePath] = useState<string>("/pokemon/no_pokemon.png")
    const {setting} = usePokemonConst()
    const nickname = pokemon.nickname == "" ? pokemon.name : pokemon.nickname
    const name = setting.isUsedNickname ? nickname : pokemon.name
    const isSmartPhone = useMediaQuery({query: `(max-width: 640px)`});

    useEffect(() => {
        setOpenMoveList(isSmartPhone)
    }, [isSmartPhone])

    useEffect(() => {
        const path = getPokemonTypeImagePath(pokemon.telastype)
        const id = pokemon.id
        setPokemonTypePath(path)
        setPokemonImagePath(`/pokemon/normal/${id}.png`)
    }, [pokemon.telastype])

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

    const handleClickOpenNicknameEdit = () => {
        setOpenNicknameEdit(true);
    }

    const handleCloseNicknameEdit = () => {
        setOpenNicknameEdit(false);
    }

    const handleClickOpenTerastype = () => {
        setOpenTerastypeEdit(true);
    }

    const handleCloseTerastype = () => {
        setOpenTerastypeEdit(false);
    }

    const clickRemove = () => {
        removePokemon(pokemon.personalId)
    };

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                {(!isSmartPhone && <TableCell className={"pokemon-table-body-item"}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenMoveList(!openMoveList)}
                    >
                        {openMoveList ? "↑" : "↓"}
                    </IconButton>
                </TableCell>)}
                <TableCell className={"pokemon-table-body-item"} data-label={"名前"}
                           onClick={handleClickOpenNicknameEdit}>
                    <Image src={pokemonImagePath} alt={""} width={34} height={28}
                           unoptimized={true}
                           onError={(e) => {e.currentTarget.src = `/pokemon/no_pokemon.png`}}/>
                    {name}
                </TableCell>
                <TableCell className={"pokemon-table-body-item"} data-label={"テラスタイプ"}
                           onClick={handleClickOpenTerastype}>
                    <Image src={pokemonTypePath} alt={""} width={32} height={32}/>
                </TableCell>
                <TableCell className={"pokemon-table-body-item"} data-label={"タグ"}
                           onClick={handleClickOpenTagEdit}>
                    {pokemon.tag.map(tag => <Button className={"pokemon-tag-button"} variant="outlined"
                                                    key={tag}>{tag}</Button>)}</TableCell>
                <TableCell className={"pokemon-table-body-item"} data-label={"性格"}
                           onClick={handleClickOpenNatureEdit}>{pokemon.nature}</TableCell>
                <TableCell className={"pokemon-table-body-item"} data-label={"特性"}
                           onClick={handleClickOpenAbilityEdit}>{pokemon.ability}</TableCell>
                <TableCell className={"pokemon-table-body-item"} data-label={"道具"}
                           onClick={handleClickOpenGoodEdit}>{pokemon.good}</TableCell>
                <TableCell className={"pokemon-table-body-item"} data-label={"努力値"}
                           onClick={handleClickOpenEffortEdit}>{pokemon.getEffortText()}</TableCell>
                <TableCell className={"pokemon-table-body-item"}
                           data-label={"実数値"}>{pokemon.getRealText()}</TableCell>
                {!isSmartPhone && <TableCell className={"pokemon-table-body-item"}>
                    <DeleteIcon
                        onClick={clickRemove}
                    />
                </TableCell>}
            </TableRow>
            <TableRow>
                <TableCell className={"pokemon-table-body-item-move"}
                           data-label={"わざ"} style={{paddingBottom: 0, paddingTop: 0}} colSpan={8}>
                    <Collapse in={openMoveList} timeout="auto" unmountOnExit>
                        <Box className={"move-list"}>
                            {!isSmartPhone && <h4>わざ</h4>}
                            {pokemon.moves.map(move => <Button variant="outlined" color="success"
                                                               className={"pokemon-tag-button"}
                                                               key={move}>{move}</Button>)}
                            <Button onClick={handleClickOpenMoveEdit}>編集</Button>
                            <br/>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            {isSmartPhone && <hr/>}
            {openNicknameEdit &&
                <NicknameEdit pokemon={pokemon} onClose={handleCloseNicknameEdit} open={openNicknameEdit}/>}
            {openGoodEdit && <GoodEdit open={openGoodEdit} onClose={handleCloseGoodEdit} pokemon={pokemon}/>}
            {openEffortEdit && <EffortEdit open={openEffortEdit} onClose={handleCloseEffortEdit} pokemon={pokemon}/>}
            {openAbilityEdit &&
                <AbilityEdit open={openAbilityEdit} onClose={handleCloseAbilityEdit} pokemon={pokemon}/>}
            {openNatureEdit && <NatureEdit open={openNatureEdit} onClose={handleCloseNatureEdit} pokemon={pokemon}/>}
            {openTagEdit && <TagEdit open={openTagEdit} onClose={handleCloseTagEdit} pokemon={pokemon}/>}
            {openMoveEdit && <MoveEdit open={openMoveEdit} onClose={handleCloseMoveEdit} pokemon={pokemon}/>}
            {openTerastypeEdit &&
                <TerastypeEdit open={openTerastypeEdit} onClose={handleCloseTerastype} pokemon={pokemon}/>}
        </React.Fragment>
    )
}

export default PokemonList