import { Box, Card, CardContent, Grid, Typography, CardMedia, Stack } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { createTheme } from '@mui/material/styles';
import { Link } from "react-router-dom"
import axios from 'axios';

const secondary = createTheme({
    palette: {
      primary: {
        main: '#FABC1D'
      },
    },
  });

const Body = () => {

    const [limit, setLimit] = useState()
    const [type, setType] = useState()

    useEffect(() => {
        limitMenu()
        typeFood()
    }, [])

    const limitMenu = () => {
        axios.get(process.env.REACT_APP_API_URL + '/Menu/GetMenuLimit')
        .then(res => setLimit(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    const typeFood = () => {
        axios.get(process.env.REACT_APP_API_URL + '/Type/GetActiveType')
        .then(res => setType(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div>
            <Grid container columnSpacing={8} rowSpacing={4} sx={{mt:{md:7, xs:2}, px:{md:20, xs:10}}}>
                <Grid item lg={4} xs={12}>
                    <Card sx={{border:1, borderColor:'grey.400', borderRadius:3}}>
                        <CardContent sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <Typography sx={{mt:1, color:secondary.palette.primary.main, fontWeight:'bold'}} variant='h3'>
                                200+
                            </Typography>
                            <Typography sx={{px:1, py:2, textAlign:'center'}}>
                                Various cuisines available in professional class
                            </Typography>
                        </CardContent>
                    </Card>
                    
                </Grid>

                <Grid item lg={4} xs={12}>
                    <Card sx={{border:1, borderColor:'grey.400', borderRadius:3}}>
                        <CardContent sx={{display:'flex', flexDirection:'column', alignItems:'center',}}>
                            <Typography sx={{mt:1, color:secondary.palette.primary.main, fontWeight:'bold'}} variant='h3'>
                                50+
                            </Typography>
                            <Typography sx={{px:1, py:2, textAlign:'center'}}>
                                A chef who is reliable and has his own characteristics in cooking
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item lg={4} xs={12}>
                    <Card sx={{border:1, borderColor:'grey.400', borderRadius:3}}>
                        <CardContent sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <Typography sx={{mt:1, color:secondary.palette.primary.main, fontWeight:'bold'}} variant='h3'>
                                30+
                            </Typography>
                            <Typography sx={{px:1, py:2, textAlign:'center'}}>
                                Cooperate with trusted and upscale restaurants
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{display:'flex', justifyContent:'center', flexDirection:'row', pb:4}} color='#5B4947'>
                <Typography variant='h4' sx={{mt:9, fontWeight:'bold'}}>
                    More professional class
                </Typography>
            </Box>
            <Box sx={{px:10, py:6}}>
                <Grid container spacing={5}>
                    {limit && limit.map((list, index) => (
                            <Grid item md={4} xs={12} key={index}>
                                <Link to={`/detail-kelas/${list.type_name}/${list.title}`} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <CardMedia component='img' image={`data:image/png;base64,${list.image}`}/>
                                        <CardContent>
                                            <Typography sx={{color:'gray'}}>{list.type_name}</Typography>
                                            <Typography sx={{color:'#5B4947', fontWeight:'bold'}} variant='h5'>{list.title}</Typography>
                                            <Typography sx={{color:'#FABC1D', mt:4, fontWeight:'bold'}} variant='h5'>
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(list.price)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        )
                    )}  
                </Grid>
            </Box>
            <Box sx={{backgroundImage: "url('/images/Soup Image/image 4.png')", backgroundSize:'cover', backgroundPosition:'center'}}>
                <Stack sx={{px:10}} textAlign={'justify'} color={'white'}>
                    <Typography variant='h3' sx={{mt:9, textAlign:{sm:'justify',xs:'left'}}}>
                        Gets your best benefit
                    </Typography>
                    <Typography sx={{mt:5, mb:10}}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.
                    </Typography>
                </Stack>
            </Box>
            <Box sx={{p:10}}>
                <Grid container spacing={5}>
                    {type && type.map((list) => (
                        <Grid item lg={3} md={4} sm={6} xs={12} key={list.id_type}>
                            <Link to={`/list-menu-kelas/${list.type_name}`} style={{textDecoration: 'none'}}>
                                <Card>
                                    <CardMedia component='img' image={`data:image/png;base64,${list.image}`}/>
                                    <CardContent>
                                        <Typography sx={{color:'black', textAlign:'center', fontWeight:'bold'}}>{list.type_name}</Typography>
                                    </CardContent>
                                </Card>
                            </Link>   
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default Body