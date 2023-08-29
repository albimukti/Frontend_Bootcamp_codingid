import React from 'react'
import Navbar from '../components/Navbar'
import { Typography, TextField, Grid, Button, Stack } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';


const Register = () => {

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
                <Grid xs={3}></Grid>
                <Grid xs={6} xsOffset={3}>
                    <Typography variant='h5'>
                        Are you ready to become a professional cheff?
                    </Typography>
                    <Typography sx={{pt:1}}>
                        Please register first
                    </Typography>
                    <form>
                        <TextField sx={{mt:3}} fullWidth id="outlined-basic" label="Name" variant="outlined" type='text' />
                        <TextField sx={{mt:3}} fullWidth id="outlined-basic" label="Email" variant="outlined" type='email' />
                        <TextField sx={{mt:3}} fullWidth id="outlined-password-input" label="Password" type="password" variant="outlined"/>
                        <TextField sx={{mt:3}} fullWidth id="outlined-password-input" label="Confirm Password" type="password" variant="outlined"/>
                    </form>
                    <Stack direction="row" justifyContent="flex-end">
                        <ThemeProvider theme={secondary} >
                            <Button sx={{mt:4, px:4, borderRadius:2}} variant='contained'>Signup</Button>
                        </ThemeProvider>
                    </Stack>
                    <Typography sx={{mt:7}} align='center'>
                        Have account?
                        <Link to='/' style={{textDecoration:'none', color:'#2F80ED'}}> Login here</Link>
                    </Typography>
                    
                </Grid>
            </Grid>
        </div>
    )
}

export default Register