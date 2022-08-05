import PokemonStatus from "./PokemonStatus";
import {Moves, PokemonNature} from "../type/type";

class Pokemon {
    name: string
    status: PokemonStatus
    nature: PokemonNature
    ability: string
    good: string
    tag: string[]
    moves: Moves

    constructor(name: string, status: PokemonStatus, nature: PokemonNature, ability: string, good: string, tag: string[], moves: Moves) {
        this.name = name
        this.status = status
        this.nature = nature
        this.ability = ability
        this.good = good
        this.tag = tag
        this.moves = moves
    }

    getEffortText(): string {
        const h = this.status.effort.h != 0 ? "H"+this.status.effort.h : ""
        const a = this.status.effort.a != 0 ? " A"+this.status.effort.a : ""
        const b = this.status.effort.b != 0 ? " B"+this.status.effort.b : ""
        const c = this.status.effort.c != 0 ? " C"+this.status.effort.c : ""
        const d = this.status.effort.d != 0 ? " D"+this.status.effort.d : ""
        const s = this.status.effort.s != 0 ? " S"+this.status.effort.s : ""
        return h + a + b + c + d + s
    }
}

export default Pokemon