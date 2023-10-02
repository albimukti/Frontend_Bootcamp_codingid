import React, { useEffect } from 'react'
import { Grid, Typography, Button, Stack } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

const secondary = createTheme({
    palette: {
      primary: {
        main: '#FABC1D'
      },
    },
});

const SuccessRegister = () => {

    const url = window.location.href;

    function getParameterValue(url, parameterName) {
        const urlSearchParams = new URLSearchParams(new URL(url).search);
        
        return urlSearchParams.get(parameterName);
    }
      
    const idUser = getParameterValue(url, 'id_user');
    const email = getParameterValue(url, 'email');

    axios.get(`${process.env.REACT_APP_API_URL}/User/ActivateUser?id_user=${idUser}&email=${email}`)
        .then(res => console.log(res.status))
        .catch(error => {
            console.error(error.response);
        });

    return (
        <div>
            <Grid sx={{mt:10}} container>
                <Grid md={12}>
                    <Stack alignItems='center'>
                    <img src='/images/success.png' width={'250px'} alt='Success Register'/>
                    <Typography sx={{mt:3}}>Email Confirmation Success</Typography>
                    <Typography sx={{mt:1}}>Congratulation! your email {email} has already used.</Typography>
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