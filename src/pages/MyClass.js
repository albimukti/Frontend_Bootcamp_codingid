import React from 'react'
import { Typography, Box, Stack } from '@mui/material'

const MyClass = () => {
  return (
    <div>
        <Stack sx={{borderBottom:3, borderColor:'grey.300', mx:10, py:5}} direction='row'>
            <Box component='img' sx={{height:'140px'}} src='/images/Soup Image/Rectangle 13-2.png'/>
            <Box sx={{px:3}}>
                <Typography sx={{pb:1}}>Asian</Typography>
                <Typography variant='h5' sx={{fontWeight:'bold', pb:1}}>Tom Yum Thailand</Typography>
                <Typography variant='h6' sx={{color:'#FABC1D', pb:1, fontWeight:'bold'}}>Schedule : Wednesday, 27 July 2022</Typography>
            </Box>
        </Stack>
    </div>
  )
}

export default MyClass