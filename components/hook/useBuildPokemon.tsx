import {useEffect, useState} from "react";
import {BuildObject, BuildResponse} from "../../type/type";
import {getPokemonFromGrownPokemonResponse} from "../../util/converter";
import Pokemon from "../../domain/Pokemon";
import useToken from "./useToken";
import useSWR from "swr";
import axios from "axios";

const defaultPokemonList: Pokemon[] = []

const useBuildPokemon = (currentBuild: BuildObject) => {
    const [isLoadingBuild, setIsLoadingBuild] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const {isAuthenticated, token} = useToken()
    const [pokemonList, setPokemonList] = useState<Pokemon[]>(defaultPokemonList)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const isLoadingPokemon = isLoadingBuild || isLoadingDelete
    const canBuildDownloading = isAuthenticated && token != "" && (currentBuild?.id ?? 0) != 0
    const fetcherWithToken = (url: string) => axios.get(url, {headers: {Authorization: `Bearer ${token}`}}).then(res => res.data)
    const {
        data: rawBuild,
        error
    } = useSWR<BuildResponse>(() => canBuildDownloading ? `${baseUrl}/v1/pokemon-build/builds/${currentBuild.id}` : null, fetcherWithToken)

    useEffect(() => {
        if (isAuthenticated && rawBuild == undefined && error == undefined) {
            setIsLoadingBuild(true)
        } else {
            setIsLoadingBuild(false)
        }
    }, [error, isAuthenticated, rawBuild])

    useEffect(() => {
        if (rawBuild != undefined) {
            setPokemonList(rawBuild.pokemons.map(pokemon => getPokemonFromGrownPokemonResponse(pokemon)))
        }
    }, [rawBuild])

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
        }
        await fetch(baseUrl + "/v1/pokemon-build/builds/" + currentBuild.id + "/pokemon/" + personalId, parameter)
    }

    return {currentBuild, pokemonList, setPokemonList, removePokemon, isLoadingPokemon}
}

export default useBuildPokemon