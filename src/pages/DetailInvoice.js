import React from 'react'
import { Link } from 'react-router-dom';
import { Typography, Box, Stack, TableContainer, Table, TableHead, TableBody, TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';


import Breadcrumbs from '@mui/material/Breadcrumbs';
import Footer from '../components/Footer';

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

    return (
        <div>
            <Box sx={{pt:4, px:10, mb:20}}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <Typography variant='h6' sx={{color:'#4F4F4F', fontWeight:'bold', mt:2}}>Details Invoice</Typography>
                <Box sx={{display:'flex', flexDirection:{sm:'row', xs:'column'}, justifyContent:{sm:'space-between', xs:'flex-start'}, alignItems:{sm:'flex-end'}, mt:2}}>
                    <Box>
                        <Typography>No. Invoice &nbsp;: SOU00003</Typography>
                        <Typography>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;: 12 July 2022</Typography>
                    </Box>
                    <Typography variant='h6' sx={{color:'#4F4F4F', fontWeight:'bold', mt:{sm:0, xs:1}}}>Total Price IDR 450.000</Typography>
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
                            <StyledTableRow>
                            <StyledTableCell align="center">1</StyledTableCell>
                            <StyledTableCell align="center">Tom Yum Thailand</StyledTableCell>
                            <StyledTableCell align="center">Asian</StyledTableCell>
                            <StyledTableCell align="center">Wednesday, 27 July 2022</StyledTableCell>
                            <StyledTableCell align="center">IDR 450.000</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
            </Box>
            <Footer/>
        </div>
    )
}

export default DetailInvoice