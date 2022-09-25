import {NextPage} from "next";
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import React, {useState} from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
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
        <Grid container spacing={2} direction="row" justifyContent="space-evenly" alignItems="stretch">
            <Grid item xs={12} lg={6}>
                <Card className="info-card" variant="outlined">
                    <Typography variant="h5" component="div" className="card-title">
                        更新履歴
                    </Typography>
                    <List>
                        {historyList.slice(0, 4).map((history) => (
                            <ListItem key={history.date}>
                                <ListItemText primary={history.date} secondary={history.content}/>
                            </ListItem>
                        ))}
                    </List>
                    <CardActionArea>
                        <Button onClick={handleOpenHistoryDetail}>more</Button>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Card className="info-card" variant="outlined">
                    <Typography variant="h5" component="div" className="card-title">
                        使用方法
                    </Typography>
                    <CardContent>
                        1. 右上のログインボタンからログインを行う<br/>
                        2. 構築画面が表示されたら右上のポケモンを追加ボタンを押す<br/>
                        3. 必要項目を入力しOKを押すと保存されます<br/>
                        4. 登録された構築情報は該当の項目をクリックすると編集画面がでます<br/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Card className="info-card" variant="outlined">
                    <Typography variant="h5" component="div" className="card-title">
                        おことわり
                    </Typography>
                    <CardContent>
                        <div>・本ツールはポケモン公式とは一切関係のないファンサイトです。</div>
                        <div>・様々な計算値について可能な限り正確な値が出来るように設計していますが、完全に正しい結果を保証するわけではありません。
                            ランクマッチでの対戦結果を含めて本ツールを使用する事によって生じたいかなる損害も開発者は責任を負いかねます。
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
                <Card className="info-card" variant="outlined">
                    <Typography variant="h5" component="div" className="card-title">
                        技術スタック
                    </Typography>
                    <CardContent>
                        <List>
                            <ListItem>フロントエンド： TypeScript, Next.js, Material-UI</ListItem>
                            <ListItem>バックエンド： Kotlin, Ktor, Exposed, PostgreSQL</ListItem>
                            <ListItem>クラウド： Auth0, Cloud SQL, Cloud Build, Cloud Run</ListItem>
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