import {selectItem} from "../../type/type";
import {List} from "@mui/material";
import Select from "react-select";
import React from "react";

export const MoveForm = (props: { moveList: string[],moves: [string, string, string, string],
    setMoves: [(name: string) => void, (name: string) => void, (name: string) => void, (name: string) => void]}) => {
    const {moveList, moves, setMoves} = props
    const createOption = (label: string): selectItem => ({
        label,
        value: label,
    })
    return (
        <List>
            <Select isSearchable options={moveList?.map(move => createOption(move))}
                    value={createOption(moves[0])} onChange={value => setMoves[0](value?.value!)}/>
            <Select isSearchable options={moveList?.map(move => createOption(move))}
                    value={createOption(moves[1])} onChange={value => setMoves[1](value?.value!)}/>
            <Select isSearchable options={moveList?.map(move => createOption(move))}
                    value={createOption(moves[2])} onChange={value => setMoves[2](value?.value!)}/>
            <Select isSearchable options={moveList?.map(move => createOption(move))}
                    value={createOption(moves[3])} onChange={value => setMoves[3](value?.value!)}/>
        </List>
    )
}