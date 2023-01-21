import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Header from "../components/atomic/Header";
import {Auth0Provider} from "@auth0/auth0-react";
import {Footer} from "../components/atomic/Footer";
import {PokemonConstProvider} from "../components/hook/PokemonConst";
import toast, {Toaster} from "react-hot-toast";
import axios from "axios";
import {SWRConfig} from 'swr'
import {Analytics} from "@vercel/analytics/react";

function MyApp({Component, pageProps}: AppProps) {
    const redirectUrl = process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL!
    const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!
    const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={redirectUrl}
        >
            <SWRConfig value={{
                fetcher: (url: string) => axios.get(url).then(res => res.data),
                onError: (err: any) => {
                    if (err.status == 401 && err.status == 403) {
                        toast.error("通信に失敗しました。認証系のエラーです。ログインをやり直してください。")
                    } else if (err.status == 404) {
                        toast.error("通信に失敗しました。不正な値が送信されました。")
                    } else if (err.status == 500) {
                        toast.error("通信に失敗しました。サーバー側のエラーです。@sasakirione2までお知らせください。")
                    } else {
                        toast.error("通信に失敗しました。")
                    }
                },
                onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
                    if (error.status === 404) return
                    if (retryCount >= 3) return
                    setTimeout(() => revalidate({retryCount: retryCount + 1}), 1000)
                }
            }}>
                <PokemonConstProvider>
                    <Header/>
                    <Component {...pageProps} />
                    <div className="footer-space"></div>
                    <Footer/>
                    <Toaster/>
                </PokemonConstProvider>
                <Analytics />
            </SWRConfig>
        </Auth0Provider>
    )
}

export default MyApp
