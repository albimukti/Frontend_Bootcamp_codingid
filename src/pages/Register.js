import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Typography, TextField, Grid, Button, Stack, Alert } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmError, setConfirmError] = useState(false)

    const validateAll = () => {
        emailValidate()
        validatePassword()
        validateConfirmPassword()
    }

    const emailValidate = () => {
        let at = email.indexOf("@");
        let dots = email.lastIndexOf(".");
        
        if (at < 1 || dots < at + 2 || dots + 2 >= email.length) {
            setEmailError(true)
            return false
        }
    }

    const validatePassword = () => {
        if (password.length > 16 || !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
            setPasswordError(true)
            return false
        }
    };

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmError(true)
            return false
        }
    }

    return (
        <div>
            <Navbar/>
            <Grid sx={{mt:10}} container>
                <Grid md={3} xs={1}></Grid>
                <Grid md={6} mdOffset={3} xs={10}>
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
                        {emailError && 
                        <Alert severity='error'>Email is not Valid</Alert>}
                        <TextField sx={{mt:3}} fullWidth id="outlined-password-input" label="Password" type="password" variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}/>
                        {passwordError && 
                        <Alert severity='error'>Password must have 8-16 character, at least one uppercase, number and special character</Alert>}
                        <TextField sx={{mt:3}} fullWidth id="outlined-confirm-password-input" label="Confirm Password" type="password" variant="outlined"
                        onChange={(e) => setConfirmPassword(e.target.value)}/>
                        {confirmError && 
                        <Alert severity='error'>Password did not match</Alert>}
                    </form>
                    <Stack direction="row" justifyContent={{lg:"flex-end", xs:"center"}}>
                        <ThemeProvider theme={secondary} >
                            <Button sx={{mt:4, px:4, borderRadius:2}} variant='contained' onClick={validateAll}>Sign up</Button>
                        </ThemeProvider>
                    </Stack>
                    <Typography sx={{mt:3}} align='center'>
                        Have account?
                        <Link to='/login' style={{textDecoration:'none', color:'#2F80ED'}}> Login here</Link>
                    </Typography>
                    
                </Grid>
            </Grid>
        </div>    
    )
}

export default Register