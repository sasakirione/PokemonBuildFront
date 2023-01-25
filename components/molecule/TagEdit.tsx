import Pokemon from "../../domain/Pokemon";
import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {Loading} from "../particle/Loading";
import {usePokemonConst} from "../hook/PokemonConst";
import useToken from "../hook/useToken";

export function TagEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {token} = useToken()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const [tag, setTag] = useState<string[]>(props.pokemon.tag);
    const [isLoading, setIsLoading] = useState(false)
    const {tagList, setToast} = usePokemonConst()

    useEffect(() => {
            setTag(props.pokemon.tag)
        }, [props.pokemon.tag]
    )

    const handleChange = (event: SelectChangeEvent<typeof tag>) => {
        const {
            target: {value},
        } = event;
        setTag(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    async function saveTags() {
        await sendData(tag)
        props.pokemon.tag = tag
        props.onClose()
    }

    async function sendData(tags: string[]) {
        setIsLoading(true)
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({values: tags, itemSelect: 6})
        }
        await fetch(baseUrl + "/v1/pokemon-build/grown-pokemons/" + props.pokemon.personalId + "/value", parameter).catch(
            (reason: any) => {
                setToast("タグの変更に失敗しました。エラーコード：" + reason.status, "error")
            }
        )
        setIsLoading(false)
    }

    return (<>
        <Dialog
            open={props.open}
            keepMounted
            onClose={props.onClose}
        >
            <DialogTitle>タグを変更する</DialogTitle>
            <DialogContent>
                <FormControl sx={{m: 1}}>
                    <InputLabel id="demo-multiple-chip-label">タグ</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="tag-select-input"
                        multiple
                        value={tag}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value}/>
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {tagList?.map((tag) => (
                            <MenuItem
                                key={tag}
                                value={tag}
                            >
                                {tag}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={saveTags}>OK</Button>
            </DialogActions>
        </Dialog>
        <Loading isLoading={isLoading}/>
    </>);
}