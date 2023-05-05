import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./manageProfile.css"
import cookie from "js-cookie"
import jwt_decode from "jwt-decode"
import { useEffect, useState } from "react";


const ProfileSideBar = () => {
    const linkStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      textDecoration: "none",
      color: "inherit",
      margin: "20px 0",
      
    };
  
    const iconStyle = {
      marginRight: "10px",
      fontSize: "1.5rem",
    };

    const [userRole, setUserRole] = useState()
    const token = cookie.get("jwt");

    useEffect(() => {
      if (token) {
        const decodedToken = jwt_decode(token);
        setUserRole(decodedToken.userRole);
      }
      
    }, [token]);


    console.log(window.location.pathname)
    console.log(`/${userRole}/profile`)

    const profile = ``
  
    return (
      <Box width="270px">
        <div style={{borderBottom: "1px groove #ccc", padding: "0"}}>
            <Link to={profile} style={linkStyle}>      
            <EditIcon sx={iconStyle} />
            <h2 style={{ margin: "0", color:"#9b9696"}} className={window.location.pathname === `/${userRole}/profile` ? 'profileactive' : ''}>Edit Profile</h2>
            {window.location.pathname === `/${userRole}/profile`? <ArrowForwardIosIcon style={{paddingLeft: "10px"}}/>: ""}
            </Link>
        </div>
        <div style={{borderBottom: "1px groove #ccc"}}>
            <Link to="changePassword" style={linkStyle}>
            <SecurityIcon sx={iconStyle} />
            <h2 style={{ margin: "0", color:"#9b9696"}} className={window.location.pathname === `/${userRole}/profile/changePassword` ? 'profileactive' : ''}>Password & Security</h2>
            {window.location.pathname === `/${userRole}/profile/changePassword`? <ArrowForwardIosIcon style={{paddingLeft: "10px"}}/>: ""}
            </Link>
        </div>
      </Box>
    );
  };
  
  export default ProfileSideBar;
