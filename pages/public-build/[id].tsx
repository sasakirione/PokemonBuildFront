import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {PokeBuildHead} from "../../components/atomic/PokeBuildHead";
import {HeadLineText} from "../../components/particle/Text";
import {Button} from "@mui/material";
import React, {useState} from "react";
import {BuildObject, BuildResponse} from "../../type/type";
import {getPokemonFromGrownPokemonResponse} from "../../util/converter";
import Pokemon from "../../domain/Pokemon";
import PokemonListPublic from "../../components/molecule/PokemonListPublic";

const defaultBuild = {comment: "なし", id: 0, name: "デフォルトの構築"}
const defaultPokemonList: Pokemon[] = []
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

const PublicBuild: NextPage<PublicBuildProps> = (props) => {
    const [build, setBuild] = useState<BuildObject>(props.build)
    const [pokemonList, setPokemonList] = useState<Pokemon[]>(props.pokemonList)
    const [isUsedNickname, setIsUsedNickname] = useState(false)

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

export const getStaticProps: GetStaticProps<PublicBuildProps> = async ({params}) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const publicId = params?.id ?? "0"
    const {build, pokemonList} = await getBuild(publicId[0])

    return {
        props: {
            build: build,
            pokemonList: pokemonList
        },
        revalidate: 60 * 15,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

const getBuild = async (id: string) => {
    let build: BuildObject = defaultBuild
    let pokemonList: Pokemon[] = defaultPokemonList

    if (id != undefined) {
        fetch(baseUrl + "/v1/public-build/" + id)
            .then((res: { json: () => any; }) => res.json())
            .then((data: BuildResponse) => {
                build = {comment: "", id: data.id, name: data.name}
                pokemonList = data.pokemons.map(pokemon => getPokemonFromGrownPokemonResponse(pokemon))
            })
            .catch((reason: any) => {
                console.log(reason)
            })
    }
    return {build, pokemonList}
}

type PublicBuildProps = {
    build: BuildObject,
    pokemonList: Pokemon[]
}

export default PublicBuild