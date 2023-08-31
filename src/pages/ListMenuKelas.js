import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Footer from '../components/Footer'

const ListMenuKelas = () => {
    const [kelas, setKelas] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        course()
    }, [kelas, loaded])

    const course = async () => {
       const response = await fetch('http://localhost:8080/course/1')
       const data = await response.json()
       setKelas(data)
       setLoaded(true)
    }

    return (
        <div>
            <Navbar/>
            <Box sx={{backgroundImage: `url('${kelas.image}')`, backgroundSize:'cover', backgroundPosition:'center', height:'310px'}}></Box>
            <Box sx={{py:6, px:10, borderBottom:1, borderColor:'grey.400'}}>
                <Typography variant='h4' sx={{fontWeight:'bold'}}>{kelas.class}</Typography>
                <Typography sx={{py:2}}>{kelas.description}</Typography>
            </Box>
            <Box sx={{py:8, px:10}}>
                <Typography variant='h4' sx={{textAlign:'center', fontWeight:'bold', color:'#5B4947', pb:8}}>Another menu in this class</Typography>
                <Box>
                    <Grid container spacing={5}>
                        {loaded && kelas.menu.map((list, index) => (
                            <Grid item lg={4} key={index}>
                                <Card>
                                    <CardMedia component='img' image={list.picture}/>
                                    <CardContent>
                                        <Typography sx={{color:'gray'}}>{kelas.class}</Typography>
                                        <Typography sx={{color:'#5B4947', fontWeight:'bold'}} variant='h5'>{list.name}</Typography>
                                        <Typography sx={{color:'#FABC1D', mt:4, fontWeight:'bold'}} variant='h5'>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(list.price)}</Typography>
                                    </CardContent>
                                </Card>
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