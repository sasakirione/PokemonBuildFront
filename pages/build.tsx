import {NextPage} from "next";
import {HeadLineText} from "../components/particle/Text";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import React, {useState} from "react";
import Pokemon from "../domain/Pokemon";
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import {Loading} from "../components/particle/Loading";
import useBuilds from "../components/hook/useBuilds";
import {BuildList} from "../components/molecule/BuildList";
import NewPokemon from "../components/molecule/NewPokemon";
import PokemonList from "../components/molecule/PokemonList";
import {BuildPrivacyEdit} from "../components/molecule/BuildPrivacyEdit";


const BuildPage: NextPage = () => {
    const {isAuthenticated, isLoading} = useAuth0()
    const {
        builds,
        selectedBuild,
        setSelectedBuild,
        pokemonList,
        setPokemonList,
        removePokemon,
        isLoadingPokemon,
        setBuilds
    } = useBuilds()
    const [isOpenNewPokemonScreen, setIsOpenNewPokemonScreen] = useState(false)
    const [isOpenPublicScreen, setIsOpenPublicScreen] = useState(false)

    const handleClickOpenNewPokemon = () => {
        setIsOpenNewPokemonScreen(true);
    };

    const handleCloseNewPokemon = () => {
        setIsOpenNewPokemonScreen(false);
    };

    const handleClickOpenPublic = () => {
        setIsOpenPublicScreen(true);
    }

    const handleClosePublic = () => {
        setIsOpenPublicScreen(false);
    }

    const addPokemon = (newPokemon: Pokemon) => {
        setPokemonList([...pokemonList, newPokemon])
    }

    if (isLoading || isLoadingPokemon) {
        return (<Loading isLoading={true}/>)
    }

    if (!isAuthenticated) {
        return (<div>
            ログインが必要です！
        </div>)
    } else if ((selectedBuild?.id ?? 0) == 0) {
        return (<Loading isLoading={true}/>)
    }

    return (
        <>
            <PokeBuildHead title="構築"/>
            <div className="left_right">
                <div className="boxContainer">
                    <HeadLineText text={selectedBuild.name}/>
                    <BuildList selectBuild={selectedBuild} setSelectBuild={setSelectedBuild} builds={builds}
                               setBuilds={setBuilds}/>
                </div>
                <div>
                    <Button variant="outlined" color="success" className={"head-button"}
                            onClick={handleClickOpenPublic}>構築公開設定</Button>
                    <Button variant="outlined" color="success" className={"head-button"}
                            data-test-id="button-add-pokemon-in-build"
                            onClick={handleClickOpenNewPokemon}>ポケモンを追加</Button>
                </div>
            </div>
            <PokemonList pokemonList={pokemonList} pokemonListFunc={setPokemonList}
                         removePokemon={removePokemon}></PokemonList>
            {isOpenNewPokemonScreen &&
                <NewPokemon open={isOpenNewPokemonScreen} onClose={handleCloseNewPokemon} setPokemon={addPokemon}
                            isBuild={true} buildId={selectedBuild.id}/>}
            {isOpenPublicScreen &&
                <BuildPrivacyEdit open={isOpenPublicScreen} onClose={handleClosePublic} buildId={selectedBuild.id}/>}
        </>
    )
}

export default BuildPage