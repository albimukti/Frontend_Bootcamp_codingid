import React from 'react';
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
            <TextField sx={{ mt: 3 }} fullWidth id="outlined-basic" label="Email" variant="outlined" type='email' />
            <TextField sx={{ mt: 3 }} fullWidth id="outlined-password-input" label="Password" type="password" variant="outlined" />
          </form>
          <Stack direction="row" justifyContent="flex-end">
            <ThemeProvider theme={secondary} >
              <Button sx={{ mt: 4, px: 4, borderRadius: 2 }} variant='contained'>Login</Button>
            </ThemeProvider>
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
