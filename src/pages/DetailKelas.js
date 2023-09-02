import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Box, Typography, Grid, Card, CardMedia, CardContent, Select, MenuItem, FormControl, InputLabel, Stack, Link, Button } from '@mui/material'
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

const DetailKelas = () => {

    const [kelas, setKelas] = useState()
    const [schedule, setSchedule] = useState()

    const {kelasId, menuId} = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
        course()
    }, [])

    //mengambil data list menu pada tiap-tiap kelas sesuai dengan id
    const course = async () => {
        axios.get(`http://localhost:8080/course/${kelasId}`)
        .then(res => setKelas(res.data))
        .catch(error => {
            console.error(error);
        });
    }

  return (
    <div>
        <Navbar/>
        {kelas && 
        <Box>
            <Box sx={{pt:8, px:10}}>
                <Grid container>
                    <Grid xs={12} md={4}>
                        <Card>
                            <CardMedia component='img' image={kelas.menu[menuId - 1].picture}/>
                        </Card>
                    </Grid>
                    <Grid xs={5} sx={{px:5}}>
                        <Typography>{kelas.class}</Typography>
                        <Typography sx={{pt:1, fontWeight:'bold'}} variant='h5'>{kelas.menu[menuId - 1].name}</Typography>
                        <Typography sx={{color:'#5B4947', pt:1, fontWeight:'bold'}} variant='h5'>
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(kelas.menu[menuId - 1].price)}
                        </Typography>
                        <FormControl sx={{width:'25rem', mt:4}}>
                            <InputLabel id="demo-simple-select-label">Select Schedule</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={schedule}
                                label="Select Schedule"
                            >
                                <MenuItem value={10}>Monday, 25 July 2022</MenuItem>
                                <MenuItem value={20}>Tuesday, 26 July 2022</MenuItem>
                                <MenuItem value={30}>Wednesday, 27 July 2022</MenuItem>
                                <MenuItem value={40}>Thursday, 28 July 2022</MenuItem>
                                <MenuItem value={50}>Friday, 29 July 2022</MenuItem>
                                <MenuItem value={60}>Saturday, 30 July 2022</MenuItem>
                            </Select>
                        </FormControl>
                        <Stack direction='row' spacing={2} sx={{mt:8}}>
                            <ThemeProvider theme={primary}>
                                <Link to='/login'>
                                    <Button sx={{px:5, borderRadius:2}} variant='outlined'>Add to Cart</Button>
                                </Link>
                            </ThemeProvider>
                            <ThemeProvider theme={secondary}>
                                <Link to='/register'>
                                    <Button sx={{px:6, borderRadius:2, color:primary}} variant='contained'>Buy Now</Button>
                                </Link>
                            </ThemeProvider>
                    </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ px:10, py:4, borderBottom:1, borderColor:'grey.400'}}>
                <Typography variant='h4' sx={{fontWeight:'bold'}}>Description</Typography>
                <Typography sx={{py:2}}>{kelas.description}</Typography>
                <Typography sx={{py:2}}>{kelas.description}</Typography>
            </Box>

            <Box sx={{py:8, px:10}}>
                    <Typography variant='h4' sx={{textAlign:'center', fontWeight:'bold', color:'#5B4947', pb:8}}>Another menu in this class</Typography>
                    <Box>
                        <Grid container spacing={5}>
                            {kelas.menu.map((list) => {
                                if(list.id !== parseInt(menuId)) 
                                return(
                                <Grid item lg={4} key={list.id}>
                                    <Card>
                                        <CardMedia component='img' image={list.picture}/>
                                        <CardContent>
                                            <Typography sx={{color:'gray'}}>{kelas.class}</Typography>
                                            <Typography sx={{color:'#5B4947', fontWeight:'bold'}} variant='h5'>{list.name}</Typography>
                                            <Typography sx={{color:'#FABC1D', mt:4, fontWeight:'bold'}} variant='h5'>
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(list.price)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )})}
                        </Grid>
                    </Box>
                </Box>
        </Box>}
        <Footer/>
    </div>
  )
}

export default DetailKelas