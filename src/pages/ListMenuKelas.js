import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'

const ListMenuKelas = () => {

    //Untuk menampilkan list menu pada kelas
    const [kelas, setKelas] = useState();

    const { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
        course()
    }, [])

    //mengambil data list menu pada tiap-tiap kelas sesuai dengan id
    const course = async () => {
        Axios.get(`http://localhost:8080/course/${id}`)
        .then(res => setKelas(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    return (
        <div>
            <Navbar/>
            {kelas && <Box sx={{backgroundImage: `url('${kelas.image}')`, backgroundSize:'cover', backgroundPosition:'center', height:'310px'}}></Box>}
            {kelas && <Box sx={{py:6, px:10, borderBottom:1, borderColor:'grey.400'}}>
                <Typography variant='h4' sx={{fontWeight:'bold'}}>{kelas.class}</Typography>
                <Typography sx={{py:2}}>{kelas.description}</Typography>
            </Box>}
            <Box sx={{py:8, px:10}}>
                <Typography variant='h4' sx={{textAlign:'center', fontWeight:'bold', color:'#5B4947', pb:8}}>Another menu in this class</Typography>
                <Box>
                    <Grid container spacing={5}>
                        {kelas && kelas.menu.map((list) => (
                            <Grid item lg={4} key={list.id}>
                                <Link to={`/detail-kelas/${kelas.id}/${list.id}`} style={{textDecoration: 'none'}}>
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
