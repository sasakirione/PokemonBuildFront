import React, {useEffect, useState} from "react";
import {BuildObject} from "../../type/type";
import useToken from "../hook/useToken";
import {Dialog, DialogContent, DialogTitle, List} from "@mui/material";
import {BuildRow} from "../atomic/BuildRow";
import {usePokemonConst} from "../hook/PokemonConst";
import {Loading} from "../particle/Loading";

export const BuildListOfAddPokemon = (props: { isOpen: boolean, onClose: () => void, idList: number[] }) => {
    const [builds, setBuilds] = useState<BuildObject[]>([{comment: "なし", id: 0, name: "デフォルトの構築"}])
    const [isBuildLoading, setIsBuildLoading] = useState(false)
    const {setToast} = usePokemonConst()
    const {token} = useToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
        if (builds[0].id == 0) {
            setIsBuildLoading(true)
            const parameter = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
            fetch(baseUrl + "/v1/pokemon-build/builds", parameter)
                .then((res: { json: () => any; }) => res.json())
                .then((data: BuildObject[]) => {
                    setBuilds(data)
                    setIsBuildLoading(false)
                })
                .catch((reason: any) => {
                    console.log(reason)
                    setIsBuildLoading(false)
                })
        }
    }, [baseUrl, builds, token])

    async function clickBuild(buildId: number) {
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "POST",
        }
        let isSuccessList: boolean[] = []
        for (const id of props.idList) {
            const response = await fetch(baseUrl + "/v1/pokemon-build/builds/" + buildId + "/pokemon/" + id, parameter)
            isSuccessList.push(response.ok)
        }
        if (isSuccessList.some(x => !x)) {
            setToast("一部育成済みポケモンの構築への追加に失敗しました", "error")
        } else {
            setToast("育成済みポケモンの構築への追加に成功しました", "normal")
        }
        props.onClose()
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
        >
            <DialogTitle>追加する構築を選択する</DialogTitle>
            <DialogContent>
                {isBuildLoading ?
                    <Loading isLoading={isBuildLoading}/>
                    :
                    <List>
                        {builds.map(build =>
                            <BuildRow key={build.id} build={build} onClick={() => clickBuild(build.id)}/>
                        )}
                    </List>
                }
            </DialogContent>
        </Dialog>
    )
}