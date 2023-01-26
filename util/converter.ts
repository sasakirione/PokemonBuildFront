import {GrownPokemon, Moves, PokemonValue} from "../type/type";
import Pokemon from "../domain/Pokemon";
import {getNatureList} from "../domain/PokemonData";
import PokemonStatus from "../domain/PokemonStatus";

export const getPokemonFromGrownPokemonResponse = (pokemon: GrownPokemon) => {
    const iv: PokemonValue = {
        h: pokemon.iv[0],
        a: pokemon.iv[1],
        b: pokemon.iv[2],
        c: pokemon.iv[3],
        d: pokemon.iv[4],
        s: pokemon.iv[5]
    }
    const ev: PokemonValue = {
        h: pokemon.ev[0],
        a: pokemon.ev[1],
        b: pokemon.ev[2],
        c: pokemon.ev[3],
        d: pokemon.ev[4],
        s: pokemon.ev[5]
    }
    const bv: PokemonValue = {
        h: pokemon.bv[0],
        a: pokemon.bv[1],
        b: pokemon.bv[2],
        c: pokemon.bv[3],
        d: pokemon.bv[4],
        s: pokemon.bv[5]
    }
    const natureList = getNatureList()
    const natureValue: PokemonValue = natureList[pokemon.nature - 1][3]
    const natureName = natureList[pokemon.nature - 1][0]
    const move: Moves = [pokemon.moveList[0], pokemon.moveList[1], pokemon.moveList[2], pokemon.moveList[3]]
    const status = new PokemonStatus(bv, ev, iv, natureValue)
    const nickname = pokemon.nickname
    const telastype = pokemon.terastal ?? "設定なし"
    return new Pokemon(pokemon.name, pokemon.id, pokemon.personalId, status, natureName, pokemon.ability, pokemon.abilityList, pokemon.good, pokemon.tag, move, nickname, telastype)
}

export const getPokemonTypeImagePath = (type: string) => {
    switch (type) {
        case "ノーマル":
            return "/type/normal.png"
        case "ほのお":
            return "/type/fire.png"
        case "みず":
            return "/type/water.png"
        case "でんき":
            return "/type/electric.png"
        case "くさ":
            return "/type/grass.png"
        case "こおり":
            return "/type/ice.png"
        case "かくとう":
            return "/type/fighting.png"
        case "どく":
            return "/type/poison.png"
        case "じめん":
            return "/type/ground.png"
        case "ひこう":
            return "/type/flying.png"
        case "エスパー":
            return "/type/psychic.png"
        case "むし":
            return "/type/bug.png"
        case "いわ":
            return "/type/rock.png"
        case "ゴースト":
            return "/type/ghost.png"
        case "ドラゴン":
            return "/type/dragon.png"
        case "あく":
            return "/type/dark.png"
        case "はがね":
            return "/type/steel.png"
        case "フェアリー":
            return "/type/fairy.png"
        default:
            return "/type/normal.png"
    }
}