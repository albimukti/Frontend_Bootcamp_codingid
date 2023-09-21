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

  const dateConvert = (date) => {

    // Parse tanggal dengan format yang diberikan
    var parts = date.split(/[\s/:]+/);
    var tanggalObjek = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5]));

    // Daftar nama hari dalam bahasa Inggris
    var namaHari = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ];

    // Daftar nama bulan dalam bahasa Inggris
    var namaBulan = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
    ];

    // Ambil informasi tanggal, bulan, hari, dan tahun
    var hari = namaHari[tanggalObjek.getUTCDay()];
    var tanggal = tanggalObjek.getUTCDate();
    var bulan = namaBulan[tanggalObjek.getUTCMonth()];
    var tahun = tanggalObjek.getUTCFullYear();

    // Buat string hasil dengan format yang diinginkan
    var hasil = hari + ", " + tanggal + " " + bulan + " " + tahun;

    // Tampilkan hasil
    return hasil;

}

  return (
    <div>
        {myClass && myClass.map((list) => (
          <Stack sx={{borderBottom:3, borderColor:'grey.300', mx:10, py:5}} direction='row'>
            <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${list.image}`}/>
            <Box sx={{px:3}}>
                <Typography sx={{pb:1}}>{list.type_name}</Typography>
                <Typography variant='h5' sx={{fontWeight:'bold', pb:1}}>{list.title}</Typography>
                <Typography variant='h6' sx={{color:'#FABC1D', pb:1, fontWeight:'bold'}}>{dateConvert(list.schedule)}</Typography>
            </Box>
          </Stack>
        ))}
    </div>
  )
}

export default MyClass