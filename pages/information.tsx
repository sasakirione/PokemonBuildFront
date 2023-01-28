import {NextPage} from "next";
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import React, {useState} from "react";
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid, Link,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import {siteHistory} from "../domain/history";

const Information: NextPage = () => {
    const historyList = siteHistory.historyList
    const [isOpenHistoryDetail, setIsOpenHistoryDetail] = useState(false)

    const handleOpenHistoryDetail = () => {
        setIsOpenHistoryDetail(true)
    }

    const handleCloseHistoryDetail = () => {
        setIsOpenHistoryDetail(false)
    }

    return (<>
        <PokeBuildHead title="インフォメーション"/>
        <Grid container spacing={1} direction="row" justifyContent="space-evenly" alignItems="stretch">
            <Grid item xs={12} lg={6}>
                <Card className="info-card" variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            更新履歴
                        </Typography>
                        <List>
                            {historyList.slice(0, 4).map((history) => (
                                <ListItem key={history.date}>
                                    <ListItemText primary={history.date} secondary={history.content}/>
                                </ListItem>
                            ))}
                            <ListItem><Button onClick={handleOpenHistoryDetail}>more</Button></ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Card className="info-card" variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            使用方法
                        </Typography>
                        <List>
                            <ListItem>1. 右上のログインボタンからログインを行う</ListItem>
                            <ListItem>2. 構築画面が表示されたら右上のポケモンを追加ボタンを押す</ListItem>
                            <ListItem>3. 必要項目を入力しOKを押すとポケモンが保存されます</ListItem>
                            <ListItem>4. 登録されたポケモンは該当の項目をクリックすると編集画面がでます</ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Card className="info-card" variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            おことわり
                        </Typography>
                        <List>
                            <ListItem>
                                本ツールはポケモン公式とは一切関係のないファンメイドです。
                            </ListItem>
                            <ListItem>
                                様々な計算値について可能な限り正確な値が出来るように設計していますが、完全に正しい結果を保証するわけではありません。
                                ランクマッチでの対戦結果を含めて本ツールを使用する事によって生じたいかなる損害も開発者は責任を負いかねます。
                            </ListItem>
                            <ListItem>
                                本ツールは日本国内向けです。
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Card className="info-card" variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            技術スタック
                        </Typography>
                        <List>
                            <ListItem>フロントエンド： TypeScript, Next.js, Material-UI</ListItem>
                            <ListItem>バックエンド： Kotlin, Ktor, Exposed, PostgreSQL</ListItem>
                            <ListItem>外部サービス： Auth0, Cloud SQL, Cloud Build, Cloud Run</ListItem>
                            <ListItem>開発： IntelliJ, WebStorm, Docker, GitHub</ListItem>
                            <ListItem>過去にお世話になったサービス： Heroku</ListItem>
                            <ListItem>ライブラリ以外でお世話になったリポジトリ： <Link
                                href="https://github.com/msikma/pokesprite">pokesprite</Link></ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        {
            isOpenHistoryDetail && <Dialog open={isOpenHistoryDetail} onClose={handleCloseHistoryDetail}>
                <DialogTitle>更新履歴</DialogTitle>
                <DialogContent>
                    <List>
                        {historyList.map((history) => (
                            <ListItem key={history.date}>
                                <ListItemText primary={history.date} secondary={history.content}/>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        }
    </>)
}

export default Information