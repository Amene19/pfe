import * as React from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AllUsers from './AllUsers';
import { Link, Route, Routes} from 'react-router-dom';
import AddUsers from './AddUsers';
import WaitingList from './WaitnigList';
import "./manageTeam.css"
import AddIcon from '@mui/icons-material/Add';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import PersonIcon from '@mui/icons-material/Person';
import EditUser from './EditUsers';

const CustomButton = styled(Button)({
    background: '#118ab2',
    border: 0,
    borderRadius: 10, 
    color: 'white',
    fontWeight: "bold",
    height: 48,
    padding: '0 30px',
    textDecoration: 'none'
  });

const ManageTeam = () => {

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap:"100px"}}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <Link to='/admin/manageUsers'>
                    <CustomButton variant="contained" startIcon={<PersonIcon />} className={window.location.pathname === '/admin/manageUsers' ? 'active' : ''}>All users</CustomButton>
                </Link>
                <Link to='AddUser'>
                    <CustomButton variant="contained" startIcon={<AddIcon />} className={window.location.pathname === '/admin/manageUsers/AddUser' ? 'active' : ''}>Add user</CustomButton>
                </Link>
                <Link to='WaitingList'>
                    <CustomButton variant="contained" startIcon={<HourglassBottomIcon />} className={window.location.pathname === '/admin/manageUsers/WaitingList' ? 'active' : ''}>Waiting List</CustomButton>
                </Link>
            </Stack>
            <div>
            <Routes>
                <Route path='/' element={<AllUsers />}/>
                <Route path='/AddUser' element={<AddUsers />}/>   
                <Route path='/WaitingList' element={<WaitingList />}/>
                <Route path='/EditUser/:id' element={<EditUser />}/>
            </Routes>
            </div>
        </div>
    )
}


export default ManageTeam