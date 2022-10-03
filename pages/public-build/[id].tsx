import {NextPage} from "next";
import {PokeBuildHead} from "../../components/atomic/PokeBuildHead";
import {HeadLineText} from "../../components/particle/Text";
import {Button} from "@mui/material";
import React, {useState} from "react";
import {BuildResponse} from "../../type/type";
import {getPokemonFromGrownPokemonResponse} from "../../util/converter";
import Pokemon from "../../domain/Pokemon";
import PokemonListPublic from "../../components/molecule/PokemonListPublic";
import {useRouter} from "next/router";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

const PublicBuild: NextPage<PublicBuildProps> = (props) => {
    const build = (props.res as BuildResponse)
    const pokemonList = build.pokemons.map(pokemon => getPokemonFromGrownPokemonResponse(pokemon))
    const [isUsedNickname, setIsUsedNickname] = useState(false)
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

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
            {build.id == 0 && <div>非公開の構築です</div>}
        </>
    )
}

export const getStaticProps = async (context: { params: { id: string; }; }) => {
    const publicId = context.params?.id ?? "0"
    const res = await getBuild(publicId as string)

    return {
        props: res,
        revalidate: 60 * 15,
    }
}


export const getStaticPaths = async () => {
    const idList = await getPublicBuildIdList()
    const paths = idList.map(id => ({params: {id: id}}))

    return {
        paths,
        fallback: 'blocking',
    };
};

const getPublicBuildIdList = async () => {
    let idList: string[] = []
    await fetch(baseUrl + "/v1/public-build")
        .then((res: { json: () => any; }) => res.json())
        .then((data: BuildResponse[]) => {
            idList = data.map(build => build.id?.toString() ?? "0")
        })
        .catch((reason: any) => {
            console.log(reason)
        })
    return idList
}


const getBuild = async (id: string) => {
    let res

    if (id != undefined && id != "0") {
        res = await fetch(baseUrl + "/v1/public-build/" + id)
            .then((res: { json: () => any; }) => res.json())
            .catch((reason: any) => {
                console.log(reason)
            })
    } else {
        res = {
            id: 0,
            name: "非公開の構築",
            pokemons: []
        }
    }

    return {res}
}

type PublicBuildProps = {
    res: any,
    pokemonList: Pokemon[]
}

export default PublicBuild