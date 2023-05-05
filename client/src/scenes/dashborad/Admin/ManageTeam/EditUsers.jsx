import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styled from "@mui/material/styles/styled";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CustomTextField = styled(TextField)({
  "& fieldset": {
    borderColor: "#66B2FF !important",
  },
  "& input:focus + fieldset": {
    borderColor: "#66B2FF !important",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important",
  },
});

const CustomSelect = styled(Select)({
  "& fieldset": {
    borderColor: "#66B2FF !important",
  },
  "& input:focus + fieldset": {
    borderColor: "#66B2FF !important",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 2,
  },
  "& input:valid:focus + fieldset": {
    borderLeftWidth: 6,
    padding: "4px !important",
  },
});

const CustomButton = styled(Button)({
  background: "#118ab2",
  border: 0,
  borderRadius: 10,
  color: "white",
  height: 48,
  padding: "0 30px",
});

const EditUser = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const loadUserDetails = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/dashboard/admin/getUser/${id}`,
      { withCredentials: true }
    );
    return response.data;
  };

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    approved: true,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const { firstname, lastname, email, password, approved, role } = values;
      const userData = {
        firstname,
        lastname,
        email,
        password,
        role: role,
        approved: approved,
      };
      try {
        const response = await axios.put(
          `http://localhost:3000/api/dashboard/admin/editUser/${id}`,
          userData,
          { withCredentials: true }
        );

        navigate("/admin/manageUsers");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const isDataLoaded = useRef(false); // flag to keep track of whether the data is loaded or not

  useEffect(() => {
    if (!isDataLoaded.current) {
      // only load data if it hasn't been loaded yet
      loadUserDetails()
        .then((data) => {
          setUser(data);
          formik.setValues({
            firstname: data?.firstname || "",
            lastname: data?.lastname || "",
            email: data?.email || "",
            role: data?.role || "",
            approved: data?.approved || "",
          });
          console.log("useEffect");
          setLoading(false);
          isDataLoaded.current = true; // set flag to true once data is loaded
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [formik]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box component="form">
      <div>
        <h1>Edit user</h1>
        <CustomTextField
          margin="normal"
          fullWidth
          name="firstname"
          label="First Name"
          type="text"
          id="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
        />
        <CustomTextField
          margin="normal"
          fullWidth
          name="lastname"
          label="Last Name"
          type="text"
          id="fastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
        />
        <CustomTextField
          margin="normal"
          fullWidth
          name="email"
          label="Email"
          type="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <CustomTextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
            paddingTop: "20px",
          }}
        >
          <InputLabel id="demo-simple-select-label-approve">
            Approved:
          </InputLabel>
          <div style={{ paddingLeft: "50px" }}>
            <CustomSelect
              sx={{ width: "150px" }}
              labelId="demo-simple-select-label-approve"
              id="demo-simple-select-approve"
              name="approved"
              value={formik.values.approved}
              onChange={formik.handleChange}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </CustomSelect>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
            paddingTop: "20px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Role:</InputLabel>
          <div style={{ paddingLeft: "81px" }}>
            <CustomSelect
              sx={{ width: "150px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="technician">technician</MenuItem>
              <MenuItem value="moderator">Moderator</MenuItem>
            </CustomSelect>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <CustomButton
            variant="contained"
            endIcon={<SendIcon />}
            onClick={formik.handleSubmit}
          >
            Confirm
          </CustomButton>
        </div>
      </div>
    </Box>
  );
};

export default EditUser;
