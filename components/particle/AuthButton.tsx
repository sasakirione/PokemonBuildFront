import {useAuth0} from "@auth0/auth0-react";
import {Button} from "@mui/material";
import UserMenu from "../atomic/UserMenu";

const AuthButton = () => {
    const {
        isAuthenticated,
        loginWithRedirect,
        logout
    } = useAuth0();

    return (
        <div className="left">
            {isAuthenticated && (
                <div className="boxContainer">
                    <Button color="inherit" onClick={() => logout()}>Logout</Button>
                    <UserMenu/>
                </div>
            )}
            {!isAuthenticated && (
                <Button color="inherit" onClick={() => loginWithRedirect()}>Login</Button>
            )}
        </div>
    )
}

export default AuthButton