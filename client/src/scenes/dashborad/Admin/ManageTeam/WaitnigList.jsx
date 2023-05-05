
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

const WaitingList = () => {
const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getWaitnigList();
    }, []);

    const getWaitnigList = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/dashboard/admin/waitingList`,{ withCredentials: true });      
            const data = response.data.user
            setUsers(data);
        } catch (error) {
            console.log(error);
        };
        
    }

   

    const approveUser = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/dashboard/admin/approve-user/${id}`, null, { withCredentials: true });
            
            getWaitnigList()
        } catch (error) {
            console.log(error); 
        }
        
    }
    
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/dashboard/admin/deleteUser/${id}`,{ withCredentials: true });
            getWaitnigList()
        } catch (error) {
            console.log(error); 
        }
        
    }

    return (
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Id</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                </THead>
            </TableHead>
            {users.length > 0 ? (
            <TableBody>
                {users.map((user, i) => (
                    <TRow key={user._id}>
                        <TableCell>{i+1}</TableCell>
                        <TableCell>{user.firstname}</TableCell>
                        <TableCell>{user.lastname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell sx={{display:"flex", gap:"10px"}}>
                            <Button variant="contained" color="success" startIcon={<EditIcon />} onClick={() => approveUser(user._id)} >Approve</Button>
                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteUser(user._id)}>Reject</Button> 
                        </TableCell>
                    </TRow>
                ))}
                </TableBody>
                 ) : (
                    <TableBody>
                      <TRow>
                        <TableCell colSpan={6}>No users found</TableCell>
                      </TRow>
                    </TableBody>
                  )}
        </StyledTable>
    )

                }
export default WaitingList;