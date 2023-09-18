import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Footer from '../components/Footer';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#5B4947",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: "#5B494733",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const DetailInvoice = () => {
  const [dataInvoice, setDataInvoice] = useState([])
  const [dataOrder, setDataOrder] = useState([])

  const { invoice } = useParams()
  const getInvoice = invoice.match(/([a-zA-Z]+)([0-9]+)/)
  const invoiceNumber = parseInt(getInvoice[2], 10)

  useEffect(() => {
    getDataOrder()
    getDataInvoice()
  }, [])

  const getDataOrder = () => {
    axios.get(`https://localhost:7120/api/Order/GetOrderById?id_order=${invoiceNumber}`)
    .then(res => setDataOrder(res.data))
    .catch(error => console.log(error))
  }

  const getDataInvoice = () => {
    axios.get(`https://localhost:7120/api/OrderDetail/GetDetailOrder?id_order=${invoiceNumber}`)
    .then(res => {
      setDataInvoice(res.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const breadcrumbs = [
        <Link style={{textDecoration:'none', color:'#5B4947'}} key="1" to = '/'>
          Home
        </Link>,
        <Link style={{textDecoration:'none', color:'#5B4947'}} key="2" to = '/invoice'>
          Invoice
        </Link>,
        <Typography key="2" color="text.primary">
          Details Invoice
        </Typography>
  ];

  const dateConvert = (date) => {

    const tanggalObjek = new Date(date);

    const namaBulan = [
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

    // Ambil informasi tanggal, bulan, dan tahun
    const tanggal = tanggalObjek.getDate();
    const bulan = namaBulan[tanggalObjek.getMonth()];
    const tahun = tanggalObjek.getFullYear();

    // Buat string hasil dengan format yang diinginkan
    const hasil = tanggal + " " + bulan + " " + tahun;

    // Tampilkan hasil
    return hasil
  }

  const scheduleConvert = (date) => {

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
            <Box sx={{pt:4, px:10, mb:20}}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <Typography variant='h6' sx={{color:'#4F4F4F', fontWeight:'bold', mt:2}}>Details Invoice</Typography>
                <Box sx={{display:'flex', flexDirection:{sm:'row', xs:'column'}, justifyContent:{sm:'space-between', xs:'flex-start'}, alignItems:{sm:'flex-end'}, mt:2}}>
                    <Box>
                        <Typography>No. Invoice &nbsp;: {invoice}</Typography>
                        <Typography>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;: {dateConvert(dataOrder.date_create)}</Typography>
                    </Box>
                    <Typography variant='h6' sx={{color:'#4F4F4F', fontWeight:'bold', mt:{sm:0, xs:1}}}>
                      Total Price &nbsp; &nbsp; {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(dataOrder.total_price)}
                    </Typography>
                </Box>
                <TableContainer sx={{mt:3}} component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">No</StyledTableCell>
                            <StyledTableCell align="center">Course Name</StyledTableCell>
                            <StyledTableCell align="center">Type</StyledTableCell>
                            <StyledTableCell align="center">Schedule</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataInvoice.map((row, index) => (
                              <StyledTableRow>
                                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                <StyledTableCell align="center">{row.title}</StyledTableCell>
                                <StyledTableCell align="center">{row.type_name}</StyledTableCell>
                                <StyledTableCell align="center">{scheduleConvert(row.schedule)}</StyledTableCell>
                                <StyledTableCell align="center">
                                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.price)}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </Box>
            <Footer/>
        </div>
    )
}

export default DetailInvoice