
import styled from '@emotion/styled';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box, Button } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
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

const ConsultMissions = () => {
    const [missions, setMissions] = useState([])

    useEffect(() => {
        getAllMissions();
  }, []);
  
  console.log(missions)
  
  const getAllMissions = async () => {
      try {
          const response = await axios.get(`http://localhost:3000/api/dashboard/admin/manageMissions/all`,{ withCredentials: true });
          const data = response.data.missions
          setMissions(data);
      } catch (error) {
          console.log(error);
      };
      
  }

  const deleteMission = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/api/dashboard/admin/manageMissions/delete/${id}`, {
          withCredentials: true
        });
  
        getAllMissions(); // Assuming this is a function to fetch and update the company list
  
        Swal.fire(
          'Deleted!',
          'Mission has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <Box sx={{marginBottom: "50px"}}>
            <StyledTable>
                <TableHead>
                    <THead>
                        <TableCell>Mission Title</TableCell>
                        <TableCell>Assignee</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Target</TableCell>
                        <TableCell>Deadline</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </THead>
                </TableHead>
                <TableBody>
                {missions?.map((mission, i) => (
                        <TRow key={mission._id}>
                            <TableCell>{mission.missionTitle}</TableCell>
                            <TableCell>{mission.assignee}</TableCell>
                            <TableCell>{mission.role}</TableCell>
                            <TableCell>{mission.target}</TableCell>
                            <TableCell>{mission.deadline}</TableCell>
                            <TableCell>{(mission.status) ? (
                                    <p style={{ backgroundColor: "#4CAF50", color: "white", padding: "4px 8px", borderRadius: "4px" }}>
                                        completed
                                    </p>
                                ) :  (
                                    <p style={{ backgroundColor: "#FFC107", color: "black", padding: "4px 8px", borderRadius: "4px" }}>
                                        uncompleted
                                    </p>
                                )}</TableCell>
                            
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => deleteMission(mission._id)} startIcon={<DeleteIcon />}>Delete</Button>
                            </TableCell>
                        </TRow>
                    ))}
                </TableBody>
            </StyledTable>

        </Box>
    )
}



export default ConsultMissions