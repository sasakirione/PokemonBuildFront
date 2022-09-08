import {useEffect, useState} from "react";
import {BuildObject} from "../../type/type";
import useBuildPokemon from "./useBuildPokemon";
import useToken from "./useToken";

const useBuilds = () => {
    const [builds, setBuilds] = useState<BuildObject[]>([{comment: "なし", id: 0, name: "デフォルトの構築"}])
    const [selectedBuild, setSelectedBuild] = useState<BuildObject>({comment: "なし", id: 0, name: "デフォルトの構築"})
    const {pokemonList, setPokemonList, removePokemon, isLoadingPokemon} = useBuildPokemon(selectedBuild)
    const {isAuthenticated, token} = useToken()
    const [isBuildLoading, setIsBuildLoading] = useState(false)
    const [isDone, setIsDone] = useState(false)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
        if (isAuthenticated && token != "" && builds[0].id == 0) {
            setIsBuildLoading(true)
            const parameter = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
            fetch(baseUrl + "/v1/pokemon-build/builds", parameter)
                .then((res: { json: () => any; }) => res.json())
                .then((data: BuildObject[]) => {
                    setBuilds(data)
                    setSelectedBuild(data.sort(x => x.id)[0])
                    setIsBuildLoading(false)
                    setIsDone(true)
                })
                .catch((reason: any) => {
                    console.log(reason)
                    setIsBuildLoading(false)
                })
        }
    }, [baseUrl, builds, isAuthenticated, isDone, token])

    return {
        builds,
        selectedBuild,
        setSelectedBuild,
        isBuildLoading,
        pokemonList,
        setPokemonList,
        removePokemon,
        isLoadingPokemon
    }
}

export default useBuilds