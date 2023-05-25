import { Route, Routes } from "react-router-dom"


import "./manageReports.css"
import ConsultCompanies from "./ConsultCompanies"
import ConsultCompany from "./ConsultCompany"
import ReportsList from "./ReportsList"
import ManageReportsSidebar from "./ManageReportsSidebar"










const ManageReports = () => {
    return (
        <section>
        <div className="layout text-2xl text-white">
          <div className="content1 centered">
            <h1>Manage Reports</h1>
          </div>
          <div className="content2 centered">
            <ManageReportsSidebar/>
          </div>
          <div className="content3 centered">
          <Routes>
              <Route path="/" element={<ConsultCompanies />}/>
              <Route path="/:id" element={<ConsultCompany />} />
            
              <Route path="/reports" element={<ReportsList />} />
            </Routes>
          </div>
        </div>
      </section>
    )
}


export default ManageReports