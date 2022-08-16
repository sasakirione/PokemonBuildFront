import {NextPage} from "next";
import PokemonList from "../components/ molecule/PokemonList";
import {HeadLineText} from "../components/particle/Text";
import {useAuth0} from "@auth0/auth0-react";
import {Button, CircularProgress} from "@mui/material";
import React, {createContext, useEffect, useState} from "react";
import Pokemon from "../domain/Pokemon";
import {pokemon1, pokemon2, pokemon3} from "../mock/PokemonData";
import NewPokemon from "../components/ molecule/NewPokemon";
import {responseGoodList} from "../type/type";

export const MoveListContext = createContext<string[]>(["なし"])
export const TagListContext = createContext<string[]>(["なし"])
export const GoodListContext = createContext<[number, string][]>([[0, "なし"]])

const BuildPage: NextPage = () => {
    const {isAuthenticated, isLoading} = useAuth0()
    let intiPokemonList: Pokemon[] = []
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const [pokemonList, setPokemonList] = useState<Pokemon[]>(intiPokemonList)
    const [isNewPokemon, setIsNewPokemon] = useState(false)
    const [isLoading1, setIsLoading1] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const [isLoading3, setIsLoading3] = useState(false)
    const [goodList, setGoodList] = useState<[number, string][]>()
    const [tagList, setTagList] = useState<string[]>()
    const [moveList, setMoveList] = useState<string[]>()

    useEffect(() => {
        if (pokemonList.length == 0) {
            setPokemonList([...pokemonList, pokemon1, pokemon2, pokemon3])
        }
    }, [])

    useEffect(() => {
        setIsLoading1(true)
        fetch(baseUrl + "/v1/pokemon_data/get_goods")
            .then((res: { json: () => any; }) => res.json())
            .then((data: responseGoodList) => {
                    setGoodList(data.goods.map(good => [good.id, good.name]))
                    setIsLoading1(false)
                }
            ).catch(
            (reason: any) => {
                console.log(reason)
                setIsLoading1(false)
            }
        )
    }, [])

    useEffect(() => {
        setIsLoading2(true)
        fetch(baseUrl + "/v1/pokemon_data/get_tags")
            .then((res: { json: () => any; }) => res.json())
            .then((data: string[]) => {
                setTagList(data)
                setIsLoading2(false)
            }).catch(
            (reason: any) => {
                console.log(reason)
                setIsLoading2(false)
            }
        )
    }, [])

    useEffect(() => {
        setIsLoading3(true)
        fetch(baseUrl + "/v1/pokemon_data/get_moves")
            .then((res: { json: () => any; }) => res.json())
            .then((data: string[]) => {
                setMoveList(data)
                setIsLoading3(false)
            }).catch(
            (reason: any) => {
                console.log(reason)
                setIsLoading3(false)
            }
        )
    }, [])

    function removePokemon(personalId: number) {
        const removedList = pokemonList.filter(pokemon => pokemon.personalId != personalId)
        setPokemonList(removedList)
    }

    const handleClickOpenNewPokemon = () => {
        setIsNewPokemon(true);
    };

    const handleCloseNewPokemon = () => {
        setIsNewPokemon(false);
    };

    const addPokemon = (newPokemon: Pokemon) => {
        setPokemonList([...pokemonList, newPokemon])
    }

    if (isLoading || isLoading1 || isLoading2 || isLoading3) {
        return (<div>
            <CircularProgress color="inherit"/>
        </div>)
    }

    if (!isAuthenticated) {
        return (<div>
            ログインが必要です！
        </div>)
    } else {
        return (
            <MoveListContext.Provider value={moveList!}>
                <TagListContext.Provider value={tagList!}>
                    <GoodListContext.Provider value={goodList!}>
                        <div className="left_right">
                            <HeadLineText text={"構築1"}/>
                            <Button variant="outlined" color="success"
                                    onClick={handleClickOpenNewPokemon}>ポケモンを追加</Button>
                        </div>
                        <PokemonList pokemonList={pokemonList} pokemonListFunc={setPokemonList}
                                     removePokemon={removePokemon}></PokemonList>
                        <NewPokemon open={isNewPokemon} onClose={handleCloseNewPokemon} setPokemon={addPokemon}/>
                    </GoodListContext.Provider>
                </TagListContext.Provider>
            </MoveListContext.Provider>
        )
    }
}

export default BuildPage