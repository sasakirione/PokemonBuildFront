import {useEffect, useState} from "react";
import {KotlinTupleOfIdAndValue, responseGoodList} from "../../type/type";

const usePokemonConst = () => {
    const [goodList, setGoodList] = useState<[number, string][]>([[0, "なし"]])
    const [tagList, setTagList] = useState<string[]>([""])
    const [moveList, setMoveList] = useState<[number, string][]>([[0, "なし"]])
    const [isLoadingGood, setIsLoadingGood] = useState(false)
    const [isLoadingTag, setIsLoadingTag] = useState(false)
    const [isLoadingPokemon, setIsLoadingPokemon] = useState(false)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
        setIsLoadingGood(true)
        fetch(baseUrl + "/v1/pokemon_data/get_goods")
            .then((res: { json: () => any; }) => res.json())
            .then((data: responseGoodList) => {
                    setGoodList(data.goods.map(good => [good.id, good.name]))
                    setIsLoadingGood(false)
                }
            ).catch(
            (reason: any) => {
                console.log(reason)
                setIsLoadingGood(false)
            }
        )
    }, [baseUrl])

    useEffect(() => {
        setIsLoadingTag(true)
        fetch(baseUrl + "/v1/pokemon_data/get_tags")
            .then((res: { json: () => any; }) => res.json())
            .then((data: string[]) => {
                setTagList(data)
                setIsLoadingTag(false)
            }).catch(
            (reason: any) => {
                console.log(reason)
                setIsLoadingTag(false)
            }
        )
    }, [baseUrl])

    useEffect(() => {
        setIsLoadingPokemon(true)
        fetch(baseUrl + "/v1/pokemon_data/get_moves")
            .then((res: { json: () => any; }) => res.json())
            .then((data: KotlinTupleOfIdAndValue[]) => {
                setMoveList(data.map(move => [move.first, move.second]))
                setIsLoadingPokemon(false)
            }).catch(
            (reason: any) => {
                console.log(reason)
                setIsLoadingPokemon(false)
            }
        )
    }, [baseUrl])

    return {
        goodList: goodList,
        tagList: tagList,
        moveList: moveList,
        isLoadingConst: (isLoadingGood || isLoadingTag || isLoadingPokemon)
    }
}

export default usePokemonConst