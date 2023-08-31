import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Typography, TextField, Stack, Button, Box, AlertTitle, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const primary = createTheme({
        palette: {
            primary: {
                main: '#5B4947'
            },
        },
    });
    
    const secondary = createTheme({
        palette: {
            primary: {
                main: '#FABC1D'
            },
        },
    });

    const [email, setEmail] = useState('')
    const [invalid, setInvalid] = useState('hidden')
    const navigate = useNavigate()

    const emailValidate = () => {
        let at = email.indexOf("@");
        let dots = email.lastIndexOf(".");
        
        if (at < 1 || dots < at + 2 || dots + 2 >= email.length) {
            setInvalid('visible')
        } else {
            navigate('/forgot-password')
        }
    }

    return (
        <div>
            <Navbar/>
            <Grid sx={{mt:10}} container>
                <Grid md={3} xs={1}></Grid>
                <Grid md={6} xs={10}>
                    <Typography variant='h5'>
                        Reset Password
                    </Typography>
                    <Typography sx={{pt:1}}>
                        Send OTP code to your email address
                    </Typography>
                    <Box sx={{mt:2}}>
                        <TextField sx={{mt:3}} fullWidth id="outlined-basic" label="Email" variant="outlined" type='email' 
                        value={email} onChange={(e) => setEmail(e.target.value)} /> 
                        <Alert severity='error' sx={{mt: 1, visibility:invalid}}>
                            Email is not Valid
                        </Alert>
                    </Box>
                    <Stack direction="row" spacing={3} justifyContent={{lg:"flex-end", xs:"center"}}>
                        <ThemeProvider theme={primary}>
                            <Link to='/'>
                                <Button sx={{mt:2, px:4, borderRadius:2}} variant='outlined' style={{color:primary}}>Cancel</Button>
                            </Link>
                        </ThemeProvider>
                        <ThemeProvider theme={secondary} >
                            <Box>
                                <Button sx={{mt:2, px:4, borderRadius:2}} variant='contained' onClick={emailValidate}>Submit</Button>
                            </Box>
                        </ThemeProvider>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export default ResetPassword