import { Box } from "@mui/material";
import ProfileSideBar from "./ProfileSideBar";
import { Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile";
import PasswordAndSecurity from "./PasswordAndSecurity";

const AdminProfile = () => {
  return (
    <Box>
      <h1>My Profile</h1>
      <div
        style={{
          display: "flex",
          gap: "100px",
          borderTop: "1px groove #ccc",
          paddingTop: "20px",
        }}
      >
        <ProfileSideBar />
        <div
          style={{
            width: "50%",
            borderLeft: "1px groove #ccc",
            marginLeft: "-100px",
            paddingLeft: "40px",
            marginTop: "-19.5px",
          }}
        >
          <Routes>
            <Route path="" element={<EditProfile />} />
            <Route path="/changePassword" element={<PasswordAndSecurity />} />
          </Routes>
        </div>
      </div>
    </Box>
  );
};

export default AdminProfile;
