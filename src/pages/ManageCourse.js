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

const ManageCourse = () => {
    const [course, setCourse] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getCourse()
    }, [])

    const getCourse = () => {
        axios.get(process.env.REACT_APP_API_URL + '/Menu/GetAllMenu')
        .then(res => setCourse(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    const EditButton = ({id}) => {
        return (
            <ThemeProvider theme={secondary}>
                <Link to={`/dashboard-admin/update-course/${id}`}>
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
                <Typography variant="h5">Manage Course</Typography>
                <Button sx={{borderRadius:2, textTransform:'none'}} variant='contained' onClick={() => navigate('/dashboard-admin/add-course')}>
                    Add New Course
                </Button>
            </Box>

            <TableContainer sx={{mt:3}} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Category</StyledTableCell>
                            <StyledTableCell align="center">Course</StyledTableCell>
                            <StyledTableCell align="center">Image</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="center">Description</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
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
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price)}
                            </StyledTableCell>
                            <StyledTableCell align="justify">{item.description}</StyledTableCell>
                            <StyledTableCell align="center" sx={{color:item.status === 'Active' ? 'green' : 'red', fontWeight:'bold'}}>
                                {item.status}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <EditButton id = {item.id_menu}/>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ManageCourse