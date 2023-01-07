import PokemonStatus from "./PokemonStatus";
import {Moves, PokemonNature, SpeedComparison} from "../type/type";

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
    nickname: string
    telastype: string

    constructor(name: string, id: number, personalId: number, status: PokemonStatus, nature: PokemonNature, ability: string, abilityList: string[], good: string, tag: string[], moves: Moves, nickname: string, telastype: string) {
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
        this.nickname = nickname
        this.telastype = telastype
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

    getSpeedComparison(effort: number): SpeedComparison {
        const real = this.status.calculationRealSpeed(effort)
        const noItem = this.status.calculationNoItemSpeed(real)
        const scarf = this.status.calculationScarfSpeed(real)
        return {
            noItem: {fastSpeed: noItem[2], latestSpeed: noItem[0], semiSpeed: noItem[1]},
            realSpeed: real,
            scarf: {fastSpeed: scarf[1], semiSpeed: scarf[0]}
        }
    }

    getIVText() {
        return this.status.individual.h + "," + this.status.individual.a + "," + this.status.individual.b + "," + this.status.individual.c + "," + this.status.individual.d + "," + this.status.individual.s
    }

    getRealText() {
        return this.status.real.h + "," + this.status.real.a + "," + this.status.real.b + "," + this.status.real.c + "," + this.status.real.d + "," + this.getRealSpeed()
    }

    isHpEven(effort: number): boolean {
        return this.status.calculationHp(effort) % 2 == 0
    }
}

export default Pokemon