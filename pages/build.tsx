import {NextPage} from "next";
import PokemonList from "../components/atomic/PokemonList";

const BuildPage: NextPage = () => {
    return (
        <div>
            <PokemonList></PokemonList>
        </div>
    )
}

export default BuildPage