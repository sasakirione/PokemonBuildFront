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

export function TagEdit(props: { open: boolean, onClose: () => void, pokemon: Pokemon, tagList: string[] }) {
    const [tag, setTag] = useState<string[]>(props.pokemon.tag);

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

    function saveTags() {
        props.pokemon.tag = tag
        props.onClose()
    }

    return (<Dialog
        open={props.open}
        keepMounted
        onClose={props.onClose}
    >
        <DialogTitle>性格を変更する</DialogTitle>
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
                    {props.tagList?.map((tag) => (
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
    </Dialog>);
}