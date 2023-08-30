import React from 'react'
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Stack, Button, Typography, IconButton } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';


const Navbar = () => {

  const whiteTheme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF'
      },
    },
  });

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
    <ThemeProvider theme={whiteTheme}>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/'>
            <IconButton size='large' edge='start' aria-label='logo'>
              <img src='/images/logo.png' alt='logo'/>
            </IconButton>
          </Link>
          <Typography component='div' sx={{ flexGrow: 1 }}></Typography>
          <Stack direction='row' spacing={2}>
            <ThemeProvider theme={primary}>
              <Link to='/login'>
                <Button sx={{px:5, borderRadius:2}} variant='outlined'>Login</Button>
              </Link>
            </ThemeProvider>
            <ThemeProvider theme={secondary}>
              <Link to='/register'>
                <Button sx={{px:4, borderRadius:2, color:primary}} variant='contained'>Register</Button>
              </Link>
            </ThemeProvider>
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Navbar