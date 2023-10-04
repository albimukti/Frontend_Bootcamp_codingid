import React from 'react'
import { Box, Grid, Stack, Typography } from '@mui/material';


const Header = () => {
  return (
    <div>
        <Box sx={{backgroundImage: "url('/images/image 3.png')", backgroundSize:'cover', backgroundPosition:'center'}}>
        <Grid container>
          <Grid item lg={3}></Grid>
          <Grid item lg={6}>
            <Stack alignItems='center' textAlign={'center'} color={'white'}>
              <Typography variant='h3' sx={{mt:{md:9,xs:6}, fontSize:{xs:'2.5rem', md:'3rem'}}}>
                Be the next great cheff
              </Typography>
              <Typography sx={{mt:5, mb:10, fontSize:{md:'1.4rem',xs:'1rem'}}}>
                We are able to awaken your cooking skills to become a classy chef and ready to dive into the professional world
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Header