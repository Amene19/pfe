
import Topbar from "../../global/Topbar";
import TechnicianSidebar from "./TechnicianSideBar";
import "./TechnicianDashboard.css";
import { Route, Routes } from "react-router-dom";
import TechnicianContent from "./TechnicianContent";
import { useState } from "react";


const TechnicianDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = (isExpanded) => {
    setIsOpen(isExpanded);
  };

  
  return (
    <div className={`technician-dashboard-container ${isOpen ? 'sidebar-open' : ''}`}>
      <TechnicianSidebar isExpanded={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`technician-dashboard-main ${isOpen ? 'technician-dashboard-main sidebar-open' : ''}`}>
        <div className="fl"><Topbar /></div>
        <div className={`fl technician-content-container `}>
          <Routes>
            <Route path="/*" element={<TechnicianContent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;