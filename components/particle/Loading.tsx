import {Backdrop, CircularProgress} from "@mui/material";

export const Loading = (props: { isLoading: boolean }) => {
    return (
        <Backdrop open={props.isLoading} className="loading-screen">
            <CircularProgress color="inherit"></CircularProgress>
        </Backdrop>
    )
}