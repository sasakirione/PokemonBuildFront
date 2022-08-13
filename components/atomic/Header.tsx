import {AppBar, Toolbar, Typography} from "@mui/material";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {NextPage} from "next";
import AuthButton from "../particle/AuthButton";

const Header: NextPage = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <FormatListNumberedIcon />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                >
                    Pokemon Build Management
                </Typography>
                <AuthButton />
            </Toolbar>
        </AppBar>
    )
}

export default Header