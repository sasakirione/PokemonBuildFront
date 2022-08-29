import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {NextPage} from "next";
import AuthButton from "../particle/AuthButton";

const Header: NextPage = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    className="logo"
                >
                    ぽけっとビルド
                </Typography>
                <div className="boxContainer">
                    <Button href="./build" color="inherit">編成</Button>
                    <Button href="./build" color="inherit" disabled={true}>ポケモン一覧</Button>
                    <Button href="./build" color="inherit" disabled={true}>ポケモンデータ</Button>
                </div>
                <AuthButton/>
            </Toolbar>
        </AppBar>
    )
}

export default Header