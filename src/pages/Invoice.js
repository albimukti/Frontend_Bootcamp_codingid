import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from '../components/Footer';
import axios from 'axios';

const secondary = createTheme({
    palette: {
      primary: {
        main: '#FABC1D'
      },
    },
  });

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

  const DetailButton = ({data}) => {
    return (
        <ThemeProvider theme={secondary}>
            <Link to={`/detail-invoice/${data}`}>
                <Button sx={{px:4, borderRadius:2, color:'black', textTransform:'none'}} variant='contained'>Details</Button>
            </Link>
        </ThemeProvider>
    )  
}

  
const Invoice = () => {
  const [dataOrder, setDataOrder] = useState([])

  useEffect(() => {
    getInvoiceByIdUser()
    console.log(dataOrder);
  }, [])

  const getInvoiceByIdUser = () => {
    axios.get(`https://localhost:7120/api/Order/GetOrdersByIdUser?id_user=d4e2a410-fd73-4e39-8ed2-9a14c9d9f6a9`)
    .then(res => {
      setDataOrder(res.data);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const breadcrumbs = [
    <Link style={{textDecoration:'none', color:'#5B4947'}} key="1" to = '/'>
      Home
    </Link>,
    <Typography key="2" color="text.primary">
      Invoice
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

    return (
        <div>
            <Box sx={{pt:4, px:10, mb:20}}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <Typography variant='h6' sx={{color:'#4F4F4F', fontWeight:'bold', mt:2}}>Menu Invoice</Typography>
                <TableContainer sx={{mt:2}} component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">No</StyledTableCell>
                            <StyledTableCell align="center">No. Invoice</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="center">Total Course</StyledTableCell>
                            <StyledTableCell align="center">Total Price</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {dataOrder.map((row, index) => (
                            <StyledTableRow key={row.id_order}>
                              <StyledTableCell align="center">{index + 1}</StyledTableCell>
                              <StyledTableCell align="center">{row.invoice}</StyledTableCell>
                              <StyledTableCell align="center">{dateConvert(row.date_create)}</StyledTableCell>
                              <StyledTableCell align="center">{row.total_course}</StyledTableCell>
                              <StyledTableCell align="center">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.total_price)}
                                </StyledTableCell>
                              <StyledTableCell align="center">{<DetailButton data={row.invoice}/>}</StyledTableCell>
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

export default Invoice