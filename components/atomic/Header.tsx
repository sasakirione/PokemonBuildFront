import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {NextPage} from "next";

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
                <Button color="inherit" className="left">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header