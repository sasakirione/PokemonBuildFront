import {SetterOfIdAndValue} from "../../type/type";
import {Autocomplete, List, TextField} from "@mui/material";
import React from "react";

export const MoveForm = (props: {
    moveList: [number, string][], moves: [[number, string], [number, string], [number, string], [number, string]],
    setMoves: [SetterOfIdAndValue, SetterOfIdAndValue, SetterOfIdAndValue, SetterOfIdAndValue]
}) => {
    const {moveList, moves, setMoves} = props

    const styleWithoutOne = {width: 400, marginTop: 2};
    return (
        <List>
            <Autocomplete
                disableClearable
                value={moves[0][1]}
                onChange={(event, newValue) => {
                    setMoves[0](moveList.filter(move => move[1] === newValue)[0])
                }}
                options={moveList!.map(move => move[1])}
                sx={{width: 400}}
                renderInput={(params) => <TextField {...params} label="わざ1"/>}
            />
            <Autocomplete
                disableClearable
                value={moves[1][1]}
                onChange={(event, newValue) => {
                    setMoves[1](moveList.filter(move => move[1] === newValue)[0])
                }}
                options={moveList!.map(move => move[1])}
                sx={styleWithoutOne}
                renderInput={(params) => <TextField {...params} label="わざ2"/>}
            />
            <Autocomplete
                disableClearable
                value={moves[2][1]}
                onChange={(event, newValue) => {
                    setMoves[2](moveList.filter(move => move[1] === newValue)[0])
                }}
                options={moveList!.map(move => move[1])}
                sx={styleWithoutOne}
                renderInput={(params) => <TextField {...params} label="わざ3"/>}
            />
            <Autocomplete
                disableClearable
                value={moves[3][1]}
                onChange={(event, newValue) => {
                    setMoves[3](moveList.filter(move => move[1] === newValue)[0])
                }}
                options={moveList!.map(move => move[1])}
                sx={styleWithoutOne}
                renderInput={(params) => <TextField {...params} label="わざ4"/>}
            />
        </List>
    )
}