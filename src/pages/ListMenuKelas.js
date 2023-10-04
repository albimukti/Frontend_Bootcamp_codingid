import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'

const ListMenuKelas = () => {

    //Untuk menampilkan list menu pada kelas
    const [type, setType] = useState();
    const [menu, setMenu] = useState();

    const { typeName } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
        typeFood()
        menuFood()
    }, [typeName])

    const typeFood = async () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/Type/GetTypeByName?name=${typeName}`)
        .then(res => setType(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    const menuFood = async () => {
        Axios.get(`${process.env.REACT_APP_API_URL}/Menu/GetMenuByTypeName?type_name=${typeName}`)
        .then(res => setMenu(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div>
            {type && <Box sx={{backgroundImage: `url('${`data:image/png;base64,${type.image}`}')`, backgroundSize:'cover', backgroundPosition:'center', height:'310px'}}></Box>}
            {type && 
            <Box sx={{py:6, px:{md:10, xs:5}, borderBottom:1, borderColor:'grey.400'}}>
                <Typography variant='h4' sx={{fontWeight:'bold'}}>{type.type_name}</Typography>
                <Typography sx={{py:2, textAlign:'justify'}}>{type.description}</Typography>
            </Box>}
            <Box sx={{py:8, px:{md:10, xs:5}}}>
                <Typography variant='h4' sx={{textAlign:'center', fontWeight:'bold', color:'#5B4947', pb:8}}>Another menu in this class</Typography>
                <Box>
                    <Grid container spacing={5}>
                        {menu && menu.map((list) => (
                            <Grid item lg={4} key={list.id_menu}>
                                <Link to={`/detail-kelas/${type.type_name}/${list.title}`} style={{textDecoration: 'none'}}>
                                    <Card>
                                        <CardMedia component='img' image={`data:image/png;base64,${list.image}`}/>
                                        <CardContent>
                                            <Typography sx={{color:'gray'}}>{type.type_name}</Typography>
                                            <Typography sx={{color:'#5B4947', fontWeight:'bold'}} variant='h5'>{list.title}</Typography>
                                            <Typography sx={{color:'#FABC1D', mt:4, fontWeight:'bold'}} variant='h5'>
                                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(list.price)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>   
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Footer/>
        </div>
    )
}

export default ListMenuKelas