
import Topbar from "../../global/Topbar";
import ModeratorSidebar from "./ModeratorSidebar";
import "./ModeratorDashboard.css";
import { Route, Routes } from "react-router-dom";
import ModeratorContent from "./ModeratorContent";
import { useState } from "react";


const ModeratorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = (isExpanded) => {
    setIsOpen(isExpanded);
  };

  
  return (
    <div className={`moderator-dashboard-container ${isOpen ? 'sidebar-open' : ''}`}>
      <ModeratorSidebar isExpanded={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`moderator-dashboard-main ${isOpen ? 'moderator-dashboard-main sidebar-open' : ''}`}>
        <div className="fl"><Topbar /></div>
        <div className={`fl moderator-content-container `}>
          <Routes>
            <Route path="/*" element={<ModeratorContent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default ModeratorDashboard