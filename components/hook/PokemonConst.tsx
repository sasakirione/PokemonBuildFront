import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {KotlinTupleOfIdAndValue, PokemonConst, responseGoodList, Setting, ToastType} from "../../type/type";
import toast from "react-hot-toast";
import useToken from "./useToken";

const setToast = (message: string, type: ToastType) => {
    if (type == "error") {
        toast.error(message)
    } else {
        toast(message)
    }
}

const goodListInti: [number, string][] = [[0, "初期表示"]]
const tagListInti = ["初期表示"]
const moveListInti: [number, string][] = [[0, "初期表示"]]
const defaultSetting: Setting = {isUsedNickname: false}

const PokemonConstContext = createContext<PokemonConst>({
    goodList: goodListInti,
    tagList: tagListInti,
    moveList: moveListInti,
    isLoadingConst: false,
    setting: {isUsedNickname: false},
    setSetting: null,
    setToast: setToast
})

export const PokemonConstProvider = ({children}: { children: ReactNode }) => {
    const {isAuthenticated, token} = useToken()
    const [goodList, setGoodList] = useState<[number, string][]>(goodListInti)
    const [tagList, setTagList] = useState<string[]>(tagListInti)
    const [moveList, setMoveList] = useState<[number, string][]>(moveListInti)
    const [isLoadingGood, setIsLoadingGood] = useState(false)
    const [isLoadingTag, setIsLoadingTag] = useState(false)
    const [isLoadingMove, setIsLoadingMove] = useState(false)
    const [isLoadingSetting, setIsLoadingSetting] = useState(false)
    const [setting, setSetting] = useState<Setting>(defaultSetting)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
        if (isAuthenticated && token != "") {
            setIsLoadingSetting(true)
            const parameter = {
                headers: {
                    Authorization: 'Bearer ' + token
                },
                method: "GET"
            }
            fetch(baseUrl + "/v1/user/setting", parameter)
                .then(res => res.json())
                .then((res: Setting) => {
                    setSetting(res)
                    setIsLoadingSetting(false)
                }).catch((reason: any) => {
                console.log(reason)
                setIsLoadingSetting(false)
            })
        }
    }, [baseUrl, isAuthenticated, token])

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
            isLoadingConst: (isLoadingGood || isLoadingTag || isLoadingMove || isLoadingSetting),
            setting: setting,
            setSetting: setSetting,
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