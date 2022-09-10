import {NextPage} from "next";
import PokemonList from "../components/ molecule/PokemonList";
import {HeadLineText} from "../components/particle/Text";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import React, {useState} from "react";
import Pokemon from "../domain/Pokemon";
import NewPokemon from "../components/ molecule/NewPokemon";
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import {Loading} from "../components/particle/Loading";
import useBuilds from "../components/hook/useBuilds";
import {BuildList} from "../components/ molecule/BuildList";


const BuildPage: NextPage = () => {
    const {isAuthenticated, isLoading} = useAuth0()
    const {
        builds,
        selectedBuild,
        setSelectedBuild,
        pokemonList,
        setPokemonList,
        removePokemon,
        isLoadingPokemon
    } = useBuilds()
    const [isOpenNewPokemonScreen, setIsOpenNewPokemonScreen] = useState(false)

    const handleClickOpenNewPokemon = () => {
        setIsOpenNewPokemonScreen(true);
    };

    const handleCloseNewPokemon = () => {
        setIsOpenNewPokemonScreen(false);
    };

    const addPokemon = (newPokemon: Pokemon) => {
        setPokemonList([...pokemonList, newPokemon])
    }

    if (isLoading || isLoadingPokemon || selectedBuild.id == 0) {
        return (<Loading isLoading={true}/>)
    }

    if (!isAuthenticated) {
        return (<div>
            ログインが必要です！
        </div>)
    } else {
        return (
            <>
                <PokeBuildHead title="構築"/>
                <div className="left_right">
                    <div className="boxContainer">
                        <HeadLineText text={selectedBuild.name}/>
                        <BuildList selectBuild={selectedBuild} setSelectBuild={setSelectedBuild} builds={builds}/>
                    </div>
                    <Button variant="outlined" color="success"
                            onClick={handleClickOpenNewPokemon}>ポケモンを追加</Button>
                </div>
                <PokemonList pokemonList={pokemonList} pokemonListFunc={setPokemonList}
                             removePokemon={removePokemon}></PokemonList>
                <NewPokemon
                    open={isOpenNewPokemonScreen} onClose={handleCloseNewPokemon} setPokemon={addPokemon} isBuild={true}
                    buildId={selectedBuild.id}/>
            </>
        )
    }
}

export default BuildPage