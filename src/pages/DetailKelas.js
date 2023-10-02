import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { Box, Typography, Grid, Card, CardMedia, CardContent, Select, MenuItem, FormControl, InputLabel, Stack, Button, Snackbar, Alert } from '@mui/material'
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useAuth from '../hooks/useAuth';

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

    const [kelas, setKelas] = useState([])
    const [menu, setMenu] = useState([]);
    const [schedule, setSchedule] = useState('')
    const [date, setDate] = useState([])

    const { typeName, title} = useParams()
    const navigate = useNavigate()
    const { payload, isLoggedIn } = useAuth()
    

    useEffect(() => {
        window.scrollTo(0, 0)
        course()
        menuFood()
    }, [title, isLoggedIn])

    const course = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/Menu/GetMenuByTitle?title=${title}`)
          .then(res => {
            setKelas(res.data);
            scheduleDate(res.data.id_menu);
          })
          .catch(error => {
            console.error(error);
          });
      }
      

    const menuFood = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/Menu/GetMenuByTypeName?type_name=${typeName}`)
        .then(res => setMenu(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    const scheduleDate = (menu) => {
        axios.get(`${process.env.REACT_APP_API_URL}/Schedule/GetSchedulesByMenu?id_menu=${menu}`)
        .then(res => setDate(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    const handleSelect = (event) => {
        setSchedule(event.target.value)
    }

    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const addCart = (schedule, opened) => {
        if (opened) {
            setOpen(true)

            axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
            axios.post(`${process.env.REACT_APP_API_URL}/Cart/AddCart`, {
                fk_id_schedule: schedule
            })
            .then(console.log('Sukses'))
            .catch(error => {
                console.error(error);
            });
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
            axios.post(`${process.env.REACT_APP_API_URL}/Cart/AddCart`, {
                fk_id_schedule: schedule
            })
            .then(console.log('Sukses'))
            .catch(error => {
                console.error(error);
            });
            
            navigate('/checkout')
        }
    }

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
      
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
      
        return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
    }

  return (
    <div>
        <Box>
        {kelas && 
            <Box sx={{pt:8, px:10}}>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardMedia component='img' image={`data:image/png;base64,${kelas.image}`}/>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={5} sx={{px:{md:5, xs:0}, pt:{md:0, xs:3}}}>
                        <Typography>{kelas.type_name}</Typography>
                        <Typography sx={{pt:1, fontWeight:'bold'}} variant='h5'>{kelas.title}</Typography>
                        <Typography sx={{color:'#5B4947', pt:1, fontWeight:'bold'}} variant='h5'>
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(kelas.price)}
                        </Typography>
                        <FormControl sx={{width:'18rem', mt:4}}>
                            <InputLabel id="demo-simple-select-label">Select Schedule</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={schedule}
                                label="Select Schedule"
                                onChange={handleSelect}
                            >
                                {date && date.map((list) => (
                                    <MenuItem value={list.id_schedule} key={list.id_schedule}>{formatDate(list.date)}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Stack direction={{lg:'row', xs:'column'}} spacing={2} sx={{mt:{lg:8, xs:4}}}>
                            <ThemeProvider theme={primary}>
                                <Button sx={{px:5, borderRadius:2}} variant='outlined' disabled={!isLoggedIn} onClick={() => addCart(schedule, true)}>
                                    Add to Cart
                                </Button>
                            </ThemeProvider>
                            <ThemeProvider theme={secondary}>
                                <Button sx={{px:7, borderRadius:2, color:primary}} variant='contained' disabled={!isLoggedIn} onClick={() => addCart(schedule, false)}>
                                    Buy Now
                                </Button>
                            </ThemeProvider>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>}
            {kelas &&
            <Box sx={{ px:10, py:4, borderBottom:1, borderColor:'grey.400'}}>
                <Typography variant='h4' sx={{fontWeight:'bold'}}>Description</Typography>
                <Typography sx={{py:2, textAlign:'justify'}}>{kelas.description}</Typography>
                <Typography sx={{py:2, textAlign:'justify'}}>{kelas.description}</Typography>
            </Box>}

            <Box sx={{py:8, px:10}}>
                    <Typography variant='h4' sx={{textAlign:'center', fontWeight:'bold', color:'#5B4947', pb:8}}>Another menu in this class</Typography>
                    <Box>
                        <Grid container spacing={5}>
                            {menu && menu.map((list) => {
                                if(list.title !== kelas.title) 
                                    return(
                                    <Grid item lg={4} key={list.id_menu}>
                                        <Link to={`/detail-kelas/${kelas.type_name}/${list.title}`} style={{textDecoration: 'none'}}>
                                            <Card>
                                                <CardMedia component='img' image={`data:image/png;base64,${list.image}`}/>
                                                <CardContent>
                                                    <Typography sx={{color:'gray'}}>{kelas.type_name}</Typography>
                                                    <Typography sx={{color:'#5B4947', fontWeight:'bold'}} variant='h5'>{list.title}</Typography>
                                                    <Typography sx={{color:'#FABC1D', mt:4, fontWeight:'bold'}} variant='h5'>
                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(list.price)}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>  
                                    </Grid>
                                    )
                                else return null
                            })}
                        </Grid>
                    </Box>
                </Box>
                {open ? (<Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Course has been added to cart
                </Alert>
            </Snackbar>) : null}
        </Box>
        <Footer/>
    </div>
  )
}

export default DetailKelas