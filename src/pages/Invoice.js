import React from 'react'
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
  
  function createData(no, name, calories, fat, carbs, protein) {
    return { no, name, calories, fat, carbs, protein };
  }

  const DetailButton = () => {
    return (
        <ThemeProvider theme={secondary}>
            <Link to='/detail-invoice'>
                <Button sx={{px:4, borderRadius:2, color:'black', textTransform:'none'}} variant='contained'>Details</Button>
            </Link>
        </ThemeProvider>
    )  
}

  const rows = [
    createData(1, 'SOU00003', '12 July 2022', 1, 'IDR 450.000', <DetailButton/>),
    createData(2, 'SOU00002', '05 Februari 2022', 2, 'IDR 900.000', <DetailButton/>),
    createData(3, 'SOU00001', '30 Agustus 2021', 1, 'IDR 600.000', <DetailButton/>)
  ];

  
const Invoice = () => {
    const breadcrumbs = [
        <Link style={{textDecoration:'none', color:'#5B4947'}} key="1" to = '/'>
          Home
        </Link>,
        <Typography key="2" color="text.primary">
          Invoice
        </Typography>
      ];

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
                        {rows.map((row) => (
                            <StyledTableRow key={row.no}>
                            <StyledTableCell align="center">{row.no}</StyledTableCell>
                            <StyledTableCell align="center">{row.name}</StyledTableCell>
                            <StyledTableCell align="center">{row.calories}</StyledTableCell>
                            <StyledTableCell align="center">{row.fat}</StyledTableCell>
                            <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="center">{row.protein}</StyledTableCell>
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