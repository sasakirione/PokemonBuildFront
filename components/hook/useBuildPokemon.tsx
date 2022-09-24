import {useEffect, useState} from "react";
import {BuildObject, BuildResponse} from "../../type/type";
import {getPokemonFromGrownPokemonResponse} from "../../util/converter";
import Pokemon from "../../domain/Pokemon";
import useToken from "./useToken";
import {usePokemonConst} from "./PokemonConst";

const defaultPokemonList: Pokemon[] = []

const useBuildPokemon = (currentBuild: BuildObject) => {
    const [isLoadingBuild, setIsLoadingBuild] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const {isAuthenticated, token} = useToken()
    const [pokemonList, setPokemonList] = useState<Pokemon[]>(defaultPokemonList)
    const [finalBuildId, setFinalBuildId] = useState(0)
    const {setToast} = usePokemonConst()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const isLoadingPokemon = isLoadingBuild || isLoadingDelete

    useEffect(() => {
        if (isAuthenticated && token != "" && (finalBuildId != currentBuild.id) && currentBuild.id != 0) {
            setIsLoadingBuild(true)
            const parameter = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
            fetch(baseUrl + "/v1/pokemon-build/builds/" + currentBuild.id, parameter)
                .then((res: { json: () => any; }) => res.json())
                .then((data: BuildResponse) => {
                    setFinalBuildId(data.id)
                    setPokemonList(data.pokemons.map(pokemon => getPokemonFromGrownPokemonResponse(pokemon)))
                    setIsLoadingBuild(false)
                })
                .catch((reason: any) => {
                        console.log(reason)
                        setIsLoadingBuild(false)
                        setToast("構築の取得に失敗しました。リロードしてください。", "error")
                    }
                )
        }
    }, [baseUrl, currentBuild, finalBuildId, isAuthenticated, setToast, token])

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