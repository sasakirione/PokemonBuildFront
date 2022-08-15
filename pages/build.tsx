import {NextPage} from "next";
import PokemonList from "../components/atomic/PokemonList";
import {HeadLineText} from "../components/particle/Text";
import {useAuth0} from "@auth0/auth0-react";
import {CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import Pokemon from "../domain/Pokemon";
import {pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6} from "../mock/PokemonData";
import pokemon from "../domain/Pokemon";

const BuildPage: NextPage = () => {
    const {isAuthenticated, isLoading} = useAuth0()
    let intiPokemonList: Pokemon[] = []
    const [pokemonList, setPokemonList] = useState<Pokemon[]>(intiPokemonList)

    useEffect(() => {
        if (pokemonList.length == 0) {
            setPokemonList([...pokemonList, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6])
        }
    }, [])

    if (isLoading) {
        return (<div>
            <CircularProgress color="inherit" />
        </div>)
    }

    if (!isAuthenticated) {
        return (<div>
            ログインが必要です！
        </div>)
    } else {
        return (
            <div>
                <HeadLineText text={"構築1"}/>
                <PokemonList pokemonList={pokemonList} pokemonListFunc={setPokemonList}></PokemonList>
            </div>
        )
    }
}

export default BuildPage