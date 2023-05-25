import { Route, Routes } from "react-router-dom"

import AdminProfile from "../../global/ManageProfile/AdminProfile";
import ConsultMissions from "./ConsultMissions";
import ManageReports from "./ManageReports/ManageReports";


const ModeratorContent = () => {
  return (
    <div className="moderatorContent">
      <Routes>
        <Route path="/manageReports/*" element={<ManageReports />} />
        <Route path="/myMissions/*" element={<ConsultMissions />} />
        <Route path="/profile/*" element={<AdminProfile />} />
      </Routes>
    </div>
  );
};

export default ModeratorContent;