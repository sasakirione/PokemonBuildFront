import {Button, Dialog, DialogActions, DialogContent, DialogTitle, List} from "@mui/material";
import React, {useState} from "react";
import {BuildObject} from "../../type/type";
import {BuildRow} from "../atomic/BuildRow";

export const BuildList = (
    props: {
        selectBuild: BuildObject,
        setSelectBuild: React.Dispatch<React.SetStateAction<BuildObject>>
        builds: BuildObject[]
    }
) => {
    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => setIsOpen(false)
    const onOpen = () => setIsOpen(true)
    const clickBuild = (build: BuildObject) => {
        props.setSelectBuild(build)
        onClose()
    }

    return (
        <>
            <Dialog
                open={isOpen}
                keepMounted
                onClose={onClose}
            >
                <DialogTitle>構築を変更する</DialogTitle>
                <DialogContent>
                    <List>
                        {props.builds.map(build =>
                            <BuildRow key={build.id} build={build} onClick={clickBuild}/>
                        )}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Button hidden={isOpen} onClick={onOpen}>構築選択</Button>
        </>
    )
}