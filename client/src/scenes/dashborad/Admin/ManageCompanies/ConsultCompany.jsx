import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";

const headCells = [
  { id: "companyName", label: "Company name" },
  { id: "totalEmployees", label: "Total Employees" },
  { id: "mleCNSS", label: "Mle. CNSS" },
  { id: "natureOfBusiness", label: "Nature of business" },
  { id: "natureOfRisk", label: "Nature of risk" },
  { id: "boardOfHealthAndSafety", label: "Board of Health and Safety" },
  { id: "creation", label: "Creation" },
];
const ConsultCompany = () => {
  const [company, setCompany] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/dashboard/admin/manageCompanies/getCompany/${id}`,
        { withCredentials: true }
      );
      const data = response.data;
      setCompany(data);
    } catch (error) {
      console.log(error);
    }
  };
  const {
    image,
    name,
    address,
    totalEmployees,
    natureOfBusiness,
    natureOfRisk,
    creationDate,
    outsideBuilding,
    entryAndReception,
    floors,
  } = company;

  console.log(outsideBuilding?.items);
  const formattedDate = new Date(creationDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  console.log(company)

  return (
    <Box
      sx={{
        marginBottom: "100px",
        marginTop:"50px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <CustomButton
          variant="outlined"
          sx={{ width: "100px" }}
          startIcon={<ArrowBackIosIcon />}
          component={Link}
          to={`/admin/manageCompanies`}
        >
          {" "}
          Back
        </CustomButton>
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "30px" }}
      >
        
        {image && (
          <Avatar
            sx={{ width: 200, height: 200, borderRadius: "0" }}
            src={image.url}
          />
        )}
      </Box>
      <Box>
        <h2 style={{ color: "#118ab2" }}>General Informations:</h2>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="company table">
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Company name:{" "}
                </TableCell>
                <TableCell>{name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Address:</TableCell>
                <TableCell>{address}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Total Employees:
                </TableCell>
                <TableCell>{totalEmployees}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Nature of business:
                </TableCell>
                <TableCell>{natureOfBusiness}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Nature of risk:
                </TableCell>
                <TableCell>{natureOfRisk}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Creation:</TableCell>
                <TableCell>{formattedDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <h2 style={{ color: "#118ab2" }}>Outside Building:</h2>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box>
            <h4>Items to be checked</h4>
            <TableContainer sx={{ width: 300 }} component={Paper}>
              <Table aria-label="company table">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Number</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Designation
                    </TableCell>
                  </TableRow>
                  {outsideBuilding?.items.map((item, index) => (
                    <TableRow key={item.title}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.title}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <h4>Fire Extinguisher List</h4>
            <TableContainer sx={{ width: 250 }} component={Paper}>
              <Table aria-label="company table">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                  </TableRow>
                  {outsideBuilding?.fireExtinguishers.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <Box>
        <h2 style={{ color: "#118ab2" }}>Entry And Reception:</h2>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box>
            <h4>Items to be checked</h4>
            <TableContainer sx={{ width: 300 }} component={Paper}>
              <Table aria-label="company table">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Number</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Designation
                    </TableCell>
                  </TableRow>
                  {entryAndReception?.items.map((item, index) => (
                    <TableRow key={item.title}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.title}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <h4>Fire Extinguisher List</h4>
            <TableContainer sx={{ width: 250 }} component={Paper}>
              <Table aria-label="company table">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Type</TableCell>
                  </TableRow>
                  {entryAndReception?.fireExtinguishers.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      {floors?.map((floor) => (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h2 style={{ color: "#118ab2" }}>{floor.name}</h2>
          <Box>
            <h4>Evacuation Plan</h4>
            <Avatar
              sx={{ width: "100%", height: 400, borderRadius: "10px" }}
              src={floor.plan.url}
            />
          </Box>
          <Box>
            <h4>Items to be checked</h4>
            <TableContainer sx={{ width: 650 }} component={Paper}>
              <Table aria-label="company table">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Number</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Designation
                    </TableCell>
                  </TableRow>
                  {floor?.items.map((item, index) => (
                    <TableRow key={item.title}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.title}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          {floor.parts?.map((part) => (
            <Box>
              <h3 style={{ color: "#009688" }}>{`${part.name} Part`}</h3>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Box>
                  <h4>Items to be checked for this part</h4>
                  <TableContainer sx={{ width: 300 }} component={Paper}>
                    <Table aria-label="company table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Number
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Designation
                          </TableCell>
                        </TableRow>
                        {part?.items.map((item, index) => (
                          <TableRow key={item.title}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.title}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box>
                  <h4>Fire Extinguisher List</h4>
                  <TableContainer sx={{ width: 250 }} component={Paper}>
                    <Table aria-label="company table">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Name
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            Type
                          </TableCell>
                        </TableRow>
                        {part?.fireExtinguishers.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.type}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default ConsultCompany;

const CustomButton = styled(Button)({
  background: "#118ab2",
  border: 0,
  color: "white",
});
