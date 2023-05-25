import { Box } from "@mui/material";
import { Link } from "react-router-dom";

import "./manageReports.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
    <Box width="100%" className="side" >
      <div>
        <Link to="/moderator/manageReports" style={linkStyle}>
          <HomeRepairServiceIcon sx={iconStyle} />
          <h2 style={{ margin: "0", color: "#9b9696" }} className={window.location.pathname === '/moderator/manageReports' ? 'profileactive' : ''}>Companies List</h2>
          {window.location.pathname === '/moderator/manageReports' ? <ArrowForwardIosIcon style={{ paddingLeft: "10px" }} /> : ""}
        </Link>
      </div>
      <div>
        <Link to="/moderator/manageReports/reports" style={linkStyle}>
          <HomeRepairServiceIcon sx={iconStyle} />
          <h2 style={{ margin: "0", color: "#9b9696" }} className={window.location.pathname === '/moderator/manageReports/reports' ? 'profileactive' : ''}>Reports List</h2>
          {window.location.pathname === '/moderator/manageReports/reports' ? <ArrowForwardIosIcon style={{ paddingLeft: "10px" }} /> : ""}
        </Link>
      </div>
     
    </Box>
  );
}


export default ManageReportsSidebar