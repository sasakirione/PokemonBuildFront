import Pokemon from "../domain/Pokemon";
import PokemonStatus from "../domain/PokemonStatus";

const cowardice = {
    h: 1.0,
    a: 0.9,
    b: 1.0,
    c: 1.0,
    d: 1.0,
    s: 1.1
}

const cs = {
    h: 4,
    a: 0,
    b: 0,
    c: 252,
    d: 0,
    s: 252
}

const hc = {
    h: 252,
    a: 0,
    b: 0,
    c: 252,
    d: 0,
    s: 4
}

const withoutA = {
    h: 31,
    a: 0,
    b: 31,
    c: 31,
    d: 31,
    s: 31
}

export const pokemon1 = new Pokemon("ムゲンダイナ",
    1000,
    1,
    new PokemonStatus(
        {
            h: 140,
            a: 85,
            b: 95,
            c: 145,
            d: 95,
            s: 130
        },
        cs,
        withoutA,
        cowardice
    ),
    "おくびょう",
    "プレッシャー",
    ["プレッシャー"],
    "いのちのたま",
    ["禁伝", "特殊アタッカー"],
    ["ダイマックスほう", "かえんほうしゃ", "ヘドロばくだん", "じこさいせい"],
    "",
    "設定なし")
export const pokemon2 = new Pokemon("レジエレキ",
    1006,
    2,
    new PokemonStatus(
        {
            h: 80,
            a: 100,
            b: 50,
            c: 100,
            d: 50,
            s: 200
        },
        hc,
        withoutA,
        {
            h: 1.0,
            a: 0.9,
            b: 1.0,
            c: 1.1,
            d: 1.0,
            s: 1.0
        }
    ),
    "ひかえめ",
    "トランジスタ",
    ["トランジスタ"],
    "ひかりのねんど",
    ["特殊アタッカー", "壁"],
    ["10まんボルト", "ボルトチェンジ", "ひかりのかべ", "リフレクター"],
    "",
    "設定なし")
export const pokemon3 = new Pokemon("インテレオン",
    923,
    3,
    new PokemonStatus(
        {
            h: 70,
            a: 85,
            b: 65,
            c: 125,
            d: 65,
            s: 120
        },
        cs,
        withoutA,
        cowardice
    ),
    "おくびょう",
    "スナイパー",
    ["げきりゅう", "スナイパー"],
    "ピントレンズ",
    ["特殊アタッカー", "ダイマ"],
    ["ねらいうち", "エアスラッシュ", "れいとうビーム", "きあいだめ"],
    "",
    "設定なし"
)

export const pokemon4 = pokemon1
export const pokemon5 = pokemon2
export const pokemon6 = pokemon3
