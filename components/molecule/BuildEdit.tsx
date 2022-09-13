import {BuildObject, fieldType} from "../../type/type";
import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import useToken from "../hook/useToken";
import {usePokemonConst} from "../hook/PokemonConst";

export const BuildEdit = (props: {
    selectBuild: BuildObject
    setSelectBuild: React.Dispatch<React.SetStateAction<BuildObject>>
    editBuilds: (build: BuildObject) => void
    builds: BuildObject[]
    isOpen: boolean
    onClose: () => void
    isNew: boolean
}) => {
    const {token} = useToken()
    const {setToast} = usePokemonConst()
    const [title, setTitle] = useState(props.selectBuild.name)
    const [comment, setComment] = useState(props.selectBuild.comment)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
        if (props.isNew) {
            setTitle("")
            setComment("")
        } else {
            setTitle(props.selectBuild.name)
            setComment(props.selectBuild.comment)
        }
    }, [props.selectBuild, props.isNew])

    const clickSubmit = () => {
        const newBuild: BuildObject = {comment: comment, id: props.selectBuild.id, name: title}
        props.isNew ? postBuilds(newBuild) : putBuilds(newBuild)
    }

    const postBuilds = async (newBuild: BuildObject) => {
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newBuild)
        }
        const apiUrl = baseUrl + "/v1/pokemon-build/builds"
        await fetch(apiUrl, parameter)
            .then(
                (res: { json: () => any; }) => res.json())
            .then((data: number) => {
                newBuild.id = data
                props.editBuilds(newBuild)
                props.setSelectBuild(newBuild)
                    setToast("構築の新規追加が完了しました！", "normal")
                props.onClose()
                }
            )
            .catch((reason: any) => {
                setToast("構築の新規追加に失敗しました。エラーコード：" + reason.status, "error")
            })
    }

    const putBuilds = async (newBuild: BuildObject) => {
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(newBuild)
        }
        const apiUrl = baseUrl + "/v1/pokemon-build/builds/" + newBuild.id
        await fetch(apiUrl, parameter)
            .then(() => {
                    props.setSelectBuild(newBuild)
                setToast("構築の編集が完了しました！", "normal")
                props.onClose()
                }
            )
            .catch((reason: any) => {
                setToast("構築の編集に失敗しました。エラーコード：" + reason.status, "error")
            })
    }

    const changeTitle = (e: fieldType) => {
        setTitle(e.target.value)
    }

    const changeComment = (e: fieldType) => {
        setComment(e.target.value)
    }

    const clickClose = () => {
        setTitle("")
        setComment("")
        props.onClose()
    }

    return (
        <>
            <Dialog
                open={props.isOpen}
                keepMounted
                onClose={props.onClose}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle>{props.isNew ? "構築を新規追加する" : "構築情報を編集する"}</DialogTitle>
                {props.isNew ?
                    <DialogContent>
                        <TextField
                            id="outlined"
                            label="構築名"
                            type="Text"
                            defaultValue={""}
                            value={title}
                            InputProps={{inputProps: {min: 0, max: 50}}}
                            onChange={changeTitle}
                            margin="normal"
                        />
                        <br/>
                        <TextField
                            id="outlined"
                            label="説明"
                            type="Text"
                            defaultValue={""}
                            value={comment}
                            InputProps={{inputProps: {min: 0, max: 100}}}
                            onChange={changeComment}
                            multiline={true}
                            margin="normal"
                            fullWidth={true}
                        />
                    </DialogContent>
                    :
                    <DialogContent>
                        <TextField
                            id="outlined"
                            label="構築名"
                            type="Text"
                            defaultValue={props.selectBuild.name}
                            value={title}
                            InputProps={{inputProps: {min: 0, max: 50}}}
                            onChange={changeTitle}
                            margin="normal"
                        />
                        <br/>
                        <TextField
                            id="outlined"
                            label="説明"
                            type="Text"
                            defaultValue={props.selectBuild.comment}
                            value={comment}
                            InputProps={{inputProps: {min: 0, max: 100}}}
                            onChange={changeComment}
                            multiline={true}
                            margin="normal"
                            fullWidth={true}
                        />
                    </DialogContent>
                }
                <DialogActions>
                    <Button onClick={clickClose}>Cancel</Button>
                    <Button onClick={clickSubmit}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}