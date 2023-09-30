import React, { useState } from 'react';
import { Typography, TextField, Grid, Button, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import jwt_decode from "jwt-decode";


const secondary = createTheme({
    palette: {
        primary: {
            main: '#FABC1D'
        },
    },
});

const LoginAdmin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);    
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate ()

    const { login } = useAuth()

    const handleLogin = () => {
        axios.post(process.env.REACT_APP_API_URL + '/User/Login', {
            email: email,
            password: password
        }).then(res => {
            const decode = jwt_decode(res.data.token)
            if (decode.role === 'Admin') {
                login(res.data)
                navigate('/dashboard-admin')
            } else {
                setErrorMessage("You're Not Admin")
            }
        }).catch(error => {
            if (error.response.status !== 200){
                setErrorMessage(error.response.data)
            }
        })
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
          
            <Grid sx={{ mt: 15 }} container>
                <Grid item md={3} xs={1}></Grid>
                <Grid item md={6} xs={10}>
                    <Typography sx={{textAlign:'center'}} variant='h5'>
                        Admin Panel
                    </Typography>
                    <Typography sx={{ pt: 1, textAlign:'center' }}>
                        Please login with admin account
                    </Typography>
                    <form>
                        <TextField
                            sx={{ mt: 3 }}
                            fullWidth
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            sx={{ mt: 3 }}
                            fullWidth
                            id="outlined-password-input"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <Button
                                        onClick={handlePasswordVisibility}
                                        sx={{ p: 0 }}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                ),
                            }}
                        />
                    </form>
                    {errorMessage && (
                        <Typography sx={{ mt: 2, color: 'red' }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <Typography sx={{ mt: 2 }}>
                        Forgot Password?
                        <Link to='/forgot-password' style={{ textDecoration: 'none', color: '#2F80ED' }}> Click here</Link>
                    </Typography>
                    <Stack direction="row" justifyContent='center'>
                        <ThemeProvider theme={secondary}>
                            <Button sx={{ mt: 4, px: 4, borderRadius: 2 }} variant='contained' onClick={handleLogin}>Login</Button>
                        </ThemeProvider>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
};

export default LoginAdmin;
