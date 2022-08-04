import {PokemonValue} from "../type/type";

class PokemonStatus {
    real: PokemonValue
    effort: PokemonValue
    base: PokemonValue
    individual: PokemonValue
    nature: PokemonValue

    constructor(base: PokemonValue, effort: PokemonValue, individual: PokemonValue, nature: PokemonValue) {
        this.base = base
        this.effort = effort
        this.individual = individual
        this.nature = nature
        this.real = this.calculateReal(base, effort, individual, nature)
    }

    private calculateReal(base: PokemonValue, effort: PokemonValue, individual: PokemonValue, nature: PokemonValue): PokemonValue {
        return {
            h: this.calculateRealH(base.h, effort.h, individual.h),
            a: this.calculateRealWithoutH(base.a, effort.a, individual.a, nature.a),
            b: this.calculateRealWithoutH(base.b, effort.b, individual.b, nature.a),
            c: this.calculateRealWithoutH(base.c, effort.c, individual.c, nature.a),
            d: this.calculateRealWithoutH(base.d, effort.d, individual.d, nature.a),
            s: this.calculateRealWithoutH(base.s, effort.s, individual.s, nature.a)
        }
    }

    private calculateRealWithoutH(base: number, effort: number, individual: number, nature: number): number {
        return Math.floor(((base*2 + individual + effort/4) * 0.5 + 5) * nature)

    }

    private calculateRealH(base: number, effort: number, individual: number): number {
        return Math.floor((base*2 + individual + effort/4) * 0.5 + 60)
    }

}

export default PokemonStatus