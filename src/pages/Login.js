import React from 'react'
import Navbar from '../components/Navbar'
import { Typography, TextField, Grid, Button, Stack } from '@mui/material'
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
            <Navbar/>
            <Grid sx={{mt:10}} container>
                <Grid md={3} xs={1}></Grid>
                <Grid md={6} mdOffset={3} xs={10}>
                    <Typography variant='h5'>
                        Welcome Back! Cheff
                    </Typography>
                    <Typography sx={{pt:1}}>
                        Please login first
                    </Typography>
                    <form>
                        <TextField sx={{mt:3}} fullWidth id="outlined-basic" label="Email" variant="outlined" type='email' />
                        <TextField sx={{mt:3}} fullWidth id="outlined-password-input" label="Password" type="password" variant="outlined"/>
                    </form>
                    <Typography sx={{mt:2}}>
                        Forgot Password?
                        <Link to='/reset-password' style={{textDecoration:'none', color:'#2F80ED'}}> Click here</Link>
                    </Typography>
                    <Stack direction="row" justifyContent={{lg:"flex-end", xs:"center"}}>
                        <ThemeProvider theme={secondary} >
                            <Link to='/'>
                                <Button sx={{mt:4, px:4, borderRadius:2}} variant='contained'>Login</Button>
                            </Link>
                        </ThemeProvider>
                    </Stack>
                    <Typography sx={{mt:7}} align='center'>
                        Dont have account?
                        <Link to='/register' style={{textDecoration:'none', color:'#2F80ED'}}> Sign Up here</Link>
                    </Typography>
                    
                </Grid>
            </Grid>
        </div>    
    )
}

export default Login