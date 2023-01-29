import useToken from "../hook/useToken";
import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Loading} from "../particle/Loading";
import {usePokemonConst} from "../hook/PokemonConst";
import {UrlValueFieldForCopy} from "../particle/Field";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
const baseUrl2 = process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL!.replace("/build", "")

export const BuildPrivacyEdit = React.memo(function BuildPrivacyEdit(props: { open: boolean, onClose: () => void, buildId: number }) {
    const {token} = useToken()
    const [isLoading, setIsLoading] = useState(false)
    const [privacy, setPrivacy] = useState(false)
    const {setToast} = usePokemonConst()
    const {open, onClose, buildId} = props
    const url = baseUrl2 + "/public-build/" + buildId

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
                    setToast("公開設定の取得に失敗しました。", "error")
                    console.log(reason)
                    setIsLoading(false)
                }
            )
        }
    }, [buildId, setToast])

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
        await fetch(baseUrl + "/v1/public-build/" + buildId + "/" + (privacy ? "off" : "on"), parameter).catch(
            (reason: any) => {
                console.log(reason)
                setToast("公開設定の更新に失敗しました。", "error")
            }
        )
        setIsLoading(false)
    }

    function copyTextToClipboard() {
        navigator.clipboard.writeText(url)
            .then(function () {
                console.log('Async: Copying to clipboard was successful!');
                setToast("URLをコピーしました。", "normal")
            }, function (err) {
                console.error('Async: Could not copy text: ', err);
            });
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
                <DialogContentText><UrlValueFieldForCopy value={url} clickFunction={copyTextToClipboard}/></DialogContentText>
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