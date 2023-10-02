import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ValidateAdmin = () => {
  return (
    <Box sx={{textAlign:'center', mt:10}}>
        <img component='img' height="200px" src='/images/stop.jpg' alt='Stop'/>
        <Typography variant='h4'>Sorry you can't access this page</Typography>
        <Typography sx={{ mt: 2 }}>
          If you want access this page?
          <Link to='/login' style={{ textDecoration: 'none', color: '#2F80ED' }}> Click here</Link>
        </Typography>
    </Box>
  )
}

export default ValidateAdmin