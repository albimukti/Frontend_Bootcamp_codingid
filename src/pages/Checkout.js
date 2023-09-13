import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Stack, Typography, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PaymentMethod from '../components/PaymentMethod';

const primary = createTheme({
    palette: {
      primary: {
        main: '#5B4947'
      },
    },
  });

const secondary = createTheme({
    palette: {
      primary: {
        main: '#FABC1D'
      },
    },
  });

const Checkout = () => {
    const [checked, setChecked] = useState([false, false]);

    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            <Box sx={{borderBottom:3, borderColor:'grey.300', py:2, display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                <Stack direction={{sm:'row', xs:'column'}}>
                    <Stack direction='row'>
                        <FormControlLabel
                            control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                        />
                        <Box component='img' sx={{height:'140px'}} src='/images/Soup Image/Rectangle 13-2.png'/>
                    </Stack>
                    <Box sx={{px:{sm:3, xs:6}}}>
                        <Typography sx={{pb:1, mt:{sm:0, xs:2}}}>Asian</Typography>
                        <Typography variant='h5' sx={{fontWeight:'bold', pb:1}}>Tom Yum Thailand</Typography>
                        <Typography sx={{pb:1}}>Schedule : Wednesday, 27 July 2022</Typography>
                        <Typography variant='h6' sx={{color:secondary.palette.primary.main, pb:1, fontWeight:'bold'}}>IDR 450.000</Typography>
                    </Box>
                </Stack>
                <DeleteForeverIcon fontSize='large' sx={{color:'red'}}/>
            </Box>
            <Box sx={{borderBottom:3, borderColor:'grey.300', py:2, display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                <Stack direction={{sm:'row', xs:'column'}}>
                    <Stack direction='row'>
                        <FormControlLabel
                            control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
                        />
                        <Box component='img' sx={{height:'140px'}} src='/images/Soup Image/Rectangle 12-7.png'/>
                    </Stack>
                    <Box sx={{px:{sm:3, xs:6}}}>
                        <Typography sx={{pb:1, mt:{sm:0, xs:2}}}>Asian</Typography>
                        <Typography variant='h5' sx={{fontWeight:'bold', pb:1}}>Ichiraku Ramen</Typography>
                        <Typography sx={{pb:1}}>Schedule : Sunday, 24 July 2022</Typography>
                        <Typography variant='h6' sx={{color:secondary.palette.primary.main, pb:1, fontWeight:'bold'}}>IDR 300.000</Typography>
                    </Box>
                </Stack>
                <DeleteForeverIcon fontSize='large' sx={{color:'red'}}/>
            </Box>
        </Box>
    );

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div style={{position:'relative'}}>
            <Box sx={{pt:4, px:{sm:10, xs:5}, mb:15}}>
                <Box sx={{borderBottom:3, borderColor:'grey.300', py:1}}>
                    <FormControlLabel
                        label="Pilih Semua"
                        control={
                        <Checkbox
                            checked={checked[0] && checked[1]}
                            indeterminate={checked[0] !== checked[1]}
                            onChange={handleChange1}
                        />
                        }
                    />
                </Box>
                {children}
            </Box>
            <Box sx={{position:'fixed', width:'100vw', boxSizing:'border-box', 
            bottom:0, py:3, px:{sm:10, xs:5}, display:'flex', justifyContent: 'space-between', borderTop:3, borderColor:'grey.300', backgroundColor:'white'}}>
                <Stack direction='row' spacing={3}>
                    <Typography sx={{fontSize:{sm:'1.2rem', xs:'1.1rem'}, pt:1}}>Total Price</Typography>
                    <Typography sx={{color:'#FABC1D', fontWeight:'bold', fontSize:{sm:'1.2rem', xs:'1.1rem'}, pt:1}}>IDR 11.500.000</Typography>
                </Stack>
                <Box>
                    <ThemeProvider theme={secondary}>
                        <Button sx={{px:{sm:4, xs:2}, borderRadius:2, color:primary}} variant='contained' onClick={handleClickOpen}>Pay Now</Button>
                    </ThemeProvider>
                </Box>
            </Box>
            <PaymentMethod
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    )
}

export default Checkout