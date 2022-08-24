import {PokemonValue} from "../../type/type";
import {PresetValueButton} from "../particle/Button";
import {Iv4VSA, Iv4VSC, Iv5VA, Iv5VC, Iv6V} from "../../domain/PokemonData";

const IndividualPresetButton = (props: {
    onChange: (value: PokemonValue) => void
}) => {
    const {onChange} = props

    return (
        <div>
            <PresetValueButton Preset={Iv5VA} Label="A抜け5V" onChange={onChange}/>
            <PresetValueButton Preset={Iv5VC} Label="C抜け5V" onChange={onChange}/>
            <PresetValueButton Preset={Iv4VSA} Label="A抜けS逆V" onChange={onChange}/>
            <PresetValueButton Preset={Iv4VSC} Label="C抜けS逆V" onChange={onChange}/>
            <PresetValueButton Preset={Iv6V} Label="6V" onChange={onChange}/>
        </div>
    )
}

export default IndividualPresetButton