import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Typography, TextField, Grid, Button, Stack, Alert } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

const secondary = createTheme({
    palette: {
      primary: {
        main: '#FABC1D'
      },
    },
  });

const Register = () => {
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [activeError, setActiveError] = useState(false)

    const navigate = useNavigate()

    const validateInput = () => {
        let at = email.indexOf("@");
        let dots = email.lastIndexOf(".");
        
        if (at < 1 || dots < at + 2 || dots + 2 >= email.length) {
            setErrorMessage('Please input valid email')
            setActiveError(true)
        } else if (password.length > 16 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,16}$/.test(password)) {
            setErrorMessage('Password contain 8-16 character, uppercase and lowercase, number and special character')
            setActiveError(true)
        } else if (password !== confirmPassword) {
            setErrorMessage('Password did not match')
            setActiveError(true)
        } else {
            //navigasi ke halaman success register setelah melalui validasi form input
            navigate('/success-register')
        }
    }

    return (
        <div>
            <Navbar/>
            <Grid sx={{mt:{md:10, xs:7}}} container>
                <Grid md={3} xs={1}></Grid>
                <Grid md={6} xs={10}>
                    <Typography variant='h5'>
                        Are you ready to become a professional cheff?
                    </Typography>
                    <Typography sx={{pt:1}}>
                        Please register first
                    </Typography>
                    <form>
                        <TextField sx={{mt:3}} fullWidth id="outlined-basic" label="Name" variant="outlined" type='text' value={nama} 
                        onChange={(e) => setNama(e.target.value)}/>
                        <TextField sx={{mt:3}} fullWidth id="outlined-basic" label="Email" variant="outlined" type='email' value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                        <TextField sx={{mt:3}} fullWidth id="outlined-password-input" label="Password" type="password" variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}/>
                        <TextField sx={{mt:3}} fullWidth id="outlined-confirm-password-input" label="Confirm Password" type="password" variant="outlined"
                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                        {activeError && 
                        <Alert sx={{mt:3}} severity='error'>{errorMessage}</Alert>}
                    </form>
                    <Stack direction="row" justifyContent={{lg:"flex-end", xs:"center"}}>
                        <ThemeProvider theme={secondary} >
                            <Button sx={{mt:4, px:4, borderRadius:2}} variant='contained' onClick={validateInput}>Sign up</Button>
                        </ThemeProvider>
                    </Stack>
                    <Typography sx={{mt:{md:7, xs:5}}} align='center'>
                        Have account?
                        <Link to='/login' style={{textDecoration:'none', color:'#2F80ED'}}> Login here</Link>
                    </Typography>
                </Grid>
            </Grid>
        </div>    
    )
}

export default Register