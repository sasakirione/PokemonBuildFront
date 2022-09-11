import {IconButton, Tooltip} from "@mui/material";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {useEffect, useState} from "react";
import {DeleteDialog} from "./DeleteDialog";
import useToken from "../hook/useToken";
import {usePokemonConst} from "../hook/PokemonConst";

export const GrownPokemonTableSelectMenu = (props: { selectedRows: any, displayData: any }) => {
    const [idList, setIdList] = useState<number[]>([])
    const {token} = useToken()
    const {setToast} = usePokemonConst()
    const [isOpenBuild, setIsOpenBuild] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!

    useEffect(() => {
            if (props.selectedRows.data != undefined) {
                const dataIndexes: number[] = props.selectedRows.data.map((x: { dataIndex: number; }) => x.dataIndex)
                console.log(dataIndexes)
                const ids: number[] = props.displayData
                    .filter((x: { dataIndex: number; }) => dataIndexes.includes(x.dataIndex))
                    .map((x: { data: any[]; }) => x.data[0])
                setIdList(ids)
            }
        }, [props.displayData, props.selectedRows.data]
    )

    const clickBuild = () => {
        setIsOpenBuild(true)
    }

    const clickDeleted = () => {
        setIsOpenDelete(true)
    }

    const closeDeleteDialog = () => {
        setIsOpenDelete(false)
    }

    const deletePokemons = async () => {
        console.log(idList)
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "DELETE",
        }
        let isSuccessList: boolean[] = []
        for (const id of idList) {
            const response = await fetch(baseUrl + "/v1/pokemon-build/grown-pokemons/" + id, parameter)
            isSuccessList.push(response.ok)
        }
        if (isSuccessList.some(x => !x)) {
            setToast("一部育成済みポケモンの削除に失敗しました", "error")
        } else {
            setToast("育成済みポケモンの削除に成功しました", "normal")
        }
        setIsOpenDelete(false)
    }

    return (
        <>
            <div>
                <Tooltip title={"選択したポケモンを構築へ追加する"}>
                    <IconButton onClick={clickBuild}>
                        <PlaylistAddIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"選択したポケモンを削除する"}>
                    <IconButton onClick={clickDeleted}>
                        <DeleteSweepIcon/>
                    </IconButton>
                </Tooltip>
            </div>
            <DeleteDialog target={"育成済みポケモン"} isOpen={isOpenDelete} onClose={closeDeleteDialog}
                          deleteFunction={deletePokemons}/>
        </>
    )
}