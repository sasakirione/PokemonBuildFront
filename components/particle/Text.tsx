import {Typography} from "@mui/material";

type HeadLineTextProps = {
    text: string
}

export const HeadLineText = (props: HeadLineTextProps) => {
    const {text} = props
    return (
        <Typography
            variant="h4"
            component="h2"
        >
            {text}
        </Typography>
    )
}