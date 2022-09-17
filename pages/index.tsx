import Card from '@mui/material/Card';
import type {NextPage} from 'next'
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import {CardContent, Grid, Typography} from "@mui/material";
import Image from "next/image";

const Home: NextPage = () => {
    return (
        <>
            <PokeBuildHead title="TOP"/>
            <Image src={"/back1.png"} width="1980px" height="400px" alt="山の上にぽけもんこうちくしえんの文字" layout='responsive'/>
            <Grid container spacing={2} direction="row" justifyContent="space-evenly" alignItems="stretch">
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="boxItem" variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                更新履歴
                            </Typography>
                            <div>
                                2022/08/25：サービス開始<br/>
                                2022/09/17: 育成済みポケモン一覧機能、S調整機能、複数構築機能を追加
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="boxItem" variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                ぽけっとビルドとは
                            </Typography>
                            <div>
                                ぽけっとビルドはポケモンの構築作成を支援するためのWebサービスです。<br/>
                                現在は機能も少ないですが、これからどんどん機能を追加予定です。<br/>
                                <br/>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="boxItem" variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                使用方法
                            </Typography>
                            <div>
                                1. 右上のログインボタンからログインを行う<br/>
                                2. 構築画面が表示されたら右上のポケモンを追加ボタンを押す<br/>
                                3. 必要項目を入力しOKを押すと保存されます<br/>
                                4. 登録された構築情報は該当の項目をクリックすると編集画面がでます<br/>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <Card className="boxItem" variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                連絡先等
                            </Typography>
                            <div>
                                管理人Twitter：@sasakirione2<br/>
                                Git(Front)：<a
                                href="https://github.com/sasakirione/PokemonBuildFront">PokemonBuildFront</a><br/>
                                Git(Back)：<a
                                href="https://github.com/sasakirione/PokemonBuildBack">PokemonBuildBack</a><br/>
                                ドキュメント：<a href="https://www.notion.so/9b55f8e9212c42c89be59e61b622b1fa">ぽけっとビルド</a><br/>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>

    )
}

export default Home
