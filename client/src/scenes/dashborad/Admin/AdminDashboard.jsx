import Topbar from "../../global/Topbar";
import AdminSidebar from "./AdminSidebar";
import "./AdminDashboard.css";
import { Route, Routes } from "react-router-dom";
import AdminContent from "./AdminContent";
import { useState } from "react";


const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = (isExpanded) => {
    setIsOpen(isExpanded);
  };

  
  return (
    <div className={`admin-dashboard-container ${isOpen ? 'sidebar-open' : ''}`}>
      <AdminSidebar isExpanded={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`admin-dashboard-main ${isOpen ? 'admin-dashboard-main sidebar-open' : ''}`}>
        <div className="fl"><Topbar /></div>
        <div className={`fl admin-content-container `}>
          <Routes>
            <Route path="/*" element={<AdminContent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;