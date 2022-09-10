import Pokemon from "../../domain/Pokemon";
import MUIDataTable from "mui-datatables";
import React, {useEffect, useState} from "react";
import {TagEdit} from "./TagEdit";
import {Button} from "@mui/material";
import {EffortEdit} from "./EffortEdit";
import {GoodEdit} from "./GoodEdit";
import {AbilityEdit} from "./AbilityEdit";
import {NatureEdit} from "./NatureEdit";

const GrownPokemonTable = (props: { pokemons: Pokemon[] }) => {
    const [isOpenTagEdit, setIsOpenTagEdit] = useState(false)
    const [isOpenEvEdit, setIsOpenEvEdit] = useState(false)
    const [isOpenGoodEdit, setIsOpenGoodEdit] = useState(false)
    const [isOpenAbilityEdit, setIsOpenAbilityEdit] = useState(false)
    const [isOpenNatureEdit, setIsOpenNatureEdit] = useState(false)
    const [pokemonIndex, setPokemonIndex] = useState(0)
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>()

    useEffect(() => {
            setSelectedPokemon(props.pokemons[pokemonIndex])
        }, [pokemonIndex, props.pokemons]
    )

    function closeTagEdit() {
        setIsOpenTagEdit(false)
    }

    function openTagEdit(pokemonIndex: number) {
        setPokemonIndex(pokemonIndex)
        setIsOpenTagEdit(true)
    }

    function closeEvEdit() {
        setIsOpenEvEdit(false)
    }

    function openEvEdit(pokemonIndex: number) {
        setPokemonIndex(pokemonIndex)
        setIsOpenEvEdit(true)
    }

    function closeGoodEdit() {
        setIsOpenGoodEdit(false)
    }

    function openGoodEdit(pokemonIndex: number) {
        setPokemonIndex(pokemonIndex)
        setIsOpenGoodEdit(true)
    }

    function closeAbilityEdit() {
        setIsOpenAbilityEdit(false)
    }

    function openAbilityEdit(pokemonIndex: number) {
        setPokemonIndex(pokemonIndex)
        setIsOpenAbilityEdit(true)
    }

    function closeNatureEdit() {
        setIsOpenNatureEdit(false)
    }

    function openNatureEdit(pokemonIndex: number) {
        setPokemonIndex(pokemonIndex)
        setIsOpenNatureEdit(true)
    }

    const columns = [
        {
            name: "personalId",
            label: "ID",
            options: {filter: false, display: false}
        },
        {
            name: "name",
            label: "ポケモン名",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "tag",
            label: "タグ",
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex: number) => {
                    return (
                        <>
                            <div onClick={() => openTagEdit(dataIndex)}>
                                {props.pokemons[dataIndex].tag.map(tag => <Button variant="outlined"
                                                                                  key={tag}>{tag}</Button>)}
                                {props.pokemons[dataIndex].tag.length == 0 &&
                                    <Button variant="outlined">タグを追加</Button>}
                            </div>
                        </>
                    )
                },
            }
        },
        {
            name: "effortText",
            label: "努力値",
            options: {
                filter: true,
                sort: false,
                customBodyRenderLite: (dataIndex: number) => {
                    return (
                        <>
                            <div onClick={() => openEvEdit(dataIndex)}>
                                {props.pokemons[dataIndex].getEffortText()}
                            </div>
                        </>
                    )
                },
            }
        },
        {
            name: "good",
            label: "道具",
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex: number) => {
                    return (
                        <>
                            <div onClick={() => openGoodEdit(dataIndex)}>
                                {props.pokemons[dataIndex].good}
                            </div>
                        </>
                    )
                },
            }
        },
        {
            name: "ability",
            label: "特性",
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex: number) => {
                    return (
                        <>
                            <div onClick={() => openAbilityEdit(dataIndex)}>
                                {props.pokemons[dataIndex].ability}
                            </div>
                        </>
                    )
                },
            }
        },
        {
            name: "nature",
            label: "性格",
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex: number) => {
                    return (
                        <>
                            <div onClick={() => openNatureEdit(dataIndex)}>
                                {props.pokemons[dataIndex].nature}
                            </div>
                        </>
                    )
                },
            }
        },
    ]

    return (
        <>
            <MUIDataTable
                title={""}
                data={props.pokemons}
                columns={columns}
            />
            {selectedPokemon != undefined &&
                <div>
                    <EffortEdit open={isOpenEvEdit} onClose={closeEvEdit} pokemon={selectedPokemon!}/>
                    <TagEdit open={isOpenTagEdit} onClose={closeTagEdit} pokemon={selectedPokemon!}/>
                    <GoodEdit open={isOpenGoodEdit} onClose={closeGoodEdit} pokemon={selectedPokemon!}/>
                    <AbilityEdit open={isOpenAbilityEdit} onClose={closeAbilityEdit} pokemon={selectedPokemon!}/>
                    <NatureEdit open={isOpenNatureEdit} onClose={closeNatureEdit} pokemon={selectedPokemon!}/>
                </div>
            }
        </>
    )
}

export default GrownPokemonTable