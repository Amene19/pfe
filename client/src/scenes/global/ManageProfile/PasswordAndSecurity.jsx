import styled from "@emotion/styled"
import { Box, Button, TextField } from "@mui/material"
import axios from "axios"
import { useFormik } from "formik"
import cookie from "js-cookie"
import jwt_decode from "jwt-decode"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const PasswordAndSecurity = () => {
     const token = cookie.get("jwt");
    const decodedToken = jwt_decode(token);
    const id = decodedToken.userId
    const navigate = useNavigate()

    const [userRole, setUserRole] = useState()

    useEffect(() => {
      if (token) {
        const decodedToken = jwt_decode(token);
        setUserRole(decodedToken.userRole);
      }
      
    }, [token]);

    const initialValues = {currentpassword: "" , newpassword: "", confirmpassword: ""}

   
    const validate = (values) => {
      let errors = {};
  
      if (!values.currentpassword) {
        errors.currentpassword = 'Current password is required';
      }
  
      if (!values.newpassword) {
        errors.newpassword = 'New password is required';
      } else if (values.newpassword.length < 8) {
        errors.newpassword = 'New password must be at least 8 characters long';
      }
  
      if (!values.confirmpassword) {
        errors.confirmpassword = 'Confirm password is required';
      } else if (values.confirmpassword !== values.newpassword) {
        errors.confirmpassword = 'Passwords do not match';
      }
  
      return errors;
    };

    const formik = useFormik({
      initialValues,
        onSubmit: async (values) => {
          const { currentpassword, newpassword, confirmpassword} = values;
          const userData = { currentpassword, newpassword};
          try {
            if (newpassword === confirmpassword) {
              const response = await axios.put(`http://localhost:3000/api/protected/changePassword/${id}`, userData,{ withCredentials: true })
              navigate(`/${userRole}/profile/changePassword`)
            } else {

              formik.errors.submit = "Passwords do not match"
            }
            
            
          } catch (error) {
            formik.errors.currentpassword = "password not correct"
            console.log(error);
          }
        },
        validate
      });



    return (<>
    <h1> Change Your Password</h1>
    <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",     
            justifyContent: "center",
            marginBottom: "400px",
            width: "100%",
            paddingTop: "100px"
          }}
        >
          
          <CustomTextField
            margin="normal"
            required
            fullWidth
            name="currentpassword"
            label="Current Password"
            type="password"
            value={formik.values.currentpassword}
            onChange={formik.handleChange}
          />
          {formik.errors.currentpassword ? <div style={{ color: 'red', fontSize: "12px" }}>{formik.errors.currentpassword}</div> : null}
          <CustomTextField
            margin="normal"
            required
            fullWidth
            name="newpassword"
            label="New Password"
            type="password"
            value={formik.values.newpassword}
            onChange={formik.handleChange}
          />
          {formik.errors.newpassword ? <div style={{ color: 'red', fontSize: "12px" }}>{formik.errors.newpassword}</div> : null}
          <CustomTextField
            margin="normal"
            required
            fullWidth
            name="confirmpassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmpassword ? <div style={{ color: 'red', fontSize: "12px" }}>{formik.errors.confirmpassword}</div> : null}
          
          <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px" }}>
            <CustomButton variant="contained" onClick={formik.handleSubmit}>Save</CustomButton>
          </div>
          {formik.errors.submit ? <div style={{ color: 'red' }}>{formik.errors.submit}</div>: null}
        </Box>
    </>
    
    )
}


export default PasswordAndSecurity


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
  
  
  
  const CustomButton = styled(Button)({
      
      background: '#007bff',
      border: 0,
      borderRadius: 10, 
      color: 'white',
      height: 48,
      padding: '0 30px',
    });


