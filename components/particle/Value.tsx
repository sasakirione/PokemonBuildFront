import {CardContent, Typography} from "@mui/material";
import Card from "@mui/material/Card";

export const SpeedTribeValue = (props: { speedValue: number, label: string }) => {
    const valueText = props.speedValue + (props.label == "最遅" ? "族抜かれ" : "族抜き")

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant={"h6"}>{props.label}</Typography>
                {valueText}
            </CardContent>
        </Card>
    )
}