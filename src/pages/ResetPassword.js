import React, { useState } from 'react';
import { Typography, TextField, Grid, Button, Stack, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

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

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invalid, setInvalid] = useState('hidden')
    const [passwordError, setPasswordError] = useState(',');
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

    const validateNewPassword = () => {
        if (newPassword.length > 16 || !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword)) {
            setInvalid('visible')
            setPasswordError('Password must be up to 16 characters and contain letters and numbers');
          }
    };

    const validateConfirmPassword = () => {
        if (newPassword !== confirmPassword) {
            setInvalid('visible')
            setPasswordError('Passwords do not match');
          }
    }

    const handleResetPassword = () => {
        if (!passwordError) {
        
            console.log('New Password:', newPassword);
            console.log('Confirmed Password:', confirmPassword);
        } else {
            console.log('Password error:', passwordError);
        }
    };
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    

    return (
        <div>
          
            <Grid sx={{ mt: 10 }} container>
                <Grid item md={3} xs={1}></Grid>
                <Grid item md={6} xs={10}>
                    <Typography variant='h5'>
                        Reset Password
                    </Typography>
                    <Typography sx={{ pt: 1 }}>
                        Enter your new password and confirm it
                    </Typography>
                    <Box sx={{mt:0}}>
                        <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        id="outlined-new-password"
                        label="New Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onBlur={validateNewPassword}
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
                        <TextField
                        sx={{ mt: 3 }}
                        fullWidth
                        id="outlined-confirm-password"
                        label="Confirm Password"
                        variant="outlined"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={validateConfirmPassword}
                        InputProps={{
                            endAdornment: (
                                <Button
                                    onClick={handleConfirmPasswordVisibility}
                                    sx={{ p: 0 }}
                                >
                                    {showConfirmPassword ? 'Hide' : 'Show'}
                                </Button>
                            ),
                        }}
                        />
                        <Typography sx={{mt:1, color:'red', visibility:invalid}}>
                            {passwordError}
                        </Typography> 
                    </Box>
                    <Stack direction="row" spacing={3} justifyContent={{lg:"flex-end", xs:"center"}}>
                        <ThemeProvider theme={primary}>
                            <Link to='/login'>
                                <Button sx={{mt:4, px:4, borderRadius:2}} variant='outlined' style={{color:primary}}>
                                    Cancel
                                </Button>
                            </Link>
                        </ThemeProvider>
                        <ThemeProvider theme={secondary}>
                            <Link to = '/login' >
                            <Box>
                                <Button sx={{ mt:4, px: 4, borderRadius: 2 }}variant='contained' onClick={handleResetPassword}>
                                    Submit
                                </Button>
                            </Box>

                            </Link>
                           
                                
                        </ThemeProvider>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
};

export default ResetPassword;
