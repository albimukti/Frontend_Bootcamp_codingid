import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Typography, TextField, Grid, Button, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Register = () => {
  const secondary = createTheme({
    palette: {
      primary: {
        main: '#FABC1D'
      },
    },
  });

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignup = () => {
    // Simulate saving the data to a "database" (in this case, just log the data)
    console.log('Registered User Data:', userData);
    // You can add more logic here to perform actions like sending data to a server.
  };

  return (
    <div>
      <Navbar />
      <Grid sx={{ mt: 10 }} container>
        <Grid xs={3}></Grid>
        <Grid xs={6} xsOffset={3}>
          <Typography variant='h5'>
            Are you ready to become a professional chef?
          </Typography>
          <Typography sx={{ pt: 1 }}>
            Please register first
          </Typography>
          <form>
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              id="outlined-basic"
              label="Name"
              variant="outlined"
              type='text'
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type='email'
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              id="outlined-password-input"
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
            />
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              variant="outlined"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleInputChange}
            />
          </form>
          <Stack direction="row" justifyContent="flex-end">
            <ThemeProvider theme={secondary}>
              <Button
                sx={{ mt: 4, px: 4, borderRadius: 2 }}
                variant='contained'
                onClick={handleSignup}
              >
                Signup
              </Button>
            </ThemeProvider>
          </Stack>
          <Typography sx={{ mt: 7 }} align='center'>
            Have an account?
            <Link to='/login' style={{ textDecoration: 'none', color: '#2F80ED' }}> Login here</Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
