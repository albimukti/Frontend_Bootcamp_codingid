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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);    
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        if (!email.includes('albimukti97@gmail.com')) {
            setErrorMessage('Email yang anda masukkan salah!');
            return; 
        }

        if (email === 'albimukti97@gmail.com' && password === 'albi123' ) {
            window.location.href = 'http://localhost:3000';
        } else {
            setErrorMessage('Email atau kata sandi salah. Silakan coba lagi.');
        }
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <Navbar />
            <Grid sx={{ mt: 10 }} container>
                <Grid md={3} xs={1}></Grid>
                <Grid md={6} mdOffset={3} xs={10}>
                    <Typography variant='h5'>
                        Welcome Back! Cheff
                    </Typography>
                    <Typography sx={{ pt: 1 }}>
                        Please login first
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
                        <Link to='/reset-password' style={{ textDecoration: 'none', color: '#2F80ED' }}> Click here</Link>
                    </Typography>
                    <Stack direction="row" justifyContent={{ lg: "flex-end", xs: "center" }}>
                        <ThemeProvider theme={secondary}>
                            <Button sx={{ mt: 4, px: 4, borderRadius: 2 }} variant='contained' onClick={handleLogin}>Login</Button>
                        </ThemeProvider>
                    </Stack>
                    <Typography sx={{ mt: 7 }} align='center'>
                        Don't have an account?
                        <Link to='/register' style={{ textDecoration: 'none', color: '#2F80ED' }}> Sign Up here</Link>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
