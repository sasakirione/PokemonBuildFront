import Pokemon from "../../domain/Pokemon";
import React, {useState} from "react";
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
import {useAuth0} from "@auth0/auth0-react";
import {Loading} from "../particle/Loading";
import usePokemonConst from "../hook/usePokemonConst";

export function TagEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon }) {
    const {getAccessTokenSilently, getIdTokenClaims} = useAuth0()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
    const [tag, setTag] = useState<string[]>(props.pokemon.tag);
    const [isLoading, setIsLoading] = useState(false)
    const {tagList} = usePokemonConst()

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
        await getAccessTokenSilently()
        let token = await getIdTokenClaims()
        const parameter = {
            headers: {
                Authorization: 'Bearer ' + token?.__raw!,
                "Content-Type": 'application/json'
            },
            method: "POST",
            body: JSON.stringify({tags: tags, pokemonId: props.pokemon.personalId})
        }
        await fetch(baseUrl + "/v1/pokemon_build/post_tag", parameter)
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
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel id="demo-multiple-chip-label">タグ</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
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