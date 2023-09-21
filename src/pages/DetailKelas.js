import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { Box, Typography, Grid, Card, CardMedia, CardContent, Select, MenuItem, FormControl, InputLabel, Stack, Button } from '@mui/material'
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

    const { typeName, title} = useParams()
    const navigate = useNavigate()
    const { payload } = useAuth()
    axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`

    useEffect(() => {
        window.scrollTo(0, 0)
        course()
        menuFood()
    }, [title])

    const course = async () => {
        axios.get(`${process.env.REACT_APP_API_URL}/Menu/GetMenuByTitle?title=${title}`)
        .then(res => setKelas(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    const menuFood = async () => {
        axios.get(`${process.env.REACT_APP_API_URL}/Menu/GetMenuByTypeName?type_name=${typeName}`)
        .then(res => setMenu(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    const handleSelect = (event) => {
        setSchedule(event.target.value)
    }

    const addCart = (schedule, id_menu) => {
        axios.post(`${process.env.REACT_APP_API_URL}/Cart/AddCart`, {
            schedule : schedule,
            fk_id_menu : id_menu
        })
        .then(res => {console.log('Sukses:', res.data)})
        .catch(error => {
            console.error(error);
        });
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
                                <MenuItem value={'2022-07-25'}>Monday, 25 July 2022</MenuItem>
                                <MenuItem value={'2022-07-26'}>Tuesday, 26 July 2022</MenuItem>
                                <MenuItem value={'2022-07-27'}>Wednesday, 27 July 2022</MenuItem>
                                <MenuItem value={'2022-07-28'}>Thursday, 28 July 2022</MenuItem>
                                <MenuItem value={'2022-07-29'}>Friday, 29 July 2022</MenuItem>
                                <MenuItem value={'2022-07-30'}>Saturday, 30 July 2022</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography>{schedule}</Typography>
                        <Stack direction={{lg:'row', xs:'column'}} spacing={2} sx={{mt:{lg:8, xs:4}}}>
                            <ThemeProvider theme={primary}>
                                <Button sx={{px:5, borderRadius:2}} variant='outlined' onClick={() => addCart(schedule, kelas.id_menu)}>Add to Cart</Button>
                            </ThemeProvider>
                            <ThemeProvider theme={secondary}>
                                <Link to='/checkout'>
                                    <Button sx={{px:7, borderRadius:2, color:primary}} variant='contained'>Buy Now</Button>
                                </Link>
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
        </Box>
        <Footer/>
    </div>
  )
}

export default DetailKelas