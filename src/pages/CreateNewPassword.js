import React from 'react'
import Navbar from '../components/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, Typography, TextField, Stack, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CreateNewPassword = () => {
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

    return (
        <div>
            <Navbar/>
            <Grid sx={{mt:10}} container>
                <Grid md={3} xs={1}></Grid>
                <Grid md={6} mdOffset={3} xs={10}>
                    <Typography variant='h5'>
                        Create New Password
                    </Typography>
                    <Box sx={{mt:2}}>
                        <form>
                            <TextField sx={{mt:3}} fullWidth id="outlined-password-input" label="Password" type="password" variant="outlined"/>
                            <TextField sx={{mt:3}} fullWidth id="outlined-confirm-password-input" label="Confirm new Password" type="password" variant="outlined"/>
                        </form>
                    </Box>
                    <Stack direction="row" spacing={3} justifyContent={{lg:"flex-end", xs:"center"}}>
                        <ThemeProvider theme={primary}>
                            <Link to='/'>
                                <Button sx={{mt:4, px:4, borderRadius:2}} variant='outlined' style={{color:primary}}>Cancel</Button>
                            </Link>
                        </ThemeProvider>
                        <ThemeProvider theme={secondary} >
                            <Link to='/login'>
                                <Button sx={{mt:4, px:4, borderRadius:2}} variant='contained'>Submit</Button>
                            </Link>
                        </ThemeProvider>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateNewPassword