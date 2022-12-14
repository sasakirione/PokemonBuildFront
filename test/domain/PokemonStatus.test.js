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

const polteageist = new PokemonStatus(
    {
        h: 60,
        a: 65,
        b: 65,
        c: 134,
        d: 114,
        s: 70
    },
    EffortCS,
    Iv5VA,
    cowardice
)

describe("ムゲンダイナでS調整", () => {
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
        [244, 68],
        [204, 65],
        [156, 61],
        [148, 60],
        [124, 58],
        [76, 55],
        [28, 50]
    ])('%i振りののときは最速スカーフ%s族抜き', (effort, base) => {
        const real = eternatus.calculationRealSpeed(effort)
        const fastSpeed = eternatus.calculationScarfSpeed(real)[1]
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

    test.each([
        [252, 81],
        [236, 79],
        [188, 75],
        [156, 72],
        [148, 71],
        [116, 68],
        [76, 65],
        [28, 60],
        [4, 58]
    ])('%i振りののときは準速スカーフ%s族抜き', (effort, base) => {
        const real = eternatus.calculationRealSpeed(effort)
        const fastSpeed = eternatus.calculationScarfSpeed(real)[0]
        expect(fastSpeed).toBe(base)
    })
})

describe("ポットデスでS調整", () => {
    test.each([
        [252, 145],
        [140, 128],
        [108, 123],
        [68, 117],
        [4, 108],
        [0, 107]
    ])('%i振りののときは最遅%s族抜かれ', (effort, base) => {
        const real = polteageist.calculationRealSpeed(effort)
        const fastSpeed = polteageist.calculationNoItemSpeed(real)[0]
        expect(fastSpeed).toBe(base)
    })
})

describe("ムゲンダイナで実数値計算", () => {
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

    test('ムゲンダイナのHP計算', () => {
        const real = eternatus.real.h
        expect(real).toBe(216)
    })

    test('ムゲンダイナ特攻計算', () => {
        const real = eternatus.real.c
        expect(real).toBe(197)
    })
})