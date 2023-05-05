import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import "./manageCompanies.css"



const ManageCompaniesSidebar = () => {
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
              <Link to="/admin/manageCompanies" style={linkStyle}>      
              <HomeRepairServiceIcon sx={iconStyle} />
              <h2 style={{ margin: "0", color:"#9b9696"}} className={window.location.pathname === '/admin/manageCompanies' ? 'profileactive' : ''}>Companies List</h2>
              {window.location.pathname === '/admin/manageCompanies'? <ArrowForwardIosIcon style={{paddingLeft: "10px"}}/>: ""}
              </Link>
          </div>
          <div style={{borderBottom: "1px groove #ccc"}}>
              <Link to="create" style={linkStyle}>
              <AddIcon sx={iconStyle} />
              <h3 style={{ margin: "0", color:"#9b9696"}} className={window.location.pathname === '/admin/manageCompanies/create' ? 'profileactive' : ''}>Create New Companie</h3>
              {window.location.pathname === '/admin/manageCompanies/create'? <ArrowForwardIosIcon style={{paddingLeft: "10px"}}/>: ""}
              </Link>
          </div>
        </Box>
      );
}


export default ManageCompaniesSidebar