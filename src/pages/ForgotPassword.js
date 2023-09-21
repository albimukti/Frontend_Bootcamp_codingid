import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Typography, TextField, Stack, Button, Box, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {

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
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleForgotPassword = () => {
        if (errorMessage === '') {
            setErrorMessage('Email is Empty')
        } else {
            axios.post(`${process.env.REACT_APP_API_URL}/User/ForgetPassword?email=${email}`)
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {
                    alert("Please check your email for reset password")
                }
            }).catch(error => {
                console.log(error.response.status);
                if (error.response.status !== 200){
                    setErrorMessage(error.response.data)
                }
            })
        }
    }

    return (
        <div>
            <Grid sx={{mt:{md:7, xs:5}}} container>
                <Grid item md={3} xs={1}></Grid>
                <Grid item md={6} xs={10}>
                    <Typography variant='h5'>
                        Forgot Password
                    </Typography>
                    <Typography sx={{pt:1}}>
                        Send OTP code to your email address
                    </Typography>
                    <Box>
                        <TextField sx={{mt:3}} fullWidth id="outlined-basic" label="Email" variant="outlined" type='email' 
                        value={email} onChange={(e) => setEmail(e.target.value)} /> 
                        {errorMessage && (<Alert severity='error' sx={{mt: 1}}>
                            {errorMessage}
                        </Alert>)}
                    </Box>
                    <Stack direction="row" spacing={3} justifyContent={{lg:"flex-end", xs:"center"}}>
                        <ThemeProvider theme={primary}>
                            <Link to='/'>
                                <Button sx={{mt:2, px:4, borderRadius:2}} variant='outlined' style={{color:primary}}>Cancel</Button>
                            </Link>
                        </ThemeProvider>
                        <ThemeProvider theme={secondary} >
                            <Box>
                                <Button sx={{mt:2, px:4, borderRadius:2}} variant='contained' onClick={handleForgotPassword}>Submit</Button>
                            </Box>
                        </ThemeProvider>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export default ForgotPassword