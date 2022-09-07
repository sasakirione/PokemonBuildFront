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

    public changeEffort(effort: PokemonValue) {
        this.effort = effort
        this.real = this.calculateReal(this.base, effort, this.individual, this.nature)
    }

    public changeNature(up: string, down: string) {
        let nature: PokemonValue = {a: 1, b: 1, c: 1, d: 1, h: 1, s: 1}
        let nature2 = this.setUpNature(up, nature)
        let nature3 = this.setDownNature(down, nature2)
        this.nature = nature3
        this.real = this.calculateReal(this.base, this.effort, this.individual, nature3)
    }

    private calculateReal(base: PokemonValue, effort: PokemonValue, individual: PokemonValue, nature: PokemonValue): PokemonValue {
        return {
            h: this.calculateRealH(base.h, effort.h, individual.h),
            a: this.calculateRealWithoutH(base.a, effort.a, individual.a, nature.a),
            b: this.calculateRealWithoutH(base.b, effort.b, individual.b, nature.b),
            c: this.calculateRealWithoutH(base.c, effort.c, individual.c, nature.c),
            d: this.calculateRealWithoutH(base.d, effort.d, individual.d, nature.d),
            s: this.calculateRealWithoutH(base.s, effort.s, individual.s, nature.s)
        }
    }

    private calculateRealWithoutH(base: number, effort: number, individual: number, nature: number): number {
        return Math.floor(((base * 2 + individual + effort / 4) * 0.5 + 5) * nature)

    }

    private calculateRealH(base: number, effort: number, individual: number): number {
        return Math.floor((base * 2 + individual + effort / 4) * 0.5 + 60)
    }

    private setUpNature(up: string, base: PokemonValue): PokemonValue {
        let nature = base
        switch (up) {
            case "攻撃":
                nature.a = 1.1
                break;
            case "防御":
                nature.b = 1.1
                break;
            case "特攻":
                nature.c = 1.1
                break;
            case "特防":
                nature.d = 1.1
                break;
            case "素早さ":
                nature.s = 1.1
                break;
            default:
                break;
        }
        return nature
    }

    private setDownNature(down: string, base: PokemonValue): PokemonValue {
        let nature = base
        switch (down) {
            case "攻撃":
                nature.a = 0.9
                break;
            case "防御":
                nature.b = 0.9
                break;
            case "特攻":
                nature.c = 0.9
                break;
            case "特防":
                nature.d = 0.9
                break;
            case "素早さ":
                nature.s = 0.9
                break;
            default:
                break;
        }
        return nature
    }

}

export default PokemonStatus