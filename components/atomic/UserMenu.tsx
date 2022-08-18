import {Avatar, Box, IconButton, Tooltip} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";

const UserMenu = () => {
    const {user} = useAuth0()

    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title="Open user settings">
                <IconButton sx={{p: 0}}>
                    <Avatar alt="Remy Sharp" src={user?.picture}/>
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default UserMenu