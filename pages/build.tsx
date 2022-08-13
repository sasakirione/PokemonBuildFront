import {NextPage} from "next";
import PokemonList from "../components/atomic/PokemonList";
import {HeadLineText} from "../components/particle/Text";
import {useAuth0} from "@auth0/auth0-react";
import {CircularProgress} from "@mui/material";

const BuildPage: NextPage = () => {
    const {isAuthenticated, isLoading} = useAuth0()

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
                <PokemonList></PokemonList>
            </div>
        )
    }
}

export default BuildPage