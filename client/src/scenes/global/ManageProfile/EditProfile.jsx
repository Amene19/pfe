
import styled from "@emotion/styled"
import { Avatar, Box, Button, TextField } from "@mui/material"
import "./manageProfile.css"
import cookie from "js-cookie"
import jwt_decode from "jwt-decode"
import { useEffect, useRef, useState } from "react"
import { useFormik } from "formik"
import axios from "axios"
import { useNavigate } from "react-router-dom"




const EditProfile = () => {
    const token = cookie.get("jwt");
    const decodedToken = jwt_decode(token);
    const id = decodedToken.userId
    const [user, setUser] = useState()
    const navigate = useNavigate()

    const loadUserDetails = async () => {
        const response = await axios.get(`http://localhost:3000/api/protected/profile/${id}`, { withCredentials: true })
        return response.data
    }
    let path = window.location.pathname
    if (window.location.pathname === '/admin/profile') {
      path = '/admin/profile'
    } else if ((window.location.pathname === '/technician/profile')) {
      path = '/technician/profile'
    } else {
      path = '/moderator/profile'
    }
  

    const initialValues = {firstname: "" , lastname: "", email: ""}

    const formik = useFormik({
        initialValues,
          onSubmit: async (values) => {
            const { firstname, lastname, email, image} = values;
            const userData = { firstname, lastname, email, image};
            try {
              const response = await axios.put(`http://localhost:3000/api/protected/edit/${id}`, userData,{ withCredentials: true })
                localStorage.setItem('image', response.data.image.url);
                localStorage.setItem('name', response.data.firstname)
                navigate(path)
              
            } catch (error) {
              console.log(error);
            }
          }
        });

        const isDataLoaded = useRef(false); // flag to keep track of whether the data is loaded or not

        useEffect(() => {
          if (!isDataLoaded.current) { // only load data if it hasn't been loaded yet
            loadUserDetails()
              .then((data) => {
                setUser(data);
                formik.setValues({
                  firstname: data?.firstname || "",
                  lastname: data?.lastname || "",
                  email: data?.email || "",
                  image: data?.image.url || ""
                });
                isDataLoaded.current = true; // set flag to true once data is loaded
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }, [formik]);
    return (
      <>
        <h1>Edit Profile</h1>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            paddingTop: "50px",
            marginBottom: "90px"
          }}
        >
          <Box sx={{ mb: 5 , display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center", gap:"20px"}}>
            <Avatar sx={{ width: 120, height: 120 }} src={formik.values.image}/>
            <label htmlFor="file" className="label-file">Select an image</label>
            <input id="file" className="input-file" type="file" accept="image/"  onChange={(event) => {
                    const file = event.target.files[0]; // get the file object
                    if (file) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onloadend = () => {
                        formik.setFieldValue('image', reader.result);
                        }
                    } else {
                        formik.setFieldValue('image',"");
                    }        
                    
                }}  />
          </Box>
          
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "5%" }}>
            <CustomTextField
              margin="normal"
              fullWidth
              name="firstname"
              label="First Name"
              type="text"
              value={formik.values.firstname}
              onChange={formik.handleChange}
            />
            <CustomTextField
              margin="normal"
              fullWidth
              name="lastname"
              label="Last Name"
              type="text"
              value={formik.values.lastname}
              onChange={formik.handleChange}
            />
          </div>
          <CustomTextField
            margin="normal"
            fullWidth
            name="email"
            label="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <CustomTextField
            margin="normal"
            fullWidth
            name="number"
            label="Contacts Number"
            type="text"
          />
          <CustomTextField
            margin="normal"
            fullWidth
            name="address"
            label="Address"
            type="text"
          />
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "5%" }}>
            <CustomTextField
              margin="normal"
              fullWidth
              name="city"
              label="City"
              type="text"
            />
            <CustomTextField
              margin="normal"
              fullWidth
              name="state"
              label="State"
              type="text"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "10px" }}>
            <CustomButton variant="contained" onClick={formik.handleSubmit}>Save</CustomButton>
          </div>
        </Box>
      </>
    );
  };
  
  export default EditProfile;
  




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