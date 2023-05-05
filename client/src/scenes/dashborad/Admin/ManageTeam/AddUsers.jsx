import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import styled from "@mui/material/styles/styled";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const CustomTextField = styled(TextField)({
  '& fieldset': {
    borderColor: '#66B2FF !important',
  },
  '& input:focus + fieldset': {
    borderColor: '#66B2FF !important' ,
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important',
  },
})

const CustomSelect = styled(Select)({
    '& fieldset': {
        borderColor: '#66B2FF !important',
      },
      '& input:focus + fieldset': {
        borderColor: '#66B2FF !important' ,
      },
      '& label.Mui-focused': {
        color: 'white',
      },
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
      '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important',
      },
})

const CustomButton = styled(Button)({
    
    background: '#118ab2',
    border: 0,
    borderRadius: 10, 
    color: 'white',
    height: 48,
    padding: '0 30px',
  });

const AddUsers = () => {
    const navigate = useNavigate()

    const validate = (values) => {
      const errors = {};
          if (!values.firstname) {
            errors.lastname = "Required";
          }
          if (!values.lastname) {
            errors.lastname = "Required";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
    };
    
    const formik = useFormik({
        initialValues: {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          role: "technician"
        },
        onSubmit: async (values) => {
          const { firstname, lastname, email, password, role} = values;
          const userData = { firstname, lastname, email, password, role };
         
          try {
            const response = await axios.post("http://localhost:3000/api/dashboard/admin/addUser", userData,{ withCredentials: true })
             
              navigate('/admin/manageUsers')
            
          } catch (error) {
            formik.errors.email = "Email address already exists"
            console.log(error);
          }
        },
        validate
          
      });
     
   
  return (
    <Box component="form">
      <CustomTextField
        margin="normal"
        required
        fullWidth
        name="firstname"
        label="First Name"
        type="text"
        id="firstname"
        value={formik.values.firstname}
        onChange={formik.handleChange}
        error={formik.touched.firstname && Boolean(formik.errors.firstname)}
        helperText={formik.touched.firstname && formik.errors.firstname}
      />
      <CustomTextField
        margin="normal"
        required
        fullWidth
        name="lastname"
        label="Last Name"
        type="text"
        id="fastname"
        value={formik.values.lastname}
        onChange={formik.handleChange}
        error={formik.touched.lastname && Boolean(formik.errors.lastname)}
        helperText={formik.touched.lastname && formik.errors.lastname}
      />
      <CustomTextField
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email"
        type="email"
        id="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      
      <CustomTextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
         <div style={{display: "flex", alignItems: "center", paddingLeft: "10px", paddingTop: "20px"}}>
        <InputLabel id="demo-simple-select-label">Role:</InputLabel>
        <div style={{paddingLeft:"81px"}}>
        <CustomSelect
          sx={{width:"150px"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          
        >
          <MenuItem value="admin">Admin</MenuItem >
          <MenuItem  value="technician">technician</MenuItem >
          <MenuItem  value="moderator">Moderator</MenuItem >
        </CustomSelect>
        </div>
        </div>
        <div style={{display : "flex", justifyContent: "end"}}>
             <CustomButton variant="contained" endIcon={<SendIcon />} onClick={formik.handleSubmit}>
        Add user
      </CustomButton>
      </div>
     
    </Box>
  );
};

export default AddUsers;
