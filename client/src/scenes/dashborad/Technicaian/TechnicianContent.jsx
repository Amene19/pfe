import { Route, Routes } from "react-router-dom"

import TechnicianProfile from "../../global/ManageProfile/AdminProfile";
import ManageReports from "./ManageReports/ManageReports";



const TechnicianContent = () => {
  return (
    <div className="technicianContent">
      <Routes>


        <Route path="/profile/*" element={<TechnicianProfile />} />
        <Route path="/manageReports/*" element={<ManageReports/>} />
      </Routes>
    </div>
  );
};

export default TechnicianContent;