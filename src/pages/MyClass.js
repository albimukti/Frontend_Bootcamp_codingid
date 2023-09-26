import React, { useEffect, useState } from 'react'
import { Typography, Box, Stack } from '@mui/material'
import useAuth from '../hooks/useAuth';
import axios from 'axios';

const MyClass = () => {
  const [myClass, setMyClass] = useState([])
  const { payload } = useAuth()
  axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`

  useEffect(() => {
    getMyClass()
  }, [])

  const getMyClass = () => {
    axios.get(process.env.REACT_APP_API_URL + '/OrderDetail/GetMyClass')
    .then(res => {
      setMyClass(res.data)
    })
    .catch(error => console.log(error))
  }

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
  
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  }

  return (
    <div>
        {myClass && myClass.map((list, index) => (
          <Stack sx={{borderBottom:3, borderColor:'grey.300', mx:10, py:5}} direction='row' key={index}>
            <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${list.image}`}/>
            <Box sx={{px:3}}>
                <Typography sx={{pb:1}}>{list.type_name}</Typography>
                <Typography variant='h5' sx={{fontWeight:'bold', pb:1}}>{list.title}</Typography>
                <Typography variant='h6' sx={{color:'#FABC1D', pb:1, fontWeight:'bold'}}>{formatDate(list.date)}</Typography>
            </Box>
          </Stack>
        ))}
    </div>
  )
}

export default MyClass