import React, { useEffect, useState } from "react"
import { Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom"
import { ColorModeContext, useMode } from "./theme"

import { CssBaseline, ThemeProvider } from "@mui/material"
import AdminDashboard from "./scenes/dashborad/Admin/AdminDashboard"
import TechnicianDashboard from "./scenes/dashborad/Technicaian/TechnicianDashboard"
import ModeratorDashboard from "./scenes/dashborad/Moderator/ModeratorDashboard"
import Login from "./pages/LoginPage"
import Signup from "../src/pages/SignupPage"
import cookie from "js-cookie"
import jwt_decode from "jwt-decode"
import NotFound from "./pages/NotFound"





function App() {
  const [theme, colorMode] = useMode();
  const [userRole, setUserRole] = useState()
  const token = cookie.get("jwt");
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      const decodedToken = jwt_decode(token);
      setUserRole(decodedToken.userRole);
    }
    
  }, [token]);


 

  useEffect(() => {
    localStorage.setItem("lastLocation", location.pathname);
    return () => {
      localStorage.setItem("lastLocation", location.pathname);
    };
  }, [location]);

  useEffect(() => {
    const lastLocation = localStorage.getItem("lastLocation");
    if (lastLocation) {
      navigate(lastLocation);
    }
  }, []);
  
  function PrivateRoute({ element, allowedRoles }) {
      
      if (!token) {
        return <Navigate to="/login" replace />
      } 
      if (!userRole || !allowedRoles.includes(userRole)) 
        return <Navigate to="/login" replace />
       
        return element
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
          <Routes>
              <Route path="/" element={
                token && userRole === "admin" ? <Navigate to="/admin" /> :
                token && userRole === "technician" ? <Navigate to="/technician" /> :
                token && userRole === "moderator" ? <Navigate to="/moderator" /> :
                <Navigate to="/login" />
              } />
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/login" exact element={<Login />}/>
              <Route
                path="/admin/*"
                element={<PrivateRoute element={<AdminDashboard />} allowedRoles={["admin"]} />}
              />
              <Route
                path="/technician/*"
                element={<PrivateRoute element={<TechnicianDashboard />} allowedRoles={["technician"]} />}
              />
              <Route
                path="/moderator/*"
                element={<PrivateRoute element={<ModeratorDashboard />} allowedRoles={["moderator"]} />}
              />
              <Route path="*" element={<NotFound />} />
          </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
