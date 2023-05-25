import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled, Avatar, Box } from '@mui/material'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';



const StyledTable = styled(Table)`
    width: 100%;
    margin: 30px 0 0 30px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #118ab2;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;

const ReportsList = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        getAllReports();
    }, []);

    


    const getAllReports = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/dashboard/mederator/manageReports/allReports`, { withCredentials: true });
            const data = response.data.report
            setReports(data);
        } catch (error) {
            console.log(error);
        };

    }
    
    console.log(reports)

    return (
        <Box>


            <StyledTable>
                <TableHead>
                    <THead>
                        <TableCell>Logo</TableCell>
                        <TableCell>Comapny Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </THead>
                </TableHead>
                <TableBody>
                    {reports?.map((report, i) => (
                        <TRow key={report._id}>
                            <TableCell><Avatar src={report.image.url} /></TableCell>
                            <TableCell>{report.companyName}</TableCell>
                            <TableCell>{report.date}</TableCell>
                            <TableCell>
                                {(report.approved) ? (
                                    <p style={{ backgroundColor: "#4CAF50", color: "white", padding: "4px 8px", borderRadius: "4px" }}>
                                        Approved
                                    </p>
                                ) : (report.posted) ? (
                                    <p style={{ backgroundColor: "#FFC107", color: "black", padding: "4px 8px", borderRadius: "4px" }}>
                                        Waiting
                                    </p>
                                ) : (
                                    <p style={{ backgroundColor: "#F44336", color: "white", padding: "4px 8px", borderRadius: "4px" }}>
                                        Not Posted
                                    </p>
                                )}
                            </TableCell>
                            <TableCell >
                                <Box sx={{ display: "flex", gap: "5px" }}>
                                    <Button variant="contained" startIcon={<RemoveRedEyeIcon />} component={Link} style={{ backgroundColor: "#118ab2" }} to={`/technician/manageReports/edit/${report._id}`} >Review Report</Button>
                            
                                </Box>

                            </TableCell>
                        </TRow>
                    ))}
                </TableBody>
            </StyledTable>
        </Box>
    )

}
export default ReportsList;