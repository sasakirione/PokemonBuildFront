import {NextPage} from "next";
import {useAuth0} from "@auth0/auth0-react";
import React, {useEffect} from "react";
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import {HeadLineText} from "../components/particle/Text";
import {Button, FormControlLabel, FormGroup, Switch} from "@mui/material";
import {Loading} from "../components/particle/Loading";
import {usePokemonConst} from "../components/hook/PokemonConst";
import useToken from "../components/hook/useToken";

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
            <div>ユーザー名：</div>
            <div>{user?.name ?? "デフォルトユーザー"}</div>
            <div>ユーザー名：</div>
            <FormGroup>
                <FormControlLabel
                    control={<Switch defaultChecked value={isUsedNickname} onChange={changeUsedNickname}/>}
                    label="ニックネームを使う"/>
            </FormGroup>
            <Button onClick={clickSave}>Save</Button>
        </>)
    } else {
        return (<div>ログインが必要です！</div>)
    }
}

export default SettingPage