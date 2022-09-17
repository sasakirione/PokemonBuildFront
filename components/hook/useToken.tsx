import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useState} from "react";

const useToken = () => {
    const {isAuthenticated, getAccessTokenSilently, getIdTokenClaims} = useAuth0()
    const [token, setToken] = useState("")

    useEffect(() => {
        (
            async () => {
                if (isAuthenticated) {
                    await getAccessTokenSilently()
                    const tokenInfo = await getIdTokenClaims()
                    setToken(tokenInfo?.__raw!)
                }
            })()
    }, [getAccessTokenSilently, getIdTokenClaims, isAuthenticated])

    return {token, isAuthenticated}
}

export default useToken