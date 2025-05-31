import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled, Avatar, Box } from '@mui/material'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import GeneratePdf from "../../../global/GeneratePdf"
import GenerateWord from '../../../global/GenerateWord';


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
            const response = await axios.get(`http://localhost:3000/api/dashboard/technician/manageReports/allReports`, { withCredentials: true });
            const data = response.data.report
            setReports(data);
        } catch (error) {
            console.log(error);
        };
    }


    const deleteReport = async (id) => {

        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't to delete this Report!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3000/api/dashboard/technician/manageReports/delete/${id}`, { withCredentials: true });
                getAllReports()
                Swal.fire(
                    'Deleted!',
                    'Report has been deleted.',
                    'success'
                );
            }
        } catch (error) {
            console.log(error);
        }

    }


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
                                {(report.rejected) ? (
                                    <p style={{ backgroundColor: "#F44336", color: "white", padding: "4px 8px", borderRadius: "4px" }}>
                                        Rejected
                                    </p>
                                ) :
                                    (report.approved) ? (
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
                                    {(!report.approved || report.rejected) ? (<Button variant="contained" startIcon={<EditIcon />} component={Link} style={{ backgroundColor: "#118ab2" }} to={`/technician/manageReports/edit/${report._id}`} >EDIT AND SUBMIT</Button>) : (<Button variant="contained" disabled startIcon={<EditIcon />} component={Link} style={{ backgroundColor: "#118ab2" }} to={`/technician/manageReports/edit/${report._id}`} >EDIT AND SUBMIT</Button>)}
                                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteReport(report._id)}>Delete</Button>

                                    {report.posted && <GeneratePdf data={report} />}
                                    {report.posted && <GenerateWord data={report} />}
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