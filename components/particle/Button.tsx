import {PokemonValue} from "../../type/type";
import {Button} from "@mui/material";

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