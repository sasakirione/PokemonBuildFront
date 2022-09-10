import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {KotlinTupleOfIdAndValue, PokemonConst, responseGoodList, ToastType} from "../../type/type";
import toast from "react-hot-toast";

const setToast = (message: string, type: ToastType) => {
    if (type == "error") {
        toast.error(message)
    } else {
        toast(message)
    }
}

const PokemonConstContext = createContext<PokemonConst>({
    goodList: [[0, "初期表示"]],
    tagList: ["初期表示"],
    moveList: [[0, "初期表示"]],
    isLoadingConst: false,
    setToast: setToast
})

export const PokemonConstProvider = ({children}: { children: ReactNode }) => {
    const [goodList, setGoodList] = useState<[number, string][]>([[0, "なし"]])
    const [tagList, setTagList] = useState<string[]>([""])
    const [moveList, setMoveList] = useState<[number, string][]>([[0, "なし"]])
    const [isLoadingGood, setIsLoadingGood] = useState(false)
    const [isLoadingTag, setIsLoadingTag] = useState(false)
    const [isLoadingMove, setIsLoadingMove] = useState(false)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
        setIsLoadingGood(true)
        fetch(baseUrl + "/v1/pokemon-data/goods")
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
        fetch(baseUrl + "/v1/pokemon-data/tags")
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
        setIsLoadingMove(true)
        fetch(baseUrl + "/v1/pokemon-data/moves")
            .then((res: { json: () => any; }) => res.json())
            .then((data: KotlinTupleOfIdAndValue[]) => {
                setMoveList(data.map(move => [move.first, move.second]))
                setIsLoadingMove(false)
            }).catch(
            (reason: any) => {
                console.log(reason)
                setIsLoadingMove(false)
            }
        )
    }, [baseUrl])

    return (
        <PokemonConstContext.Provider value={{
            goodList: goodList,
            tagList: tagList,
            moveList: moveList,
            isLoadingConst: (isLoadingGood || isLoadingTag || isLoadingMove),
            setToast: setToast
        }}>
            {children}
        </PokemonConstContext.Provider>
    )
}

export const usePokemonConst = (): PokemonConst => {
    const pokemonConst = useContext(PokemonConstContext)

    if (pokemonConst == null) throw new Error("PokemonConstProvider でラップしてください。");

    return pokemonConst
}