import React from 'react'
import Navbar from '../components/Navbar'
import { Grid, Typography, Button, Stack } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';


const SuccessRegister = () => {
    const secondary = createTheme({
        palette: {
          primary: {
            main: '#FABC1D'
          },
        },
      });

    return (
        <div>
          
            <Grid sx={{mt:10}} container>
                <Grid md={12}>
                    <Stack alignItems='center'>
                    <img src='/images/success.png' width={'250px'} alt='Success Register'/>
                    <Typography sx={{mt:3}}>Email Confirmation Success</Typography>
                    <Typography sx={{mt:1}}>Congratulation! your email has already used.</Typography>
                    <ThemeProvider theme={secondary} >
                        <Link to='/login'>
                            <Button sx={{mt:4, px:4, borderRadius:2}} variant='contained'>Login Here</Button>
                        </Link>
                    </ThemeProvider>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export default SuccessRegister