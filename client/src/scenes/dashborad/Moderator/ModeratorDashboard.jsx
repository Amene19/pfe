
import Topbar from "../../global/Topbar";
import ModeratorSidebar from "./ModeratorSidebar";
import "./ModeratorDashboard.css";
import { Route, Routes } from "react-router-dom";
import ModeratorContent from "./ModeratorContent";
import { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';

import { Grid, Paper, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Box  } from '@mui/material';

import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import cookie from "js-cookie"
import jwt_decode from "jwt-decode"

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  chartContainer: {
    height: 400,
    marginTop: theme.spacing(2),
  },
}));

const chartData = [
  { name: 'Dec', users: 400, reports: 240, companies: 600 },
  { name: 'Jav', users: 300, reports: 456, companies: 800 },
  { name: 'Feb', users: 800, reports: 589, companies: 900 },
  { name: 'Mar', users: 800, reports: 589, companies: 900 },
  { name: 'Apr', users: 800, reports: 589, companies: 900 },
  { name: 'May', users: 800, reports: 589, companies: 900 },

  // Add more data here
];

const ModeratorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const [numbers, setNumbers] = useState({})
  const [missions, setMissions] = useState([])
  const [companies, setCompanies] = useState([])
  const token = cookie.get("jwt");
  const decodedToken = jwt_decode(token);
  const id = decodedToken.userId
  const data = [
    { name: 'Jan', companies: 10, reports: 15, users: 20 },
    { name: 'Feb', companies: 8, reports: 12, users: 18 },
    { name: 'Mar', companies: 15, reports: 10, users: 22 },
    // Add more data here
  ];
  useEffect(() => {
    getNumbers();
    getAllMissions()
    getAllCompanies()

}, []);

useEffect(()=> {
  fill();
}, [companies])

const [data2, setData2] = useState([]);

  const fill = () => {
    let data = [
      { name: 'Dec' },
      { name: 'Jan' },
      { name: 'Feb' },
      { name: 'Mar' },
      { name: 'Apr' },
      { name: 'May' }
    ];

    companies.map((company) => {
      data[0][company.name] = company.lastSixMonth[0];
      data[1][company.name] = company.lastSixMonth[1];
      data[2][company.name] = company.lastSixMonth[2];
      data[3][company.name] = company.lastSixMonth[3];
      data[4][company.name] = company.lastSixMonth[4];
      data[5][company.name] = company.lastSixMonth[5];
    });

    setData2(data);
  };



const getAllCompanies = async () => {
  try {
      const response = await axios.get(`http://localhost:3000/api/dashboard/mederator/manageReports/allCompanies`,{ withCredentials: true });
      const data = response.data.company
      setCompanies(data);
  } catch (error) {
      console.log(error);
  };
  
}

  const getNumbers = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/dashboard/mederator/manageReports/total`, { withCredentials: true });
        const data = response.data
        setNumbers(data);
    } catch (error) {
        console.log(error);
    };

}


  

    const getAllMissions = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/dashboard/moderator/manageMissions/userMissions/${id}`, { withCredentials: true });
            const data = response.data.missions
            setMissions(data);
        } catch (error) {
            console.log(error);
        };

    }

    const lineColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8c564b'];

  const toggleSidebar = (isExpanded) => {
    setIsOpen(isExpanded);
  };
  const isModeratorPath = location.pathname === '/moderator';

  return (
    <div className={`moderator-dashboard-container ${isOpen ? 'sidebar-open' : ''}`}>
      <ModeratorSidebar isExpanded={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`moderator-dashboard-main ${isOpen ? 'moderator-dashboard-main sidebar-open' : ''}`}>
        <div className="fl"><Topbar /></div>
        <div className={`fl moderator-content-container `}>
          { isModeratorPath && (<div className={classes.root}>
            <Typography variant="h2" className={classes.header} style={{ paddingBottom: "20px" }}>
              Moderator Dashboard
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <BusinessIcon sx={{ fontSize: '2rem', mr: 1 }} />
                    <Typography variant="h6">Companies</Typography>
                  </Box>
                  <Typography variant="h4">{numbers.companies}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DescriptionIcon sx={{ fontSize: '2rem', mr: 1 }} />
                    <Typography variant="h6">Reports</Typography>
                  </Box>
                  <Typography variant="h4">{numbers.reports}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PeopleAltIcon sx={{ fontSize: '2rem', mr: 1 }} />
                    <Typography variant="h6">Users</Typography>
                  </Box>
                  <Typography variant="h4">{numbers.users}</Typography>
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex" }}>
              <div className={classes.chartContainer}>
                <BarChart width={600} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="companies" fill="#8884d8" />
                  <Bar dataKey="reports" fill="#82ca9d" />
                  <Bar dataKey="users" fill="#ffc658" />
                </BarChart>
              </div>
              <div className={classes.chartContainer}>
  {data2 && data2[0] && (
    <LineChart width={600} height={300} data={data2}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(data2[0]).slice(1).map((key, index) => (
        <Line
          key={key}
          type="monotone"
          dataKey={key}
          stroke={lineColors[index % lineColors.length]}
        />
      ))}
    </LineChart>
  )}
</div>
            </Box>
            <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h3">Tasks</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="h4">Mission</Typography></TableCell>
                    <TableCell><Typography variant="h4">Target</Typography></TableCell>
                    <TableCell><Typography variant="h4">Deadline</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {missions?.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell>{task.missionTitle}</TableCell>
                      <TableCell>{task.target}</TableCell>
                      <TableCell>{task.deadline}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      
      
          </div>)}
          <Routes>
            <Route path="/*" element={<ModeratorContent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default ModeratorDashboard