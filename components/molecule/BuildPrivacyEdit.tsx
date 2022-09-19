import useToken from "../hook/useToken";
import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Loading} from "../particle/Loading";

export const BuildPrivacyEdit = (props: { open: boolean, onClose: () => void, buildId: number }) => {
    const {token} = useToken()
    const [isLoading, setIsLoading] = useState(false)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const [privacy, setPrivacy] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetch(baseUrl + "/v1/public-build/" + props.buildId + "/is-public")
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
    }, [props.open, props.buildId, baseUrl])

    async function onClickItem() {
        await sendData()
        props.onClose()
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
        await fetch(baseUrl + "/v1/public-build/" + props.buildId + "/" + (privacy ? "off" : "on"), parameter)
        setIsLoading(false)
    }

    return (<>
        <Dialog
            open={props.open}
            keepMounted
            onClose={props.onClose}
        >
            <DialogTitle>公開設定を変更する</DialogTitle>
            <DialogContent>
                <DialogContentText>現在の公開設定：{privacy ? "公開中" : "非公開"}</DialogContentText>
                <DialogContentText>公開URL(公開設定を公開にしないとアクセスできません)：</DialogContentText>
                <DialogContentText>https:/pokebuild.sasakirione.com/public-build/{props.buildId}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    キャンセル
                </Button>
                <Button onClick={onClickItem} color="primary">
                    {privacy ? "非公開にする" : "公開する"}
                </Button>
            </DialogActions>
        </Dialog>
        {isLoading && <Loading isLoading={true}/>}
    </>)
}