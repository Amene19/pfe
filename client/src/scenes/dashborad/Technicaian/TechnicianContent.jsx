import { Route, Routes } from "react-router-dom"

import TechnicianProfile from "../../global/ManageProfile/AdminProfile";



const TechnicianContent = () => {
  return (
    <div className="technicianContent">
      <Routes>



        <Route path="/profile/*" element={<TechnicianProfile />} />

      </Routes>
    </div>
  );
};

export default TechnicianContent;