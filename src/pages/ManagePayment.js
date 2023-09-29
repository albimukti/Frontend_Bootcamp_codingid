import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, Button} from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

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

const ManagePayment = () => {
  const [payment, setPayment] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getPayment()
  }, [])

  const getPayment = () => {
      axios.get(process.env.REACT_APP_API_URL + '/Payment/GetAllPayments')
      .then(res => setPayment(res.data))
      .catch(error => {
          console.error(error);
      });
  }

  const EditButton = ({id}) => {
    return (
        <ThemeProvider theme={secondary}>
            <Link to={`/dashboard-admin/update-payment/${id}`}>
                <Button sx={{px:4, borderRadius:2, color:'black', textTransform:'none'}} variant='contained'>
                    Edit
                </Button>
            </Link>
        </ThemeProvider>
    )
  }

  return (
    <div>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Typography variant="h5">Manage Payment Method</Typography>
        <Button sx={{borderRadius:2, textTransform:'none'}} variant='contained' onClick={() => navigate('/dashboard-admin/add-payment')}>
          Add New Payment
        </Button>
      </Box>

      <TableContainer sx={{mt:3}} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Logo</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
             </TableRow>
          </TableHead>
          <TableBody>
            {payment.map((item) => (
              <StyledTableRow key={item.id_payment}>
                <StyledTableCell align="center">{item.payment_name}</StyledTableCell>
                <StyledTableCell align="center">
                  <Box component='img' sx={{height:'60px'}} src={`data:image/png;base64,${item.logo}`}/> 
                </StyledTableCell>
                <StyledTableCell align="center" sx={{color:item.status === 'Active' ? 'green' : 'red', fontWeight:'bold'}}>
                  {item.status}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <EditButton id = {item.id_payment}/>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>    
  )
}

export default ManagePayment