import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import defaultCompanyImage from "../../../../assets/companyIcon.png";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const ConsultCompanies = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    getAllCompanies();
}, []);



const getAllCompanies = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/dashboard/mederator/manageReports/allCompanies`,{ withCredentials: true });
        const data = response.data.company
        setCompanies(data);
    } catch (error) {
        console.log(error);
    };
    
}




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
              sx={{ width: "110px" }}
              component={Link} to={`/moderator/manageReports/${company._id}`}
            >
              {" "}
              Details
              
            </CustomButton>
            <Button
              variant="outlined"
              color="success"
              startIcon={<EditIcon />}
              sx={{ width: "120px", marginRight:"6px" }}
            >
              {" "}
              History
            </Button>
            </CardActions>

          </Card>
          ))}
        </Box>
  )
};

const CustomButton = styled(Button)({
    background: "#118ab2",
    border: 0,
    color: "white",
    
  });

export default ConsultCompanies;