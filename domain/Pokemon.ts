import PokemonStatus from "./PokemonStatus";
import {PokemonNature} from "../type/type";

class Pokemon {
    name: string
    status: PokemonStatus
    nature: PokemonNature
    ability: string
    good: string
    tag: string[]

    constructor(name: string, status: PokemonStatus, nature: PokemonNature, ability: string, good: string, tag: string[]) {
        this.name = name
        this.status = status
        this.nature = nature
        this.ability = ability
        this.good = good
        this.tag = tag
    }
}

export default Pokemon