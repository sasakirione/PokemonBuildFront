import {Button, Dialog, DialogActions, DialogContent, DialogTitle, List} from "@mui/material";
import React, {useState} from "react";
import {BuildObject} from "../../type/type";
import {BuildRow} from "../atomic/BuildRow";
import {usePokemonConst} from "../hook/PokemonConst";
import useToken from "../hook/useToken";
import {BuildEdit} from "./BuildEdit";

export const BuildList = (
    props: {
        selectBuild: BuildObject,
        setSelectBuild: React.Dispatch<React.SetStateAction<BuildObject>>
        builds: BuildObject[]
    }
) => {
    const [isOpen, setIsOpen] = useState(false)
    let {builds} = props
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isEditNew, setIsEditNew] = useState(true)
    const {setToast} = usePokemonConst()
    const {token} = useToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    const onClose = () => setIsOpen(false)
    const onOpen = () => setIsOpen(true)

    const clickBuild = (build: BuildObject) => {
        props.setSelectBuild(build)
        onClose()
    }

    const clickNew = () => {
        setIsEditNew(true)
        setIsOpenEdit(true)
    }

    const clickEdit = () => {
        setIsEditNew(false)
        setIsOpenEdit(true)
    }

    const closeEdit = () => {
        setIsOpenEdit(false)
    }

    const clickDelete = async () => {
        if (props.builds.length == 1) {
            setToast("構築が1つの場合は削除することができません！", "error")
            return
        } else {
            const parameter = {
                headers: {
                    Authorization: 'Bearer ' + token,
                    "Content-Type": 'application/json'
                },
                method: "DELETE",
            }
            await fetch(baseUrl + "/v1/pokemon-build/builds/" + props.selectBuild.id, parameter)
                .then((res: any) => {
                        setToast("構築「" + props.selectBuild.name + "」の削除成功しました。", "normal")
                        const id = props.selectBuild.id
                        builds = builds.filter(build => build.id == id)
                        props.setSelectBuild(builds[0])
                        return res
                    }
                ).catch((reason: any) => {
                        setToast("構築「" + props.selectBuild.name + "」の削除に失敗しました。エラーコード：" + reason.status, "error")
                    }
                )
        }
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
                    <Button variant="outlined" color="primary" onClick={clickEdit}>現在の構築を編集する</Button>
                    <Button variant="outlined" color="primary" onClick={clickDelete}>現在の構築を削除する</Button>
                    <Button variant="outlined" color="primary" onClick={clickNew}>新規構築を追加する</Button>
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
            <BuildEdit selectBuild={props.selectBuild} setSelectBuild={props.setSelectBuild} builds={builds}
                       isOpen={isOpenEdit} onClose={closeEdit} isNew={isEditNew}/>
            <Button hidden={isOpen} onClick={onOpen}>構築選択</Button>
        </>
    )
}