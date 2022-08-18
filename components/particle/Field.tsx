import {TextField} from "@mui/material";
import {fieldType} from "../../type/type";
import React from "react";

export const StatusValueField = (props: { defaultValue: number, max: number, label: string, onChange: (e: fieldType) => void }) => {
    return <TextField
        id="outlined-required"
        label={props.label}
        type="number"
        InputProps={{inputProps: {min: 0, max: props.max}}}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        margin="normal"
    />;
}