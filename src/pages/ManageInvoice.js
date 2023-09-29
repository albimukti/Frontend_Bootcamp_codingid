import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import useAuth from '../hooks/useAuth';

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

const DetailButton = ({ data }) => {
  return (
    <ThemeProvider theme={secondary}>
      <Link to={`/dashboard-admin/detail-invoice/${data}`}>
        <Button sx={{ px: 4, borderRadius: 2, color: 'black', textTransform: 'none' }} variant='contained'>Details</Button>
      </Link>
    </ThemeProvider>
  )
}

const ManageInvoice = () => {
  const [dataOrder, setDataOrder] = useState([])

  const { payload } = useAuth()
  axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`

  useEffect(() => {
    getAllOrder()
  }, [])

  const getAllOrder = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/Order/GetAllOrder`)
      .then(res => {
        setDataOrder(res.data);
      })
      .catch(error => {
        console.error(error);
      });
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
      <Typography variant="h5">Manage Invoice</Typography>

      <TableContainer sx={{ mt: 3 }} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">No.Invoice</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Total Course</StyledTableCell>
              <StyledTableCell align="center">Total Price</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataOrder.map((row, index) => (
              <StyledTableRow key={row.id_order}>
                <StyledTableCell align="center">{row.invoice}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{formatDate(row.date_created)}</StyledTableCell>
                <StyledTableCell align="center">{row.total_course}</StyledTableCell>
                <StyledTableCell align="center">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.total_price)}
                </StyledTableCell>
                <StyledTableCell align="center">{<DetailButton data={row.id_order} />}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ManageInvoice
