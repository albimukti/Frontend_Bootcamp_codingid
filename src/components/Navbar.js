import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Stack, Button, Typography, IconButton, Drawer, List, ListItem } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../hooks/useAuth';
import MenuIcon from '@mui/icons-material/Menu';

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
  
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { isLoggedIn, logout } = useAuth()

  const GuestNavbar = () => {
    return (
      <ThemeProvider theme={whiteTheme}>
        <AppBar position="static" sx={{ px: 5 }}>
          <Toolbar>
            <Link to="/">
              <IconButton size="large" edge="start" aria-label="logo">
                <img src="/images/logo.png" alt="logo" />
              </IconButton>
            </Link>
            <Typography component="div" sx={{ flexGrow: 1 }}></Typography>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
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
        <Drawer
          anchor="right"
          open={isMobileMenuOpen}
          onClose={toggleMobileMenu}
        >
          <List>
            <ListItem>
              <ThemeProvider theme={primary}>
                <Link to='/login'>
                  <Button sx={{px:5.7, borderRadius:2}} variant='outlined'>Login</Button>
                </Link>
              </ThemeProvider>
            </ListItem>
            <ListItem>
              <ThemeProvider theme={secondary}>
                <Link to='/register'>
                  <Button sx={{px:4, borderRadius:2, color:primary}} variant='contained'>Register</Button>
                </Link>
              </ThemeProvider>
            </ListItem>
          </List>
        </Drawer>
      </ThemeProvider>
    );
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
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Stack direction='row' spacing={4} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Link to='/checkout'>
                <ShoppingCartIcon sx={{color:'#5B4947', pt:1}} />
              </Link>
              <Link to='/myclass' style={{textDecoration:'none'}}>
                <Typography sx={{color:'#5B4947', pt:1}}>My Class</Typography>
              </Link>
              <Link to='/invoice' style={{textDecoration:'none'}}>
                <Typography sx={{color:'#5B4947', pt:1}}>Invoice</Typography>
              </Link>
              <Typography sx={{color:'#5B4947', pt:1}}>|</Typography>
              <PersonIcon sx={{color:'#FABC1D', pt:1}}/>
              <IconButton onClick={logout}>
                <LogoutIcon sx={{color:'#5B4947'}}/>
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={isMobileMenuOpen}
          onClose={toggleMobileMenu}
        >
          <List>
            <ListItem>
              <PersonIcon sx={{color:'#FABC1D', pt:1}}/>
            </ListItem>
            <ListItem>
              <Link to='/checkout'>
                <ShoppingCartIcon sx={{color:'#5B4947', pt:1}} />
              </Link>
            </ListItem>
            <ListItem>
              <Link to='/myclass' style={{textDecoration:'none'}}>
                <Typography sx={{color:'#5B4947', pt:1}}>My Class</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Link to='/invoice' style={{textDecoration:'none'}}>
                <Typography sx={{color:'#5B4947', pt:1}}>Invoice</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <IconButton onClick={logout}>
                <LogoutIcon sx={{color:'#5B4947'}}/>
              </IconButton>
            </ListItem>
          </List>
        </Drawer>
      </ThemeProvider>
    )
  }


  return (
    <div>
      {
        isLoggedIn ? <UserNavbar/> : <GuestNavbar/>
      }
      <Outlet/>
    </div>
  )
}

export default Navbar