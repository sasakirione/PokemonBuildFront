import {useEffect, useState} from "react";
import {BuildObject, BuildResponse} from "../../type/type";
import {getPokemonFromGrownPokemonResponse} from "../../util/converter";
import Pokemon from "../../domain/Pokemon";
import useToken from "./useToken";

const useBuildPokemon = (build: BuildObject) => {
    const [isLoadingBuild, setIsLoadingBuild] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const {isAuthenticated, token} = useToken()
    const [currentBuild, setCurrentBuild] = useState<BuildObject>(build)
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const isLoadingPokemon = isLoadingBuild || isLoadingDelete

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoadingBuild(true)
            const parameter = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
            const idQuery = currentBuild.id == 0 ? "" : "/" + currentBuild.id
            fetch(baseUrl + "/v1/pokemon_build/get_build" + idQuery, parameter)
                .then((res: { json: () => any; }) => res.json())
                .then((data: BuildResponse) => {
                    if (currentBuild.id == 0) {
                        const buildData = {comment: "なし", id: data.id, name: data.name}
                        setCurrentBuild(buildData)
                    }
                    setPokemonList(data.pokemons.map(pokemon => getPokemonFromGrownPokemonResponse(pokemon)))
                    setIsLoadingBuild(false)
                })
                .catch((reason: any) => {
                        console.log(reason)
                        setIsLoadingBuild(false)
                    }
                )
        }
    }, [baseUrl, currentBuild.id, isAuthenticated, token])

    async function removePokemon(personalId: number) {
        setIsLoadingDelete(true)
        setPokemonList([])
        await sendDate(personalId)
        const removedList = pokemonList.filter(pokemon => pokemon.personalId != personalId)
        setPokemonList(removedList)
        setIsLoadingDelete(false)
    }

    async function sendDate(personalId: number) {
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify({pokemonId: personalId})
        }
        await fetch(baseUrl + "/v1/pokemon_build/delete_pokemon", parameter)
    }

    return {currentBuild, pokemonList, setPokemonList, removePokemon, isLoadingPokemon}
}

export default useBuildPokemon