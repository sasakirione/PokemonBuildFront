import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Header from "../components/atomic/Header";
import {Auth0Provider} from "@auth0/auth0-react";

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
            <Header/>
            <Component {...pageProps} />
        </Auth0Provider>
    )
}

export default MyApp
