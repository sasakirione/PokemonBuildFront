import {Button, TextField} from "@mui/material";
import {fieldType} from "../../type/type";
import React from "react";

export const StatusValueField = (props: { defaultValue: number, value: number, max: number, label: string, onChange: (e: fieldType) => void }) => {
    const inputSetting = props.max == 252 ?
        {min: 0, max: props.max, step: 4} :
        {min: 0, max: props.max}

    return <TextField
        id="outlined-required"
        label={props.label}
        type="number"
        InputProps={{inputProps: inputSetting}}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={props.onChange}
        margin="normal"
        size="small"
    />;
}

export const UrlValueFieldForCopy = (props: { value: string, clickFunction: ()=>void }) => {
    return <TextField
        id="outlined-required"
        type="url"
        InputProps={{readOnly: true,  endAdornment: <Button onClick={props.clickFunction}>Copy</Button> }}
        value={props.value}
        margin="normal"
        size="small"
        fullWidth
    />;
}