import {PokemonValue} from "../type/type";
import Decimal from "decimal.js";

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

    public calculationRealSpeed(effortOfSpeed: number): number {
        return this.calculateRealWithoutH(this.base.s, effortOfSpeed, this.individual.s, this.nature.s)
    }

    public calculationNoItemSpeed(real: number): [number, number, number] {
        const realDecimal = new Decimal(real)
        const latestSpeed = realDecimal.dividedBy(0.9).minus(5).round().toNumber() + 1
        const semiSpeed = real - 53
        const fastSpeedSuggest = realDecimal.dividedBy(1.1).round().toNumber() - 53
        return [this.calculationLatestSpeedOfSuggest(real, latestSpeed),
            semiSpeed,
            this.calculationFastSpeedOfSuggest(real, fastSpeedSuggest)]
    }

    private calculationLatestSpeedOfSuggest(real: number, suggest: number): number {
        const suggestHigh = this.calculateRealWithoutH(suggest + 1, 0, 0, 0.9)
        const suggestMiddle = this.calculateRealWithoutH(suggest, 0, 0, 0.9)
        const suggestLow = this.calculateRealWithoutH(suggest - 1, 0, 0, 0.9)

        if (real < suggestLow) {
            return suggest - 1
        } else if (real < suggestMiddle) {
            return suggest
        } else if (real < suggestHigh) {
            return suggest + 1
        } else {
            return suggest + 2
        }
    }

    private calculationFastSpeedOfSuggest(real: number, suggest: number): number {
        const suggestHigh = this.calculateRealWithoutH(suggest + 1, 252, 31, 1.1)
        const suggestMiddle = this.calculateRealWithoutH(suggest, 252, 31, 1.1)
        const suggestLow = this.calculateRealWithoutH(suggest - 1, 252, 31, 1.1)

        if (suggestHigh < real) {
            return suggest + 1
        } else if (suggestMiddle < real) {
            return suggest
        } else if (suggestLow < real) {
            return suggest - 1
        } else {
            return suggest - 2
        }
    }

    public calculationScarfSpeed(real: number): [number, number] {
        const realDecimal = new Decimal(real)
        const semiSpeed = realDecimal.dividedBy(1.5).round().toNumber() - 53
        const fastSpeed = realDecimal.dividedBy(1.65).round().toNumber() - 53
        return [
            this.calculationScarfSpeedOfSuggest(real, semiSpeed, 1),
            this.calculationScarfSpeedOfSuggest(real, fastSpeed, 1.1)]
    }

    private calculationScarfSpeedOfSuggest(real: number, suggest: number, nature: number): number {
        const suggestHigh = new Decimal(this.calculateRealWithoutH(suggest + 1, 252, 31, nature)).times(1.5).floor().toNumber()
        const suggestMiddle = new Decimal(this.calculateRealWithoutH(suggest, 252, 31, nature)).times(1.5).floor().toNumber()
        const suggestLow = new Decimal(this.calculateRealWithoutH(suggest - 1, 252, 31, nature)).times(1.5).floor().toNumber()

        if (suggestHigh < real) {
            return suggest + 1
        } else if (suggestMiddle < real) {
            return suggest
        } else if (suggestLow < real) {
            return suggest - 1
        } else {
            return suggest - 2
        }
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
        const effortDecimal = new Decimal(effort)
        const individualDecimal = new Decimal(individual)
        const baseDecimal = new Decimal(base)
        const natureDecimal = new Decimal(nature)
        return baseDecimal.times(2).plus(individualDecimal).plus(effortDecimal.dividedBy(4)).dividedBy(2).floor().plus(5).times(natureDecimal).floor().toNumber()
        // Math.floor(((base * 2 + individual + effort / 4) * 0.5 + 5) * nature)
    }

    private calculateRealH(base: number, effort: number, individual: number): number {
        const effortDecimal = new Decimal(effort)
        const individualDecimal = new Decimal(individual)
        const baseDecimal = new Decimal(base)
        return baseDecimal.times(2).plus(individualDecimal).plus(effortDecimal.dividedBy(4)).dividedBy(2).floor().plus(60).toNumber()
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