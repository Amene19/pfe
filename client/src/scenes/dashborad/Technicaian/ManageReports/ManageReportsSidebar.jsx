import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import "./manageReports.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';


const ManageReportsSidebar = () => {
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
    
      return (
        <Box width="270px">
          <div style={{borderBottom: "1px groove #ccc"}}>
          <Link to="/technician/manageReports" style={linkStyle}>      
              <HomeRepairServiceIcon sx={iconStyle} />
              <h2 style={{ margin: "0", color:"#9b9696"}} className={window.location.pathname === '/technician/manageReports' ? 'profileactive' : ''}>Companies List</h2>
              {window.location.pathname === '/technician/manageReports'? <ArrowForwardIosIcon style={{paddingLeft: "10px"}}/>: ""}
              </Link>
          </div>
          <div style={{borderBottom: "1px groove #ccc"}}>
          <Link to="/technician/manageReports/reports" style={linkStyle}>      
              <HomeRepairServiceIcon sx={iconStyle} />
              <h2 style={{ margin: "0", color:"#9b9696"}} className={window.location.pathname === '/technician/manageReports/reports' ? 'profileactive' : ''}>Reports List</h2>
              {window.location.pathname === '/technician/manageReports/reports'? <ArrowForwardIosIcon style={{paddingLeft: "10px"}}/>: ""}
              </Link>
          </div>
        </Box>
      );
}


export default ManageReportsSidebar