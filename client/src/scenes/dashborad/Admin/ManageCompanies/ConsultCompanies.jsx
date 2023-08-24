import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import defaultCompanyImage from "../../../../assets/companyIcon.png";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'


const ConsultCompanies = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    getAllCompanies();
}, []);



const getAllCompanies = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/dashboard/admin/manageCompanies/allCompanies`,{ withCredentials: true });
        const data = response.data.company
        setCompanies(data);
    } catch (error) {
        console.log(error);
    };
    
}

console.log("hello")



const deleteCompany = async (id) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      await axios.delete(`http://localhost:3000/api/dashboard/admin/manageCompanies/delete/${id}`, {
        withCredentials: true
      });

      getAllCompanies(); // Assuming this is a function to fetch and update the company list

      Swal.fire(
        'Deleted!',
        'Campany has been deleted.',
        'success'
      );
    }
  } catch (error) {
    console.log(error);
  }
};




console.log(companies)
  return (
    <Box sx={{display: "flex", flexWrap:"wrap", gap:"40px", padding:"20px", justifyContent:"center"}}>
         {companies.map((company, i) => (
            <Card key={company._id} sx={{ maxWidth: 345}}>
            <Box sx={{display:"flex", justifyContent:"center", paddingTop:"10px"}}>
            
            <CardMedia
              component="img"
              sx={{ width: 120}}
              alt="green iguana"
              height="120"
              image={company.image.url}
            />
            </Box>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {company.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
               <b>Location: {company.address}</b>
              
              </Typography>
              <Typography variant="body2" color="text.secondary">
              <b>Nature of Business: {company.natureOfBusiness}</b>
              </Typography>
            </CardContent>
            <CardActions sx={{display:"flex", justifyContent:"center"}}>
            
            <CustomButton
              variant="outlined"
              startIcon={<ContentPasteSearchIcon />}
              sx={{ width: "100px" }}
              component={Link} to={`/admin/manageCompanies/${company._id}`}
            >
              {" "}
              Details
              
            </CustomButton>
            <Button
              variant="outlined"
              color="success"
              startIcon={<EditIcon />}
              sx={{ width: "100px", marginRight:"6px" }}
              component={Link} to={`/admin/manageCompanies/edit/${company._id}`}
            >
              {" "}
              Edit
            </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                sx={{ width: "100px" }}
                onClick={() => deleteCompany(company._id)}
              >
                {" "}
                Delete
              </Button>
            </CardActions>

          </Card>
          ))}
        </Box>
  )
};

export default ConsultCompanies;


const CustomButton = styled(Button)({
    background: "#118ab2",
    border: 0,
    color: "white",
    
  });
