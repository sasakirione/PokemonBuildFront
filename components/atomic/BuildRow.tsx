import {BuildObject} from "../../type/type";
import React from "react";
import {ListItemButton, ListItemText} from "@mui/material";

export const BuildRow = (
    props: {
        build: BuildObject,
        onClick: (build: BuildObject) => void
    }
) => {
    return (
        <>
            <ListItemButton onClick={() => props.onClick(props.build)}>
                <ListItemText primary={props.build.name} secondary={props.build.comment}></ListItemText>
            </ListItemButton>
        </>
    )
}