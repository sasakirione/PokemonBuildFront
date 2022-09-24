import useToken from "../hook/useToken";
import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Loading} from "../particle/Loading";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

export const BuildPrivacyEdit = React.memo(function BuildPrivacyEdit(props: { open: boolean, onClose: () => void, buildId: number }) {
    const {token} = useToken()
    const [isLoading, setIsLoading] = useState(false)
    const [privacy, setPrivacy] = useState(false)
    const {open, onClose, buildId} = props

    useEffect(() => {
        if (buildId != 0) {
            setIsLoading(true)
            fetch(baseUrl + "/v1/public-build/" + buildId + "/is-public")
                .then((res: { json: () => any; }) => res.json())
                .then((data: boolean) => {
                    setPrivacy(data)
                    setIsLoading(false)
                }).catch(
                (reason: any) => {
                    console.log(reason)
                    setIsLoading(false)
                }
            )
        }
    }, [buildId])

    async function onClickItem() {
        await sendData()
        onClose()
    }

    async function sendData() {
        setIsLoading(true)
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "POST"
        }
        await fetch(baseUrl + "/v1/public-build/" + buildId + "/" + (privacy ? "off" : "on"), parameter)
        setIsLoading(false)
    }

    return (<>
        <Dialog
            open={open}
            keepMounted
            onClose={onClose}
        >
            <DialogTitle>公開設定を変更する</DialogTitle>
            <DialogContent>
                <DialogContentText>現在の公開設定：{privacy ? "公開中" : "非公開"}</DialogContentText>
                <DialogContentText>公開URL(公開設定を公開にしないとアクセスできません)：</DialogContentText>
                <DialogContentText>https:/pokebuild.sasakirione.com/public-build/{buildId}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    キャンセル
                </Button>
                <Button onClick={onClickItem} color="primary">
                    {privacy ? "非公開にする" : "公開する"}
                </Button>
            </DialogActions>
        </Dialog>
        {isLoading && <Loading isLoading={true}/>}
    </>)
})