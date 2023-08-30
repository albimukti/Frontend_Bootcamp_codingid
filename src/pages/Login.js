import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Typography, TextField, Grid, Button, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Login = () => {
  const secondary = createTheme({
    palette: {
      primary: {
        main: '#FABC1D'
      },
    },
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLogin = () => {
    // Simulate login logic (in this case, just log the login data)
    console.log('Login Data:', loginData);
    // You can add more logic here to handle the actual login process.
  };

  return (
    <div>
      <Navbar />
      <Grid sx={{ mt: 10 }} container>
        <Grid xs={3}></Grid>
        <Grid xs={6} xsOffset={3}>
          <Typography variant='h5'>
            Welcome back!
          </Typography>
          <Typography sx={{ pt: 1 }}>
            Please login to your account
          </Typography>
          <form>
            <TextField
              sx={{ mt: 3 }}
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type='email'
              name="email"
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleInputChange}
            />
          </form>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
            <ThemeProvider theme={secondary}>
              <Button
                sx={{ px: 4, borderRadius: 2 }}
                variant='contained'
                onClick={handleLogin}
              >
                Login
              </Button>
            </ThemeProvider>
            <Link to='/forgotpassword' style={{ textDecoration: 'none', color: '#2F80ED' }}>Forgot Password?</Link>
          </Stack>
          <Typography sx={{ mt: 7 }} align='center'>
            Don't have an account?
            <Link to='/register' style={{ textDecoration: 'none', color: '#2F80ED' }}> Sign up here</Link>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
