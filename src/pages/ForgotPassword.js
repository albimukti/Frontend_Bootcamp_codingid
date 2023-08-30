import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Typography, TextField, Grid, Button, Stack, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleNewPasswordChange = (event) => {
        const newPasswordValue = event.target.value;
        setNewPassword(newPasswordValue);
        validatePassword(newPasswordValue, confirmPassword);
    };

    const handleConfirmPasswordChange = (event) => {
        const confirmPasswordValue = event.target.value;
        setConfirmPassword(confirmPasswordValue);
        validatePassword(newPassword, confirmPasswordValue);
    };

    const validatePassword = (newPwd, confirmPwd) => {
        if (newPwd.length > 16 || !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPwd)) {
            setPasswordError('Password must be up to 16 characters and contain letters and numbers');
        } else if (newPwd !== confirmPwd) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    const handleResetPassword = () => {
        if (!passwordError) {
        
            console.log('New Password:', newPassword);
            console.log('Confirmed Password:', confirmPassword);
        } else {
            console.log('Password error:', passwordError);
        }
    };

    return (
        <div>
            <Navbar />
            <Grid sx={{ mt: 10 }} container>
                <Grid xs={3}></Grid>
                <Grid xs={6} xsOffset={3}>
                    <Typography variant='h5'>
                        Reset Password
                    </Typography>
                    <Typography sx={{ pt: 1 }}>
                        Enter your new password and confirm it
                    </Typography>
                    <form>
                        <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        id="outlined-new-password"
                        label="New Password"
                        variant="outlined"
                        type="password"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        />
                        <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        id="outlined-confirm-password"
                        label="Confirm Password"
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        />
                    </form>
                    {passwordError && (
                        <Typography sx={{ color: 'red', mt: 1 }}>
                            {passwordError}
                        </Typography>
                        )}
                    <Stack direction="row" spacing={3} justifyContent={{lg:"flex-end", xs:"center"}}>
                        <ThemeProvider theme={primary}>
                            <Link to='/login'>
                                <Button sx={{mt:4, px:4, borderRadius:2}} variant='outlined' style={{color:primary}}>
                                    Cancel
                                </Button>
                            </Link>
                        </ThemeProvider>
                        <ThemeProvider theme={secondary}>
                            <Box>
                                <Button sx={{ mt:4, px: 4, borderRadius: 2 }}variant='contained' onClick={handleResetPassword}>
                                    Submit
                                </Button>
                            </Box>
                        </ThemeProvider>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
};

export default ForgotPassword;
