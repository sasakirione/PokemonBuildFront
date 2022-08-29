import React from "react";

export type basicHtmlElements = {
    htmlId: string,
    testElementsId: string
}

export type PokemonValue = {
    h: number
    a: number
    b: number
    c: number
    d: number
    s: number
}

export type PokemonNature = "さみしがり" | "いじっぱり" | "やんちゃ" | "ゆうかん" | "ずぶとい" | "わんぱく" | "のうてんき" |
    "のんき" | "ひかえめ" | "おっとり" | "うっかりや" | "れいせい" | "おだやか" | "おとなしい" | "しんちょう" | "なまいき" |
    "おくびょう" | "せっかち" | "ようき" | "むじゃき" | "てれや" | "がんばりや" | "すなお" | "きまぐれ" | "まじめ"

export type Moves = [string, string, string, string]

export type responseGoodList = {
    goods: responseGood[]
}

export type responseGood = {
    id: number,
    name: string
}

export type StatusType = "EV" | "IV"

export type fieldType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export type selectItem = {
    value: string,
    label: string
}

export type selectItem2 = {
    value: number,
    label: string
}

export type PokemonResponse = {
    id: number,
    dexNo: number,
    name: string,
    formName: string | null,
    types: string[],
    abilities: string[],
    base: number[],
}

export type KotlinTupleOfIdAndValue = {
    first: number
    second: string
}

export type SetterOfIdAndValue = (IdAndValue: [number, string]) => void

export type GrownPokemon = {
    id: number,
    personalId: number,
    name: string,
    iv: number[],
    ev: number[],
    nature: number,
    ability: string,
    abilityList: string[],
    bv: number[],
    moveList: string[],
    good: string,
    tag: string[]
}

export type BuildResponse = {
    id: number,
    name: string,
    pokemons: GrownPokemon[]
}

export type PostPokemonData = {
    pokemon: GrownPokemon,
    buildId: number
}

export type Effort =
    0
    | 4
    | 12
    | 20
    | 28
    | 36
    | 44
    | 52
    | 60
    | 68
    | 76
    | 84
    | 92
    | 100
    | 108
    | 116
    | 124
    | 132
    | 140
    | 148
    | 156
    | 164
    | 172
    | 180
    | 188
    | 196
    | 204
    | 212
    | 220
    | 228
    | 236
    | 244
    | 252