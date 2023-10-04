import React from 'react'
import { Grid, Typography, Button, Stack } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

const SuccessPurchase = () => {

    return (
        <div>
            <Grid sx={{mt:{md:10, xs:5}}} container>
                <Grid item md={3} xs={1}></Grid>
                <Grid item md={6} xs={10}>
                  <Stack alignItems='center'>
                      <img src='/images/success.png' width={'250px'} alt='Success Register'/>
                      <Typography sx={{mt:3, textAlign:'center'}}>Purchase Successfully</Typography>
                      <Typography sx={{mt:1, textAlign:'center'}}>Horay!! Let’s cook and become a professional cheff</Typography>
                      <Stack  sx={{mt:4}} direction={{md:'row', xs:'column'}} spacing={2}>
                        <ThemeProvider theme={primary}>
                            <Link to='/'>
                            <Button sx={{px:{sm:3, xs:2}, py:1.5, borderRadius:2}} variant='outlined'>
                                <HomeIcon fontSize='small' sx={{mr:1}}/>
                                Back to Home
                            </Button>
                            </Link>
                        </ThemeProvider>
                        <ThemeProvider theme={secondary}>
                            <Link to='/invoice'>
                            <Button sx={{px:{sm:3, xs:2}, py:1.5, borderRadius:2, color:primary}} variant='contained'>
                                <ArrowForwardIcon fontSize='small' sx={{mr:1}}/>    
                                Open Invoice
                            </Button>
                            </Link>
                        </ThemeProvider>
                    </Stack>
                  </Stack>
                </Grid>
            </Grid>
        </div>
    )
}

export default SuccessPurchase