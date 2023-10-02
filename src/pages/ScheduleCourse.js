import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Typography, Box, TableContainer, Table, TableHead, TableBody, TableRow, Button, TextField} from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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

const ScheduleCourse = () => {
    const [allSchedule, setAllSchedule] = useState([])
    const [updated, setUpdated] = useState(false)
    const [scheduledate, setScheduledate] = useState();

    const navigate = useNavigate()

    const { name, id } = useParams()

    useEffect(() => {
        getAllSchedule()
    }, [updated])

    const getAllSchedule = () => {
        axios.get(process.env.REACT_APP_API_URL + `/Schedule/GetAllScheduleMenu?id_menu=${id}`)
        .then(res => setAllSchedule(res.data))
        .catch(error => {
            console.error(error);
        });
    }

    const updateSchedule = (Id_schedule, Date, IsActivated) => {
        axios.put(process.env.REACT_APP_API_URL + `/Schedule/UpdateSchedule?Id_schedule=${Id_schedule}`, {
            date: Date,
            fk_id_menu: id,
            isActivated: IsActivated
        }).then(setUpdated(!updated))
    }

    const addSchedule = () => {
        axios.post(process.env.REACT_APP_API_URL + `/Schedule/AddSchedule`, {
            date: handleScheduledateChange(scheduledate),
            fk_id_menu: id,
            isActivated: true
        }).then(setUpdated(!updated))
    }

    const handleScheduledateChange = (date) => {
        const tahun = date.getFullYear();
        const bulan = (date.getMonth() + 1).toString().padStart(2, '0');
        const tanggal = date.getDate().toString().padStart(2, '0');

        const tanggalHasil = `${tahun}-${bulan}-${tanggal}`;
        return tanggalHasil
    };
    
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
            <Typography variant='h5' sx={{fontWeight:'bold', textAlign:'center'}}>
                {`${name}`}
            </Typography>
            <Box sx={{display:'flex', flexDirection:'row', mt:3}}>
                <Typography sx={{mr:1.5}} variant='h6'>
                    Add New Schedule
                </Typography>
                <CalendarMonthIcon color='action' fontSize='large'/>
                <DatePicker
                    selected={scheduledate}
                    onChange={(e) => setScheduledate(e)}
                    dateFormat="yyyy-MM-dd"
                />

                <Button sx={{borderRadius:2, textTransform:'none', ml:1.5}} variant='contained' onClick={addSchedule}>
                    Submit
                </Button>
            </Box>
            
            <TableContainer sx={{mt:3}} component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Schedule</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allSchedule.map((item) => (
                        <StyledTableRow key={item.id_schedule}>
                            <StyledTableCell align="center">{formatDate(item.date)}</StyledTableCell>
                            <StyledTableCell align="center" sx={{color:item.status === 'Active' ? 'green' : 'red', fontWeight:'bold'}}>
                                {item.status}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <Button variant='contained' disabled={item.status === 'Active'} color="success" sx={{borderRadius:2, textTransform:'none'}}
                                    onClick={() => updateSchedule(item.id_schedule, item.date, true)}
                                >
                                    Activate
                                </Button>
                                <Button variant='contained' disabled={item.status === 'Inactive'} color="error" sx={{borderRadius:2, textTransform:'none'}}
                                    onClick={() => updateSchedule(item.id_schedule, item.date, false)}
                                >
                                    Inactivate
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                        ))}
                    </TableBody>
                    </Table>
            </TableContainer>
        </div>
    )
}

export default ScheduleCourse