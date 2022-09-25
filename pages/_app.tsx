import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Header from "../components/atomic/Header";
import {Auth0Provider} from "@auth0/auth0-react";
import {Footer} from "../components/atomic/Footer";
import {PokemonConstProvider} from "../components/hook/PokemonConst";
import {Toaster} from "react-hot-toast";

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
            <PokemonConstProvider>
                <Header/>
                <Component {...pageProps} />
                <div className="footer-space"></div>
                <Footer/>
                <Toaster/>
            </PokemonConstProvider>
        </Auth0Provider>
    )
}

export default MyApp
