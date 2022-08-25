import Card from '@mui/material/Card';
import type {NextPage} from 'next'
import {PokeBuildHead} from "../components/atomic/PokeBuildHead";
import {CardContent, Typography} from "@mui/material";

const Home: NextPage = () => {
    return (
        <>
            <PokeBuildHead title="TOP"/>
            <div className="boxContainer mainPage">
                <Card className="boxItem" variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            更新履歴
                        </Typography>
                        <div>
                            2022/08/25：サービス開始
                        </div>
                    </CardContent>
                </Card>
                <Card className="boxItem" variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            ぽけっとビルドとは
                        </Typography>
                        <div>
                            ぽけっとビルドはポケモンの構築作成を支援するためのWebサービスです。<br/>
                            現在は1つの構築情報を保存する機能しかありませんが、これからどんどん機能を追加予定です。<br/>
                            <br/>
                            今後の実装予定<br/>
                            ・複数の構築の管理<br/>
                            ・S調整機能の追加<br/>
                            ・育成済みポケモン一覧画面<br/>
                        </div>
                    </CardContent>
                </Card>
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
                <Card className="boxItem" variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            連絡先等
                        </Typography>
                        <div>
                            Twitter：sasakirione2
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>

    )
}

export default Home
