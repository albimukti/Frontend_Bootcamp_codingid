import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Stack, Button, Typography, IconButton } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

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

const Navbar = () => {

  const GuestNavbar = () => {
    return (
      <ThemeProvider theme={whiteTheme}>
        <AppBar position='static' sx={{px:5}}>
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

  const UserNavbar = () => {
    return (
      <ThemeProvider theme={whiteTheme}>
        <AppBar position='static' sx={{px:5}}>
          <Toolbar>
            <Link to='/'>
              <IconButton size='large' edge='start' aria-label='logo'>
                <img src='/images/logo.png' alt='logo'/>
              </IconButton>
            </Link>
            <Typography component='div' sx={{ flexGrow: 1 }}></Typography>
            <Stack direction='row' spacing={4}>
              <Link to='/checkout'>
                <ShoppingCartIcon sx={{color:'#5B4947'}} />
              </Link>
              <Link to='/myclass' style={{textDecoration:'none'}}>
                <Typography sx={{color:'#5B4947'}}>My Class</Typography>
              </Link>
              <Link to='/invoice' style={{textDecoration:'none'}}>
                <Typography sx={{color:'#5B4947'}}>Invoice</Typography>
              </Link>
              <Typography sx={{color:'#5B4947'}}>|</Typography>
              <PersonIcon sx={{color:'#FABC1D'}}/>
              <LogoutIcon sx={{color:'#5B4947'}}/>
            </Stack>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    )
  }


  return (
    <div>
      <GuestNavbar/>
      <UserNavbar/>
      <Outlet/>
    </div>
  )
}

export default Navbar