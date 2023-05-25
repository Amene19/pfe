import Topbar from "../../global/Topbar";
import TechnicianSidebar from "./TechnicianSideBar";
import "./TechnicianDashboard.css";
import { Route, Routes, useLocation } from "react-router-dom";
import TechnicianContent from "./TechnicianContent";
import { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme, Table } from "@mui/material";

import { tokens } from "../../../theme";




const TechnicianDashboard = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const toggleSidebar = (isExpanded) => {
    setIsOpen(isExpanded);
  };

  const isTechnicianPath = location.pathname === "/technician";


  return (
    <div className={`technician-dashboard-container ${isOpen ? 'sidebar-open' : ''}`}>
      <TechnicianSidebar isExpanded={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`technician-dashboard-main ${isOpen ? 'technician-dashboard-main sidebar-open' : ''}`}>
        <div className="fl"><Topbar /></div>
        
        <Routes>
          <Route path="/*" element={<TechnicianContent />} />
        </Routes>
      </div>
    </div>
  );
};

export default TechnicianDashboard;