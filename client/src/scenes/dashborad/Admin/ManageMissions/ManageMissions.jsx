import { Route, Routes } from "react-router-dom"
import "./manageMissions.css"
import ConsultMissions from "./ConsultMissions"
import ConsultMission from "./ConsultMission"
import AddMission from "./AddMission"
import ManageMissionssSidebar from "./ManageMissionsSidebar"







const ManageMissions = () => {
    return (
        <section>
        <div className="layout text-2xl text-white">
          <div className="content1 centered">
            <h1>Manage Missions</h1>
          </div>
          <div className="content2" style={{display:"flex", justifyContent:"center", paddingTop:"100px"}}>
            <ManageMissionssSidebar />
          </div>
          <div className="content3 centered">
            <Routes>
              <Route path="/" element={<ConsultMissions />}/>
              <Route path="/:id" element={<ConsultMission />}/>
              <Route path="/create" element={<AddMission />} />
            </Routes>
          </div>
        </div>
      </section>
    )
}


export default ManageMissions