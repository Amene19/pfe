import { Route, Routes } from "react-router-dom"

import TechnicianProfile from "../../global/ManageProfile/AdminProfile";
import ManageReports from "./ManageReports/ManageReports";
import ConsultMissions from "./ConsultMissions";



const TechnicianContent = () => {
  return (
    <div className="technicianContent">
      <Routes>


        <Route path="/profile/*" element={<TechnicianProfile />} />
        <Route path="/manageReports/*" element={<ManageReports/>} />
        <Route path="/myMissions" element={<ConsultMissions />} />
      </Routes>
    </div>
  );
};

export default TechnicianContent;