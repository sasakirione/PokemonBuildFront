import {useEffect, useState} from "react";
import Pokemon from "../../domain/Pokemon";
import useToken from "./useToken";
import {GrownPokemon} from "../../type/type";
import {getPokemonFromGrownPokemonResponse} from "../../util/converter";
import useSWR from "swr";
import axios from "axios";

export const useGrownPokemon = () => {
    const {token, isGetToken} = useToken()
    const [isLoadingPokemonList, setIsLoadingPokemonList] = useState(false)
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const fetcherWithToken = (url: string) => axios.get(url, {headers: {Authorization: `Bearer ${token}`}}).then(res => res.data)
    const {
        data,
        mutate
    } = useSWR<GrownPokemon[]>(isGetToken ? baseUrl + "/v1/pokemon-build/grown-pokemons" : null, fetcherWithToken)

    useEffect(() => {
        if (data != undefined) {
            setPokemonList(data.map(pokemon => getPokemonFromGrownPokemonResponse(pokemon)))
        }
    }, [data])

    useEffect(() => {
        if (data == undefined) {
            setIsLoadingPokemonList(true)
        } else {
            setIsLoadingPokemonList(false)
        }
    }, [data])

    async function reloadPokemon() {
        await mutate()
    }

    return {isLoadingPokemonList, pokemonList, reloadPokemon}
}