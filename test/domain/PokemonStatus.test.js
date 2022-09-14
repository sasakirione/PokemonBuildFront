import PokemonStatus from "../../domain/PokemonStatus";
import {EffortCS, Iv5VA} from "../../domain/PokemonData";

const cowardice = {
    h: 1.0,
    a: 0.9,
    b: 1.0,
    c: 1.0,
    d: 1.0,
    s: 1.1
}

const eternatus = new PokemonStatus(
    {
        h: 140,
        a: 85,
        b: 95,
        c: 145,
        d: 95,
        s: 130
    },
    EffortCS,
    Iv5VA,
    cowardice
)

describe("ムゲンダイナでS調整機能", () => {
    test.each([
        [252, 129],
        [220, 125],
        [212, 124],
        [204, 123],
        [188, 121],
        [140, 115],
        [124, 113],
        [76, 107],
        [44, 103],
        [4, 98],
        [0, 97]
    ])('%i振りののときは最速%s族抜き', (effort, base) => {
        const real = eternatus.calculationRealSpeed(effort)
        const fastSpeed = eternatus.calculationNoItemSpeed(real)[2]
        expect(fastSpeed).toBe(base)
    })

    test.each([
        [244, 146],
        [228, 143],
        [180, 137],
        [172, 136],
        [140, 131],
        [108, 127],
        [68, 121],
        [44, 118],
        [4, 113],
        [0, 112]
    ])('%i振りののときは準速%s族抜き', (effort, base) => {
        const real = eternatus.calculationRealSpeed(effort)
        const fastSpeed = eternatus.calculationNoItemSpeed(real)[1]
        expect(fastSpeed).toBe(base)
    })
})

describe("ムゲンダイナでS計算", () => {
    test.each([
        [252, 200],
        [220, 195],
        [204, 193],
        [188, 191],
        [172, 189],
        [156, 187],
        [44, 171],
        [4, 166],
        [0, 165]
    ])('%i振りののときは実数値%s', (effort, exceptReal) => {
        const real = eternatus.calculationRealSpeed(effort)
        expect(real).toBe(exceptReal)
    })
})