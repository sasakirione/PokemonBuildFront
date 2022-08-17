import {selectItem2, SetterOfIdAndValue} from "../../type/type";
import {List} from "@mui/material";
import Select from "react-select";
import React from "react";

export const MoveForm = (props: { moveList: [number, string][],moves: [[number, string], [number, string], [number, string], [number, string]],
    setMoves: [SetterOfIdAndValue, SetterOfIdAndValue, SetterOfIdAndValue, SetterOfIdAndValue]}) => {
    const {moveList, moves, setMoves} = props
    const createOption = (value: number, label: string): selectItem2 => ({
        value,
        label,
    })
    return (
        <List>
            <Select isSearchable options={moveList?.map(move => createOption(move[0], move[1]))}
                    value={createOption(moves[0][0], moves[0][1])} onChange={value => setMoves[0]([value?.value!, value?.label!])}/>
            <Select isSearchable options={moveList?.map(move => createOption(move[0], move[1]))}
                    value={createOption(moves[1][0], moves[1][1])} onChange={value => setMoves[1]([value?.value!, value?.label!])}/>
            <Select isSearchable options={moveList?.map(move => createOption(move[0], move[1]))}
                    value={createOption(moves[2][0], moves[2][1])} onChange={value => setMoves[2]([value?.value!, value?.label!])}/>
            <Select isSearchable options={moveList?.map(move => createOption(move[0], move[1]))}
                    value={createOption(moves[3][0], moves[3][1])} onChange={value => setMoves[3]([value?.value!, value?.label!])}/>
        </List>
    )
}