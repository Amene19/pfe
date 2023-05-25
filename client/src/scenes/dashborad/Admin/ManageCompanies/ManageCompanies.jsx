import { Route, Routes } from "react-router-dom"
import ConsultCompanies from "./ConsultCompanies"
import ManageCompaniesSidebar from "./ManageCompanieSidebar"
import CreateCompanie from "./CreateCompanie"

import "./manageCompanies.css"
import ConsultCompany from "./ConsultCompany"
import EditCompany from "./EditCompany"






const ManageCompanies = () => {
    return (
        <section>
        <div className="layout text-2xl text-white">
          <div className="content1 centered">
            <h1>Manage Companies</h1>
          </div>
          <div className="content2" style={{display:"flex", justifyContent:"center", paddingTop:"100px"}}>
            <ManageCompaniesSidebar />
          </div>
          <div className="content3 centered">
            <Routes>
              <Route path="/" element={<ConsultCompanies />}/>
              <Route path="/:id" element={<ConsultCompany />}/>
              <Route path="/edit/:id" element={<EditCompany />}/>
              <Route path="/create" element={<CreateCompanie />} />
            </Routes>
          </div>
        </div>
      </section>
    )
}


export default ManageCompanies