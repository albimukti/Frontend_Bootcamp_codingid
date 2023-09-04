import { Box, Grid, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import axios from 'axios'


const Footer = () => {
    const [kelas, setKelas] = useState()

    useEffect(() => {
        course()
    }, [])

    const course = async () => {
        axios.get(`http://localhost:8080/course`)
        .then(res => setKelas(res.data))
        .catch(error => {
            console.error(error);
        });
    }
    return (
        <Box sx={{px:10, py:5, backgroundColor:'#5B4947'}}>
            <Grid container spacing={10}>
                <Grid item lg={4}>
                    <Typography sx={{color:'#FABC1D', fontWeight:'bold'}}>About Us</Typography>
                    <Typography sx={{color:'white', py:2, textAlign:'justify'}}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                    </Typography>
                </Grid>
                <Grid item lg={4}>
                    <Typography sx={{color:'#FABC1D', fontWeight:'bold'}}>Product</Typography>
                    <Grid container>
                        <Grid item lg={6}>
                        <ul>
                            {kelas && kelas.map((list, index) => {
                                if(index < 4) return (<Link to = {`/list-menu-kelas/${list.id}`} style={{textDecoration:'none'}} >
                                <li style={{color:'white', paddingBottom:10}}>{list.class}</li>
                                </Link> )
                            })}
                            
                        </ul>
                        </Grid>
                        <Grid item lg={6}>
                        <ul>
                            {kelas && kelas.map((list, index) => {
                                if(index >= 4) return (<Link to = {`/list-menu-kelas/${list.id}`} style={{textDecoration:'none'}} >
                                <li style={{color:'white', paddingBottom:10}}>{list.class}</li>
                                </Link> )
                            })}
                            
                        </ul>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4}>
                    <Typography sx={{color:'#FABC1D', fontWeight:'bold'}}>Address</Typography>
                    <Typography sx={{color:'white', py:2, textAlign:'justify'}}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
                    </Typography>
                    <Typography sx={{color:'#FABC1D', fontWeight:'bold'}}>Contact Us</Typography>
                    <Stack direction='row' spacing={3} sx={{mt:2}}>
                        <Box sx={{backgroundColor:'#FABC1D',p:1.5, borderRadius:10}}>
                            <PhoneIcon sx={{color:'#5B4947'}} fontSize='large'/>
                        </Box>
                        <Box sx={{backgroundColor:'#FABC1D',p:1.5, borderRadius:10}}>
                            <InstagramIcon sx={{color:'#5B4947'}} fontSize='large'/>
                        </Box>
                        <Box sx={{backgroundColor:'#FABC1D',p:1.5, borderRadius:10}}>
                            <YouTubeIcon sx={{color:'#5B4947'}} fontSize='large'/>
                        </Box>
                        <Box sx={{backgroundColor:'#FABC1D',p:1.5, borderRadius:10}}>
                            <TelegramIcon sx={{color:'#5B4947'}} fontSize='large'/>
                        </Box>
                        <Box sx={{backgroundColor:'#FABC1D',p:1.5, borderRadius:10}}>
                            <EmailIcon sx={{color:'#5B4947'}} fontSize='large'/>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer