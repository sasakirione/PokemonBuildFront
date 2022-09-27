import Card from '@mui/material/Card';
import type {NextPage} from 'next'
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import {CardContent, Grid, List, ListItem, ListItemText, Typography} from "@mui/material";
import Image from "next/image";
import React from "react";

const Home: NextPage = () => {
    return (
        <>
            <PokeBuildHead title="TOP"/>
            <Image src={"/back1.png"} width="1980px" height="400px" alt="山の上にぽけもんこうちくしえんの文字" layout='responsive'/>
            <Grid container spacing={2} direction="row" justifyContent="space-evenly" alignItems="stretch">
                <Grid item xs={12} sm={6} lg={4}>
                    <Card className="boxItem" variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                ぽけっとビルドとは
                            </Typography>
                            <List>
                                <ListItem>
                                    ぽけっとビルドはポケモン対戦を支援するためのWebサービスです。<br/>
                                    まだ機能は少ないですが、これからどんどん機能を追加予定です。
                                </ListItem>
                                <ListItem>
                                    こんな方におすすめです。<br/>
                                    ・ポケモンの努力値振りを忘れてしまう。<br/>
                                    ・メモ帳使って構築を考えてるが計算等が面倒。<br/>
                                    ・友達といまの自分の構築を共有したい。<br/>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Card className="boxItem" variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                機能
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="構築管理" secondary="複数構築の管理、構築のシェア"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="育成済みポケモン管理"
                                                  secondary="3値や性格・道具・特性・ニックネーム・技の管理"/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="調整支援" secondary="S調整支援"/>
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Card className="boxItem" variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                連絡先等
                            </Typography>
                            <List>
                                <ListItem>管理人Twitter：@sasakirione2 (不具合の報告、要望等はこちらまで)</ListItem>
                                <ListItem>Git(フロントエンド)：<a
                                    href="https://github.com/sasakirione/PokemonBuildFront">PokemonBuildFront</a></ListItem>
                                <ListItem>Git(バックエンド)：<a
                                    href="https://github.com/sasakirione/PokemonBuildBack">PokemonBuildBack</a></ListItem>
                                <ListItem>ドキュメント：<a
                                    href="https://www.notion.so/9b55f8e9212c42c89be59e61b622b1fa">ぽけっとビルド</a></ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>

    )
}

export default Home
