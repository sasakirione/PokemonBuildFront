import {PresetValueButton} from "../particle/Button";
import {EffortAS, EffortCS, EffortHA, EffortHB, EffortHC, EffortHD, zeroValue} from "../../domain/PokemonData";
import {PokemonValue} from "../../type/type";

const EffortPresetButtons = (props: {
    onChange: (value: PokemonValue) => void
}) => {
    const {onChange} = props

    return (
        <div>
            <PresetValueButton Preset={EffortAS} Label="AS" onChange={onChange}/>
            <PresetValueButton Preset={EffortCS} Label="CS" onChange={onChange}/>
            <PresetValueButton Preset={EffortHA} Label="HA" onChange={onChange}/>
            <PresetValueButton Preset={EffortHC} Label="HC" onChange={onChange}/>
            <PresetValueButton Preset={EffortHB} Label="HB" onChange={onChange}/>
            <PresetValueButton Preset={EffortHD} Label="HD" onChange={onChange}/>
            <PresetValueButton Preset={zeroValue} Label="無振り" onChange={onChange}/>
        </div>
    )
}

export default EffortPresetButtons