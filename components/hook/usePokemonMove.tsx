import useSWR from "swr"
import {usePokemonConst} from "./PokemonConst";
import axios from "axios";
import {useEffect, useState} from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

export const usePokemonMove = (pokemonId: number) => {
    const fetcher = (url: string) => axios.get(url).then(res => res.data)
    const {moveList} = usePokemonConst()
    const [selectedMoveList, setSelectedMoveList] = useState<[number, string][]>(moveList)
    const {
        data: selectMoveIds,
        error
    } = useSWR<number[]>(() => `${baseUrl}/v1/pokemon-data/pokemons/${pokemonId}/moves`, fetcher)

    useEffect(() => {
        if (selectMoveIds != undefined && selectMoveIds[0] != 0) {
            setSelectedMoveList(moveList.filter((move) => selectMoveIds.includes(move[0])))
        }
    }, [moveList, selectMoveIds])

    return {moveList: selectedMoveList, error}
}
