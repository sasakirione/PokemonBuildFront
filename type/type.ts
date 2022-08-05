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
    "のんき" |  "ひかえめ" | "おっとり" | "うっかりや" | "れいせい" | "おだやか" | "おとなしい" | "しんちょう" | "なまいき" |
    "おくびょう" | "せっかち" | "ようき" | "むじゃき" | "てれや" | "がんばりや" | "すなお" | "きまぐれ" | "まじめ"

export type Moves = [string, string, string, string]