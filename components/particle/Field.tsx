import {NextPage} from "next";
import {TextField} from "@mui/material";


export const IdField: NextPage = () => {
    return (
        <TextField
            id="outlined-basic"
            label="ID"
            variant="outlined"
            type="text"/>
    )
}

export const PasswordField: NextPage = () => {
    return (
        <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            data-e2e=""/>
    )
}

export const PokemonField: NextPage = () => {
    return (
        <TextField
            id="outlined-basic"
            label="Pokemon Name"
            variant="outlined"
            type="text"/>
    )
}