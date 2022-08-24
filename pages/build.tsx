import {NextPage} from "next";
import PokemonList from "../components/ molecule/PokemonList";
import {HeadLineText} from "../components/particle/Text";
import {useAuth0} from "@auth0/auth0-react";
import {Button, CircularProgress, Tooltip} from "@mui/material";
import React, {createContext, useEffect, useState} from "react";
import Pokemon from "../domain/Pokemon";
import NewPokemon from "../components/ molecule/NewPokemon";
import {BuildResponse, KotlinTupleOfIdAndValue, responseGoodList} from "../type/type";
import {getPokemonFromGrownPokemonResponse} from "../util/converter";
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";

export const MoveListContext = createContext<[number, string][]>([[0, "なし"]])
export const TagListContext = createContext<string[]>(["なし"])
export const GoodListContext = createContext<[number, string][]>([[0, "なし"]])
export const BuildIdContext = createContext(0)

const BuildPage: NextPage = () => {
    const {isAuthenticated, isLoading, getAccessTokenSilently, getIdTokenClaims} = useAuth0()
    let intiPokemonList: Pokemon[] = []
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const [pokemonList, setPokemonList] = useState<Pokemon[]>(intiPokemonList)
    const [isNewPokemon, setIsNewPokemon] = useState(false)
    const [isLoading1, setIsLoading1] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const [isLoading3, setIsLoading3] = useState(false)
    const [isLoading4, setIsLoading4] = useState(false)
    const [buildName, setBuildName] = useState("構築")
    const [buildComment, setBuildComment] = useState("てすとてすと")
    const [buildId, setBuildId] = useState(0)
    const [goodList, setGoodList] = useState<[number, string][]>()
    const [tagList, setTagList] = useState<string[]>()
    const [moveList, setMoveList] = useState<[number, string][]>()

    useEffect(() => {
        (async () => {
            if (pokemonList.length == 0) {
                setIsLoading4(true)
                await getAccessTokenSilently()
                let test = await getIdTokenClaims()
                const parameter = {
                    headers: {
                        Authorization: 'Bearer ' + test?.__raw!
                    }
                }
                fetch(baseUrl + "/v1/pokemon_build/get_build", parameter)
                    .then((res: { json: () => any; }) => res.json())
                    .then((data: BuildResponse) => {
                            setBuildName(data.name)
                        setBuildId(data.id)
                        setPokemonList(data.pokemons.map(pokemon => getPokemonFromGrownPokemonResponse(pokemon)).sort(pokemon => pokemon.personalId))
                        setIsLoading4(false)
                        }
                    ).catch(
                    (reason: any) => {
                        console.log(reason)
                        setIsLoading4(false)
                    }
                )
            }
        })()
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
            .then((data: KotlinTupleOfIdAndValue[]) => {
                setMoveList(data.map(move => [move.first, move.second]))
                setIsLoading3(false)
            }).catch(
            (reason: any) => {
                console.log(reason)
                setIsLoading3(false)
            }
        )
    }, [])

    async function removePokemon(personalId: number) {
        setPokemonList(intiPokemonList)
        await sendDate(personalId)
        const removedList = pokemonList.filter(pokemon => pokemon.personalId != personalId)
        setPokemonList(removedList)
    }

    async function sendDate(personalId: number) {
        await getAccessTokenSilently()
        let token = await getIdTokenClaims()
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token?.__raw!,
                "Content-Type": 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify({pokemonId: personalId})
        }
        await fetch(baseUrl + "/v1/pokemon_build/delete_pokemon", parameter)
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

    if (isLoading || isLoading1 || isLoading2 || isLoading3 || isLoading4) {
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
                        <BuildIdContext.Provider value={buildId!}>
                            <PokeBuildHead title="構築"/>
                            <div className="left_right">
                                <Tooltip title={buildComment}>
                                    <HeadLineText text={buildName}/>
                                </Tooltip>
                                <Button variant="outlined" color="success"
                                        onClick={handleClickOpenNewPokemon}>ポケモンを追加</Button>
                            </div>
                            <PokemonList pokemonList={pokemonList} pokemonListFunc={setPokemonList}
                                         removePokemon={removePokemon}></PokemonList>
                            <NewPokemon open={isNewPokemon} onClose={handleCloseNewPokemon} setPokemon={addPokemon}/>
                        </BuildIdContext.Provider>
                    </GoodListContext.Provider>
                </TagListContext.Provider>
            </MoveListContext.Provider>
        )
    }
}

export default BuildPage