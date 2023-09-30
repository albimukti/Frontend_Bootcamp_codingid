import { Box, Typography } from '@mui/material'
import React from 'react'

const ValidateAdmin = () => {
  return (
    <Box sx={{textAlign:'center', mt:10}}>
        <img component='img' height="200px" src='/images/stop.jpg' alt='Stop'/>
        <Typography variant='h4'>Sorry you can't access this page</Typography>
    </Box>
  )
}

export default ValidateAdmin