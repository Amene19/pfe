import { Route, Routes } from "react-router-dom"
import ManageTeam from "./ManageTeam/ManageTeam"
import ManageCompanies from "./ManageCompanies/ManageCompanies";
import ManageMissions from "./ManageMissions/ManageMissions";
import AdminProfile from "../../global/ManageProfile/AdminProfile";



const AdminContent = () => {
  return (
    <div className="adminContent">
      <Routes>
        <Route path="/manageUsers/*" exact element={<ManageTeam />} />
        <Route path="/manageCompanies/*" element={<ManageCompanies />} />
        <Route path="/manageMissions/*" element={<ManageMissions />} />
        <Route path="/profile/*" element={<AdminProfile />} />
      </Routes>
    </div>
  );
};

export default AdminContent;