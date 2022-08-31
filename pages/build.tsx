import {NextPage} from "next";
import PokemonList from "../components/ molecule/PokemonList";
import {HeadLineText} from "../components/particle/Text";
import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import Pokemon from "../domain/Pokemon";
import NewPokemon from "../components/ molecule/NewPokemon";
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import {Loading} from "../components/particle/Loading";
import useBuildPokemon from "../components/hook/useBuildPokemon";
import usePokemonConst from "../components/hook/usePokemonConst";
import useBuilds from "../components/hook/useBuilds";

const BuildPage: NextPage = () => {
    const {isAuthenticated, isLoading} = useAuth0()
    const {selectedBuild, setSelectedBuild} = useBuilds()
    const {currentBuild, pokemonList, setPokemonList, removePokemon, isLoadingPokemon} = useBuildPokemon(selectedBuild)
    const [isOpenNewPokemonScreen, setIsOpenNewPokemonScreen] = useState(false)
    const {isLoadingConst} = usePokemonConst()

    useEffect(() => {
        if (selectedBuild.id != currentBuild.id) {
            setSelectedBuild(currentBuild)
        }
    }, [selectedBuild, currentBuild, setSelectedBuild])

    const handleClickOpenNewPokemon = () => {
        setIsOpenNewPokemonScreen(true);
    };

    const handleCloseNewPokemon = () => {
        setIsOpenNewPokemonScreen(false);
    };

    const addPokemon = (newPokemon: Pokemon) => {
        setPokemonList([...pokemonList, newPokemon])
    }

    if (isLoading || isLoadingConst || isLoadingPokemon) {
        return (<Loading isLoading={true}/>)
    }

    if (!isAuthenticated) {
        return (<div>
            ログインが必要です！
        </div>)
    } else {
        return (<>
                <PokeBuildHead title="構築"/>
                <div className="left_right">
                    <HeadLineText text={selectedBuild.name}/>
                    <Button variant="outlined" color="success"
                            onClick={handleClickOpenNewPokemon}>ポケモンを追加</Button>
                </div>
                <PokemonList pokemonList={pokemonList} pokemonListFunc={setPokemonList}
                             removePokemon={removePokemon}></PokemonList>
                <NewPokemon open={isOpenNewPokemonScreen} onClose={handleCloseNewPokemon} setPokemon={addPokemon}/>
            </>
        )
    }
}

export default BuildPage