import { Box, IconButton, useTheme} from "@mui/material"
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificatinsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SearchIcon from '@mui/icons-material/Search'
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import cookie from "js-cookie";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [, , removeCookie] = useCookies(['jwt']);
    const navigate = useNavigate();
    const token = cookie.get("jwt");
    const handleLogout = async () => {
        try {
          
          removeCookie('jwt');
          localStorage.clear()
          await axios.post('http://localhost:3000/api/auth/logout');
          navigate("/login");
        } catch (error) {
          console.error(error);
        }
    };
    useEffect(() => {
        if (!token) {
          navigate("/login")
        }
      }, [token]);
    
    return (
        <Box display="flex" justifyContent="space-between" p={2} >
            {/*Serch Bar*/}
            <Box 
                display="flex" 
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ml:2, flex:1}} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1}}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/*Icons*/}
            <Box display="flex" >
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}  
                </IconButton>
                <IconButton>
                    <NotificatinsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleLogout}>
                    <LogoutIcon />
                </IconButton>
            </Box>

        </Box>
    )
}

export default Topbar;