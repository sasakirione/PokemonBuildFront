import {AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {NextPage} from "next";
import AuthButton from "../particle/AuthButton";
import {useState} from "react";

const Header: NextPage = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const theme = useTheme();
    const isSmartphone = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpenMenu = () => {
        setIsOpenMenu(true);
    }
    const handleCloseMenu = () => {
        setIsOpenMenu(false);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {isSmartphone && <div><IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                    onClick={handleClickOpenMenu}
                >
                    <MenuIcon/>
                </IconButton>
                    <Menu open={isOpenMenu} onClose={handleCloseMenu}>
                        <MenuItem><a href="./build">編成</a></MenuItem>
                        <MenuItem><a href="./pokemon">ポケモン一覧</a></MenuItem>
                        <MenuItem><a>ポケモンデータ</a></MenuItem>
                        <MenuItem><a>情報</a></MenuItem>
                    </Menu></div>}
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    className="logo"
                >
                    ぽけっとビルド
                </Typography>
                {!isSmartphone && <div className="boxContainer">
                    <Button href="./build" color="inherit">編成</Button>
                    <Button href="./pokemon" color="inherit">ポケモン一覧</Button>
                    <Button href="./build" color="inherit" disabled={true}>ポケモンデータ</Button>
                    <Button href="./build" color="inherit" disabled={true}>情報</Button>
                </div>}
                <AuthButton/>
            </Toolbar>
        </AppBar>
    )
}

export default Header