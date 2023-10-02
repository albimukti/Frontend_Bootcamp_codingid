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

const ManageSchedule = () => {
  const [course, setCourse] = useState([])

  useEffect(() => {
    getCourse()
  },[])

  const getCourse = () => {
    axios.get(process.env.REACT_APP_API_URL + '/Menu/GetAllMenu')
    .then(res => setCourse(res.data))
    .catch(error => {
      console.error(error);
    });
  }

  const SeeAll = ({name, id}) => {
    return (
      <ThemeProvider theme={secondary}>
        <Link to={`/dashboard-admin/schedule-course/${name}/${id}`}>
          <Button sx={{px:4, borderRadius:2, color:'black', textTransform:'none'}} variant='contained'>
            Manage Schedule
          </Button>
        </Link>
      </ThemeProvider>
    )
}

  return (
    <div>
      <Typography variant="h5">Manage Course</Typography>

      <TableContainer sx={{mt:3}} component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Course</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {course.map((item) => (
            <StyledTableRow key={item.id_menu}>
              <StyledTableCell align="center">{item.type_name}</StyledTableCell>
              <StyledTableCell align="center">{item.title}</StyledTableCell>
              <StyledTableCell align="center">
                <Box component='img' sx={{height:'100px', width:'150px'}} src={`data:image/png;base64,${item.image}`}/> 
              </StyledTableCell>
              <StyledTableCell align="center">
                <SeeAll name = {item.title} id = {item.id_menu}/>
              </StyledTableCell>
            </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ManageSchedule