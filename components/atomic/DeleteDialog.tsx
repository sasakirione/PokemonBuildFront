import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";

export const DeleteDialog = (props: { target: string, isOpen: boolean, onClose: () => void, deleteFunction: () => void }) => {

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.onClose}
        >
            <DialogContent>
                {props.target}を削除します。この操作は取り消すことができません。
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="success">
                    削除しない
                </Button>
                <Button onClick={props.deleteFunction} color="error">
                    削除する
                </Button>
            </DialogActions>
        </Dialog>
    )
}