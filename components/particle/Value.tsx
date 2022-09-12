import {Box} from "@mui/material";

export const SpeedTribeValue = (props: { speedValue: number, label: string }) => {
    const valueText = props.speedValue + (props.label == "最遅" ? "族抜かれ" : "族抜き")

    return (
        <Box>
            <div>{props.label}</div>
            <div>{valueText}</div>
        </Box>
    )
}