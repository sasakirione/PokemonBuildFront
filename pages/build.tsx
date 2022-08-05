import {NextPage} from "next";
import PokemonList from "../components/atomic/PokemonList";
import {HeadLineText} from "../components/particle/Text";

const BuildPage: NextPage = () => {
    return (
        <div>
            <HeadLineText text={"構築1"} />
            <PokemonList></PokemonList>
        </div>
    )
}

export default BuildPage