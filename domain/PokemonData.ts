import {PokemonNature, PokemonValue} from "../type/type";

export function getNatureList(): [PokemonNature, string, string, PokemonValue][] {
    return (
        [
            ["さみしがり", "攻撃", "防御", {h: 1, a: 1.1, b: 0.9, c: 1, d: 1, s: 1}],
            ["いじっぱり", "攻撃", "特攻", {h: 1, a: 1.1, b: 1, c: 0.9, d: 1, s: 1}],
            ["やんちゃ", "攻撃", "特防", {h: 1, a: 1.1, b: 1, c: 1, d: 0.9, s: 1}],
            ["ゆうかん", "攻撃", "素早さ", {h: 1, a: 1.1, b: 1, c: 1, d: 1, s: 0.9}],
            ["ずぶとい", "防御", "攻撃", {h: 1, a: 0.9, b: 1.1, c: 1, d: 1, s: 1}],
            ["わんぱく", "防御", "特攻", {h: 1, a: 1, b: 1.1, c: 0.9, d: 1, s: 1}],
            ["のうてんき", "防御", "特防", {h: 1, a: 1, b: 1.1, c: 1, d: 0.9, s: 1}],
            ["のんき", "防御", "素早さ", {h: 1, a: 1, b: 1.1, c: 1, d: 1, s: 0.9}],
            ["ひかえめ", "特攻", "攻撃", {h: 1, a: 0.9, b: 1, c: 1.1, d: 1, s: 1}],
            ["おっとり", "特攻", "防御", {h: 1, a: 1, b: 0.9, c: 1.1, d: 1, s: 1}],
            ["うっかりや", "特攻", "特防", {h: 1, a: 1, b: 1, c: 1.1, d: 0.9, s: 1}],
            ["れいせい", "特攻", "素早さ", {h: 1, a: 1, b: 1, c: 1.1, d: 1, s: 0.9}],
            ["おだやか", "特防", "攻撃", {h: 1, a: 0.9, b: 1, c: 1, d: 1.1, s: 1}],
            ["おとなしい", "特防", "防御", {h: 1, a: 1, b: 0.9, c: 1, d: 1.1, s: 1}],
            ["しんちょう", "特防", "特攻", {h: 1, a: 1, b: 1, c: 0.9, d: 1.1, s: 1}],
            ["なまいき", "特防", "素早さ", {h: 1, a: 1, b: 1, c: 1, d: 1.1, s: 0.9}],
            ["おくびょう", "素早さ", "攻撃", {h: 1, a: 0.9, b: 1, c: 1, d: 1, s: 1.1}],
            ["せっかち", "素早さ", "防御", {h: 1, a: 1, b: 0.9, c: 1, d: 1, s: 1.1}],
            ["ようき", "素早さ", "特攻", {h: 1, a: 1, b: 1, c: 0.9, d: 1, s: 1.1}],
            ["むじゃき", "素早さ", "特防", {h: 1, a: 1, b: 1, c: 1, d: 0.9, s: 1.1}],
            ["てれや", "なし", "なし", {h: 1, a: 1, b: 1, c: 1, d: 1, s: 1}],
            ["がんばりや", "なし", "なし", {h: 1, a: 1, b: 1, c: 1, d: 1, s: 1}],
            ["すなお", "なし", "なし", {h: 1, a: 1, b: 1, c: 1, d: 1, s: 1}],
            ["きまぐれ", "なし", "なし", {h: 1, a: 1, b: 1, c: 1, d: 1, s: 1}],
            ["まじめ", "なし", "なし", {h: 1, a: 1, b: 1, c: 1, d: 1, s: 1}]
        ]
    )
}

export const EffortAS: PokemonValue = {
    h: 4, a: 252, b: 0, c: 0, d: 0, s: 252
}

export const EffortCS: PokemonValue = {
    h: 4, a: 0, b: 0, c: 252, d: 0, s: 252
}

export const EffortHA: PokemonValue = {
    h: 252, a: 252, b: 0, c: 0, d: 0, s: 4
}

export const EffortHC: PokemonValue = {
    h: 252, a: 0, b: 0, c: 252, d: 0, s: 4
}

export const EffortHB: PokemonValue = {
    h: 252, a: 0, b: 252, c: 0, d: 0, s: 4
}

export const EffortHD: PokemonValue = {
    h: 252, a: 0, b: 0, c: 0, d: 252, s: 4
}

export const Iv5VA: PokemonValue = {
    h: 31, a: 0, b: 31, c: 31, d: 31, s: 31
}

export const Iv5VC: PokemonValue = {
    h: 31, a: 31, b: 31, c: 0, d: 31, s: 31
}

export const Iv4VSA: PokemonValue = {
    h: 31, a: 0, b: 31, c: 31, d: 31, s: 0
}

export const Iv4VSC: PokemonValue = {
    h: 31, a: 31, b: 31, c: 0, d: 31, s: 0
}

export const Iv6V: PokemonValue = {
    h: 31, a: 31, b: 31, c: 31, d: 31, s: 31
}

export const zeroValue: PokemonValue = {
    h: 0, a: 0, b: 0, c: 0, d: 0, s: 0
}