import {useEffect, useState} from "react";
import Pokemon from "../../domain/Pokemon";
import useToken from "./useToken";
import {GrownPokemon} from "../../type/type";
import {getPokemonFromGrownPokemonResponse} from "../../util/converter";

export const useGrownPokemon = () => {
    const {isAuthenticated, token} = useToken()
    const [isLoadingPokemonList, setIsLoadingPokemonList] = useState(false)
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
        if (isAuthenticated && token != "" && pokemonList.length < 1) {
            setIsLoadingPokemonList(true)
            const parameter = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
            fetch(baseUrl + "/v1/pokemon-build/grown-pokemons", parameter)
                .then((res: { json: () => any; }) => res.json())
                .then((data: GrownPokemon[]) => {
                    setPokemonList(data.map(pokemon => getPokemonFromGrownPokemonResponse(pokemon)))
                    setIsLoadingPokemonList(false)
                })
                .catch((reason: any) => {
                        console.log(reason)
                        setIsLoadingPokemonList(false)
                    }
                )
        }

    }, [baseUrl, isAuthenticated, pokemonList.length, token])

    return {isLoadingPokemonList, pokemonList}
}