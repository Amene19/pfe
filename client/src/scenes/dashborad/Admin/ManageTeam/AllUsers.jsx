import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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

const AllUsers = () => {
const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getAllUsers();
    }, []);

    

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/dashboard/admin/usersList`,{ withCredentials: true });
            const data = response.data.user2
            setUsers(data);
        } catch (error) {
            console.log(error);
        };
        
    }
    
    const deleteUser = async (id) => {

            try {
                const result = await Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't to delete this user!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                });
            
                if (result.isConfirmed) {
            await axios.delete(`http://localhost:3000/api/dashboard/admin/deleteUser/${id}`,{ withCredentials: true });
            getAllUsers()
            Swal.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              );
            }
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
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {users.map((user, i) => (
                    <TRow key={user._id}>
                        <TableCell>{i+1}</TableCell>
                        <TableCell>{user.firstname}</TableCell>
                        <TableCell>{user.lastname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell sx={{display:"flex", gap:"10px"}}>
                            <Button variant="contained" color="success" startIcon={<EditIcon />}  component={Link} to={`/admin/manageUsers/EditUser/${user._id}`}>Edit</Button>
                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => deleteUser(user._id)}>Delete</Button> 
                        </TableCell>
                    </TRow>
                ))}
                </TableBody>
        </StyledTable>
    )

                }
export default AllUsers;