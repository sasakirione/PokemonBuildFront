import {NextPage} from "next";
import {useAuth0} from "@auth0/auth0-react";
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import React from "react";
import {HeadLineText} from "../components/particle/Text";
import {useGrownPokemon} from "../components/hook/useGrownPokemon";
import {Loading} from "../components/particle/Loading";
import GrownPokemonTable from "../components/ molecule/GrownPokemonTable";

const PokemonPage: NextPage = () => {
    const {isAuthenticated, isLoading} = useAuth0()
    const {isLoadingPokemonList, pokemonList} = useGrownPokemon()

    if (isLoading || isLoadingPokemonList) {
        return (<Loading isLoading={true}/>)
    }

    if (!isAuthenticated) {
        return (<div>
            ログインが必要です！
        </div>)
    } else {
        return (
            <>
                <PokeBuildHead title="育成済みポケモン一覧"/>
                <div className="left_right">
                    <div className="boxContainer">
                        <HeadLineText text="育成済みポケモン一覧"/>
                    </div>

                </div>
                {pokemonList.length > 0 &&
                    <GrownPokemonTable pokemons={pokemonList}/>
                }
            </>
        )
    }
}

export default PokemonPage