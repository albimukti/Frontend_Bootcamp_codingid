import React, { useState } from 'react'
import { Typography, TextField, Grid, Button, Stack, Alert, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

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
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)

    const validateInput = () => {
        let at = email.indexOf("@");
        let dots = email.lastIndexOf(".");
        
        if (at < 1 || dots < at + 2 || dots + 2 >= email.length) {
            setErrorMessage('Please input valid email')
        } else if (password.length > 16 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,16}$/.test(password)) {
            setErrorMessage('Password contain 8-16 character, uppercase and lowercase, number and special character')
        } else if (password !== confirmPassword) {
            setErrorMessage('Password did not match')
        } else {
            handleRegister()
        }
    }

    const handleRegister = () => {
        setLoading(true)
        axios.post(process.env.REACT_APP_API_URL + '/User/CreateUser', {
            name: nama,
            email: email,
            password: password,
            role: "User",
            isActivated: false
        })
        .then(res => {
            if (res.status === 201) {
                setLoading(false)
                setErrorMessage('')
                setOpen(true)
            }
        })
        .catch(error => {
            if (error.response.status !== 200){
                setLoading(false)
                setErrorMessage(error.response.data)
            }
        })
        
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Grid sx={{mt:{md:10, xs:7}}} container>
                <Grid item md={3} xs={1}></Grid>
                <Grid item md={6} xs={10}>
                    <Typography variant='h5'>
                        Are you ready to become a professional cheff?
                    </Typography>
                    <Typography sx={{pt:1}}>
                        Please register first
                    </Typography>
                    <Box>
                        <TextField sx={{mt:3}} fullWidth id="outlined-name-input" label="Name" variant="outlined" type='text' value={nama} 
                        onChange={(e) => setNama(e.target.value)} />

                        <TextField sx={{mt:3}} fullWidth id="outlined-email-input" label="Email" variant="outlined" type='email' value={email}
                        onChange={(e) => setEmail(e.target.value)} />

                        <TextField sx={{mt:3}} fullWidth id="outlined-password-input" label="Password" type="password" variant="outlined"
                        onChange={(e) => setPassword(e.target.value)} />

                        <TextField sx={{mt:3}} fullWidth id="outlined-confirm-password-input" label="Confirm Password" type="password" variant="outlined"
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                        
                        {errorMessage && 
                            (<Alert sx={{ mt: 3 }} severity="error">{errorMessage}</Alert>
                        )}

                    </Box>
                    <Stack direction="row" justifyContent={{lg:"flex-end", xs:"center"}}>
                        <ThemeProvider theme={secondary} >
                            <Button sx={{mt:4, px:4, borderRadius:2}} variant='contained' onClick={validateInput}>Sign up</Button>
                        </ThemeProvider>
                    </Stack>
                    <Typography sx={{mt:{md:3, xs:2}}} align='center'>
                        Have account?
                        <Link to='/login' style={{textDecoration:'none', color:'#2F80ED'}}> Login here</Link>
                    </Typography>
                </Grid>
            </Grid>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent:'center' }}>
                    <CircularProgress />
                </Box>
            )}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Successfully Register"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please Check Your Email for Activate Account 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>    
    )
}

export default Register