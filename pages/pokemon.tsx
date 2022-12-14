import {NextPage} from "next";
import {useAuth0} from "@auth0/auth0-react";
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import React, {useState} from "react";
import {HeadLineText} from "../components/particle/Text";
import {useGrownPokemon} from "../components/hook/useGrownPokemon";
import {Loading} from "../components/particle/Loading";
import {Button} from "@mui/material";
import NewPokemon from "../components/molecule/NewPokemon";
import GrownPokemonTable from "../components/molecule/GrownPokemonTable";

const PokemonPage: NextPage = () => {
    const {isAuthenticated, isLoading} = useAuth0()
    const {isLoadingPokemonList, pokemonList, reloadPokemon} = useGrownPokemon()
    const [isOpenNew, setIsOpenNew] = useState(false)

    function closeNewPokemonScreen() {
        setIsOpenNew(false)
    }

    function openNewPokemonScreen() {
        setIsOpenNew(true)
    }

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
                    <Button variant="outlined" color="success" className={"head-button"}
                            onClick={openNewPokemonScreen}>ポケモンを追加</Button>
                    <NewPokemon open={isOpenNew} onClose={closeNewPokemonScreen} setPokemon={reloadPokemon}
                                isBuild={false} buildId={0}/>
                </div>
                {pokemonList.length > 0 &&
                    <GrownPokemonTable pokemons={pokemonList}/>
                }
                <br/>
            </>
        )
    }
}

export default PokemonPage