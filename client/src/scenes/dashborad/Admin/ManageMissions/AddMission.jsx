import styled from "@mui/material/styles/styled";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SendIcon from '@mui/icons-material/Send';
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Avatar,
  Table, TableHead, TableRow, TableCell, TableBody
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'



const AddMission = () => {
  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([])
  const [companies, setCompanies] = useState([])
  const [companiesName, setCompaniesName] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllUsers();
    getAllCompanies()
  }, []);

  useEffect(() => {
    fillEmails();
  }, [users])


  useEffect(() => {
    fillCompaniesName()
  }, [companies])

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/dashboard/admin/usersList`, { withCredentials: true });
      const data = response.data.user2
      setUsers(data);
    } catch (error) {
      console.log(error);
    };

  }
  const getAllCompanies = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/dashboard/admin/manageCompanies/allCompanies`,{ withCredentials: true });
        const data = response.data.company
        setCompanies(data);
    } catch (error) {
        console.log(error);
    };
    
}
  
  const fillEmails = () => {
    let arr = []
    users.map((user) => {
      arr.push(user.email)
    })
    setEmails(arr)
  }

  const fillCompaniesName = () => {
    let arr = []
    companies.map((company) => {
      arr.push(company.name)
    })
    setCompaniesName(arr)
  }

  const [mission, setMission] = useState({
    missionTitle: "",
    assignee: '',
    deadline: "2022-05-01",
    target: ""
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMission((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all fields have a truthy value

    const formData = {
      assignee: mission.assignee , deadline: mission.deadline, missionTitle: mission.missionTitle, target: mission.target
    };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/dashboard/admin/manageMissions/add",
        formData,
        { withCredentials: true }
      );
      Swal.fire(
        'Good job!',
        'Mission added!',
        'success'
      )
      navigate("/admin/manageMissions");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  console.log(mission)
  return (
    <Box component="form" sx={{ padding: "50px" }}>
      <CustomButton
        variant="outlined"
        sx={{ width: "100px", marginLeft:"-100px" }}
        startIcon={<ArrowBackIosIcon />}
        component={Link}
        to={`/admin/manageMissions`}
      >
        {" "}
        Back
      </CustomButton>
      <h1>Add New Mission</h1>
      <Box>
        <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px", paddingTop: "20px" }}>
          <InputLabel id="MissionTitle">Mission Title:</InputLabel>
          <div style={{ paddingLeft: "81px" }}>
            <CustomSelect
              sx={{ width: "150px" }}
              name="missionTitle"
              labelId="MissionTitle"
              id="missionTitle"
              value={mission.missionTitle}
              onChange={handleChange}

            >
              <MenuItem value="Collect Data">Collect Data</MenuItem >
              <MenuItem value="Submit Report">Submit Report</MenuItem >
              <MenuItem value="Validation of Report">Validation of Report</MenuItem >
              
            </CustomSelect>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px", paddingTop: "20px" }}>
          <InputLabel id="Assignee">Assignee:</InputLabel>
          <div style={{ paddingLeft: "81px", marginLeft: "19px"  }}>
          <CustomSelect
            sx={{ width: "150px" }}
            name="assignee"
            labelId="Assignee"

            id="assignee"
            value={mission.assignee}
            onChange={handleChange}

          >
             {emails?.map(e => (
                                <MenuItem key={e} value={e}>{e}</MenuItem>
                            ))}
          </CustomSelect>
        </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", paddingLeft: "10px", paddingTop: "20px" }}>
          <InputLabel id="Target">Target:</InputLabel>
          <div style={{ paddingLeft: "81px" }}>
        <CustomSelect
          sx={{ width: "150px", marginLeft: "38px" }}
          name="target"
          labelId="Target"

          id="target"
          value={mission.target}
          onChange={handleChange}

        >
           {companiesName?.map(e => (
                                <MenuItem key={e} value={e}>{e}</MenuItem>
                            ))}
        </CustomSelect>
        </div>
        </div>
        <CustomTextField
          margin="normal"
          required
          fullWidth
          name="deadline"
          label="Deadline"
          type="date"
          id="deadline"
          value={mission.deadline}
          onChange={handleChange}
        />
      </Box>
      <div style={{display : "flex", justifyContent: "end"}}>
      <CustomButton variant="contained" endIcon={<SendIcon />}  onClick={handleSubmit}>
         {loading ? "Loading..." : "Add Mission"}
        </CustomButton>
      </div>
    </Box >
  )
  
}

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
  height: 30,
  padding: "0 30px",
});

export default AddMission