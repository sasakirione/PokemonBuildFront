import {useRouter} from "next/router";
import {NextPage} from "next";
import {PokeBuildHead} from "../../components/atomic/PokeBuildHead";
import {HeadLineText} from "../../components/particle/Text";
import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import {BuildObject, BuildResponse} from "../../type/type";
import {getPokemonFromGrownPokemonResponse} from "../../util/converter";
import Pokemon from "../../domain/Pokemon";
import {usePokemonConst} from "../../components/hook/PokemonConst";
import PokemonListPublic from "../../components/molecule/PokemonListPublic";
import {Loading} from "../../components/particle/Loading";

const defaultBuild = {comment: "なし", id: 0, name: "デフォルトの構築"}
const defaultPokemonList: Pokemon[] = []

const PublicBuild: NextPage = () => {
    const router = useRouter()
    const {id} = router.query
    const [build, setBuild] = useState<BuildObject>(defaultBuild)
    const [pokemonList, setPokemonList] = useState<Pokemon[]>(defaultPokemonList)
    const [isUsedNickname, setIsUsedNickname] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const {setToast} = usePokemonConst()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
        if (id != undefined) {
            setIsLoading(true)
            fetch(baseUrl + "/v1/public-build/" + id)
                .then((res: { json: () => any; }) => res.json())
                .then((data: BuildResponse) => {
                    setPokemonList(data.pokemons.map(pokemon => getPokemonFromGrownPokemonResponse(pokemon)))
                    setBuild({comment: "", id: data.id, name: data.name})
                })
                .catch((reason: any) => {
                    console.log(reason)
                    setToast("構築の取得に失敗しました", "error")
                })
            setIsLoading(false)
        }
    }, [baseUrl, id, setToast])

    return (
        <>
            <PokeBuildHead title="公開構築"/>
            <div className="left_right">
                <div className="boxContainer">
                    <HeadLineText text={build.name}/>
                </div>
                <div>
                    <Button variant="contained" className={"head-button"}
                            onClick={() => setIsUsedNickname(!isUsedNickname)}>ポケモン名/ニックネーム切替</Button>
                </div>
            </div>
            {build.id != 0 &&
                <PokemonListPublic isUsedNickname={isUsedNickname} pokemonList={pokemonList}></PokemonListPublic>}
            {isLoading && <Loading isLoading={true}/>}
        </>
    )
}

export default PublicBuild