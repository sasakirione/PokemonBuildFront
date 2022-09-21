import {NextPage} from "next";
import {useAuth0} from "@auth0/auth0-react";
import React, {useEffect} from "react";
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import {HeadLineText} from "../components/particle/Text";
import {Button, FormControlLabel, Grid, Switch, Typography} from "@mui/material";
import {Loading} from "../components/particle/Loading";
import {usePokemonConst} from "../components/hook/PokemonConst";
import useToken from "../components/hook/useToken";
import Card from "@mui/material/Card";

const SettingPage: NextPage = () => {
    const {isAuthenticated, user, isLoading} = useAuth0()
    const {token} = useToken()
    const [isLoadingSetting, setIsLoadingSetting] = React.useState(true)
    const [isUsedNickname, setIsUsedNickname] = React.useState(false);
    const {setting, setSetting} = usePokemonConst()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
        setIsLoadingSetting(true)
        setIsUsedNickname(setting.isUsedNickname)
        setIsLoadingSetting(false)
    }, [setting.isUsedNickname])

    const changeUsedNickname = () => {
        setIsUsedNickname(!isUsedNickname)
    }

    const clickSave = async () => {
        console.log(isUsedNickname)
        setIsLoadingSetting(true)
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                isUsedNickname: isUsedNickname
            })
        }
        await fetch(baseUrl + "/v1/user/setting", parameter)
        if (setting != null) {
            setSetting?.({isUsedNickname: isUsedNickname})
        }
        setIsLoadingSetting(false)
    }

    if (isLoading || isLoadingSetting) {
        return (<Loading isLoading={true}/>)
    }

    if (isAuthenticated) {
        return (<>
            <PokeBuildHead title="設定"/>
            <div className="left_right">
                <div className="boxContainer">
                    <HeadLineText text="ユーザー設定"/>
                </div>
            </div>
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="stretch">
                <Grid item xs={12} sm={6} lg={4}>
                    <Card className={"setting-section"} variant="outlined">
                        <Typography variant={"h4"} className={"setting-section-header"}>ユーザー情報設定</Typography>
                        <div className={"setting-section-contents"}>ユーザー名</div>
                        <div className={"setting-section-contents"}>{user?.name ?? "デフォルトユーザー"}</div>
                        <hr/>
                        <div className={"setting-section-contents"}>メールアドレス</div>
                        <div className={"setting-section-contents"}>{user?.email ?? "メールアドレスの設定がありません"}</div>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Card className={"setting-section"} variant="outlined">
                        <Typography variant={"h4"} className={"setting-section-header"}>表示設定</Typography>
                        <FormControlLabel
                            control={<Switch checked={isUsedNickname} onChange={changeUsedNickname}/>}
                            label="ニックネームを使う" className={"setting-section-contents"}/>
                        <div className={"setting-section-contents"}>ポケモンの表示に使う名前をポケモン名からニックネームに変更します。</div>
                        <div
                            className={"setting-section-contents"}>ニックネームに切り替えた場合でもニックネームが設定されていない場合は従来通りポケモン名で表示します。
                        </div>
                        <hr/>
                        <FormControlLabel
                            control={<Switch/>}
                            label="〇〇を使用する"
                            className={"setting-section-contents"}/>
                        <div className={"setting-section-contents"}>××時に〇〇を使用します。</div>
                    </Card>
                </Grid>
            </Grid>
            <Button onClick={clickSave}>Save</Button>
        </>)
    } else {
        return (<div>ログインが必要です！</div>)
    }
}

export default SettingPage