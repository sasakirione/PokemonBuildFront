import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {KotlinTupleOfIdAndValue, PokemonConst, responseGoodList, Setting, ToastType} from "../../type/type";
import toast from "react-hot-toast";
import useToken from "./useToken";
import axios from "axios";
import useSWR from "swr";

const setToast = (message: string, type: ToastType) => {
    if (type == "error") {
        toast.error(message)
    } else {
        toast(message)
    }
}

const goodListInti: [number, string][] = [[0, "道具一覧の取得に失敗しました"]]
const tagListInti = ["タグ一覧の取得に失敗しました"]
const moveListInti: [number, string][] = [[0, "技一覧の取得に失敗しました"]]
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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

export const PokemonConstProvider = ({children}: { children: ReactNode }) => {
    const {isAuthenticated, token} = useToken()
    const fetcher = (url: string) => axios.get(url).then(res => res.data)
    const {data: goodList} = useSWR<responseGoodList>(() => `${baseUrl}/v1/pokemon-data/goods`, fetcher)
    const {data: tagList} = useSWR<string[]>(() => `${baseUrl}/v1/pokemon-data/tags`, fetcher)
    const {data: moveList} = useSWR<KotlinTupleOfIdAndValue[]>(() => `${baseUrl}/v1/pokemon-data/moves`, fetcher)
    const [isLoadingSetting, setIsLoadingSetting] = useState(false)
    const [setting, setSetting] = useState<Setting>(defaultSetting)

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
    }, [isAuthenticated, token])

    return (
        <PokemonConstContext.Provider value={{
            goodList: goodList ? goodList.goods.map(good => [good.id, good.name]) : goodListInti,
            tagList: tagList ? tagList : tagListInti,
            moveList: moveList ? moveList.map(move => [move.first, move.second]) : moveListInti,
            isLoadingConst: (isLoadingSetting),
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