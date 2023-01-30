import {PokemonValue} from "../../type/type";
import {Button} from "@mui/material";
import {LineIcon, LineShareButton, TwitterIcon, TwitterShareButton} from "react-share";
import React from "react";

export const PresetValueButton = (props: {
    Preset: PokemonValue
    Label: string
    onChange: (value: PokemonValue) => void
}) => {

    function setValue() {
        const value = {
            h: props.Preset.h,
            a: props.Preset.a,
            b: props.Preset.b,
            c: props.Preset.c,
            d: props.Preset.d,
            s: props.Preset.s
        }
        props.onChange(value)
    }

    return (
        <Button variant="outlined" onClick={setValue} className="value-preset-button">
            {props.Label}
        </Button>
    )
}

export const TwitterButton = (props: { url: string, text: string }) => {
    return (
        <TwitterShareButton url={props.url} title={props.text}>
            <TwitterIcon size={50} round/>
        </TwitterShareButton>
    )
}

export const LineButton = (props: { url: string, text: string }) => {
    return (
        <LineShareButton url={props.url} title={props.text}>
            <LineIcon size={50} round/>
        </LineShareButton>
    )
}