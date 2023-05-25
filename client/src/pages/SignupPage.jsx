import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import jwt_decode from "jwt-decode";
import cookie from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Copyright() {
	return (
	  <Typography variant="body2" color="text.secondary" align="center">
		{'Copyright © '}
		<Link color="inherit" href="https://mui.com/">
		  Your Website
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  }
  
  const theme = createTheme();
  
  const Signup = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({
	  firstName: "",
	  lastName: "",
	  email: "",
	  password: "",
	});
	const [error, setError] = useState("");
	
	const handleChange = (e) => {
	  const { name, value } = e.target;
	  setData(prevData => ({ ...prevData, [name]: value }));
	};
  
	useEffect(() => {
	  const token = cookie.get("jwt");
	  if (token) {
		const decodedToken = jwt_decode(token);
		console.log(decodedToken.userRole);
		setTimeout(() => {
		  if (decodedToken.userRole === "admin") {
			navigate("/admin");
		  } else if (decodedToken.userRole === "technician") {
			navigate("/technician");
		  } else if (decodedToken.userRole === "moderator") {
			navigate("/moderator");
		  } else {
			navigate("/signup");
		  }
		}, 0);
	  } else {
		navigate('/signup');
	  }
	}, [navigate]);
  
	const handleSubmit = async (e) => {
	  e.preventDefault();
	  try {
		const url = "http://localhost:3000/api/auth/signup";
		const response = await axios.post(url, data);
		navigate("/login");
		console.log(response.data.message);
	  } catch (error) {
		if (error.response && error.response.status >= 400 && error.response.status <= 500) {
		  setError(error.response.data.message);
		}
	  }
	};
	console.log(data)
	return (
	  <ThemeProvider theme={theme}>
		<Container component="main" maxWidth="xs">
		  <CssBaseline />
		  <Box
			sx={{
			  marginTop: 8,
			  display: 'flex',
			  flexDirection: 'column',
			  alignItems: 'center',
			}}
		  >
			<Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
			  <LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
			  Sign up
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
			  <Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
				  <TextField
					autoComplete="given-name"
					name="firstName"
					onChange={handleChange}
					required
					fullWidth
					id="firstName"
					label="First Name"
					autoFocus
				  />
				</Grid>
				<Grid item xs={12} sm={6}>
				  <TextField
					required
					fullWidth
					id="lastName"
					label="Last Name"
					name="lastName"
					onChange={handleChange}
					autoComplete="family-name"
				  />
				</Grid>
				<Grid item xs={12}>
				  <TextField
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					onChange={handleChange}
					autoComplete="email"
				  />
				</Grid>
				<Grid item xs={12}>
				  <TextField
					required
					fullWidth
					name="password"
					onChange={handleChange}
					label="Password"
					type="password"
					id="password"
					autoComplete="new-password"
				  />
				</Grid>
			  </Grid>
			  <Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			  >
				Sign Up
			  </Button>
			  <Grid container justifyContent="flex-end">
				<Grid item>
				  <Link href="/login" variant="body2">
					{"Already have an account? Sign in"}
				  </Link>
				</Grid>
			  </Grid>
			</Box>
		  </Box>
		  <Box mt={5}>
			<Copyright />
		  </Box>
		</Container>
	  </ThemeProvider>
	);
  };
  
  export default Signup;

