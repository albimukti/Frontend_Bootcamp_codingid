import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, Button} from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

const ManageCategory = () => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = () => {
        axios.get(process.env.REACT_APP_API_URL + '/Type/GetAllType')
        .then(res => setCategory(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    const navigate = useNavigate()

    const EditButton = ({id}) => {
        return (
            <ThemeProvider theme={secondary}>
                <Button sx={{px:4, borderRadius:2, color:'black', textTransform:'none'}} variant='contained' onClick={() => navigate(`update-category/${id}`)}>
                    Edit
                </Button>
            </ThemeProvider>
        )
    }

    return (
        <div>
            <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Typography variant="h5">Manage Category</Typography>
                <Button sx={{borderRadius:2, textTransform:'none'}} variant='contained' onClick={() => navigate('/dashboard-admin/add-category')}>
                    Add New Category
                </Button>
            </Box>
            <TableContainer sx={{mt:3}} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Category</StyledTableCell>
                            <StyledTableCell align="center">Image</StyledTableCell>
                            <StyledTableCell align="center">Description</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {category.map((item) => (
                          <StyledTableRow key={item.id_type}>
                            <StyledTableCell align="center">{item.type_name}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Box component='img' sx={{height:'100px', width:'150px'}} src={`data:image/png;base64,${item.image}`}/>
                            </StyledTableCell>
                            <StyledTableCell align="justify">{item.description}</StyledTableCell>
                            <StyledTableCell align="center" sx={{color:item.status === 'Active' ? 'green' : 'red', fontWeight:'bold'}}>
                                {item.status}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <EditButton id={item.id_type} />
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ManageCategory