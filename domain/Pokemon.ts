import PokemonStatus from "./PokemonStatus";
import {Moves, PokemonNature} from "../type/type";

class Pokemon {
    name: string
    id: number
    personalId: number
    status: PokemonStatus
    nature: PokemonNature
    ability: string
    abilityList: string[]
    good: string
    tag: string[]
    moves: Moves
    effortText: string

    constructor(name: string, id: number, personalId: number, status: PokemonStatus, nature: PokemonNature, ability: string, abilityList: string[], good: string, tag: string[], moves: Moves) {
        this.name = name
        this.id = id
        this.personalId = personalId
        this.status = status
        this.nature = nature
        this.ability = ability
        this.abilityList = abilityList
        this.good = good
        this.tag = tag
        this.moves = moves
        this.effortText = this.getEffortText()
    }

    getEffortText(): string {
        const h = this.status.effort.h != 0 ? "H" + this.status.effort.h : ""
        const a = this.status.effort.a != 0 ? " A" + this.status.effort.a : ""
        const b = this.status.effort.b != 0 ? " B" + this.status.effort.b : ""
        const c = this.status.effort.c != 0 ? " C" + this.status.effort.c : ""
        const d = this.status.effort.d != 0 ? " D" + this.status.effort.d : ""
        const s = this.status.effort.s != 0 ? " S" + this.status.effort.s : ""
        return h + a + b + c + d + s
    }

    getRealSpeed(): number {
        const baseSpeed = this.status.real.s
        if (this.good == "こだわりスカーフ") {
            return Math.floor(baseSpeed * 1.5)
        }
        return baseSpeed
    }
}

export default Pokemon