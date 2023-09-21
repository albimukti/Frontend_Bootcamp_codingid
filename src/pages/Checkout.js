import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Stack, Typography, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PaymentMethod from '../components/PaymentMethod';
import axios from 'axios';

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
    const [cart, setCart] = useState([])
    const [checkedState, setCheckedState] = useState([]);
    const [isItemDeleted, setIsItemDeleted] = useState(false);
    const [totalPrice, settotalPrice] = useState(0)
    const [course, setCourse] = useState(0)
    const [dataOrder, setDataOrder] = useState([])
    const id_User = "d4e2a410-fd73-4e39-8ed2-9a14c9d9f6a9"

    useEffect(() => {
        cartView()
    },[isItemDeleted])

    const cartView = async () => {
        axios.get(process.env.REACT_APP_API_URL + `/Cart/GetCartByIdUser?id_user=${id_User}`)
        .then(res => {
            setCart(res.data)
            setCheckedState(new Array(res.data.length).fill(false));
        })
        .catch(error => {
            console.error(error);
        });
    }

    const deleteCart = (id_cart) => {
        axios.delete(process.env.REACT_APP_API_URL + `/Cart/DeleteCart?id_cart=${id_cart}`)
        .then(res => {
            console.log('Delete Successful:', res.data)
            settotalPrice(0)
        })
        .catch(error => {
            console.error(error);
        });

        setIsItemDeleted(true);        
    }

    const handleOnChange = (event, position) => {
        const isChecked = event.target.checked;
      
        // Perbarui checkedState berdasarkan position
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? isChecked : item
        );
        setCheckedState(updatedCheckedState);
      
        // Perbarui dataOrder berdasarkan checkedState
        const newDataOrder = cart.filter((_, index) => updatedCheckedState[index]);
        setDataOrder(newDataOrder);
      
        // Hitung totalPrice dan totalCourse berdasarkan newDataOrder
        const finalPrice = newDataOrder.reduce(
            (sum, item) => sum + item.price,
            0
        );
        settotalPrice(finalPrice);
      
        const totalCourse = newDataOrder.length;
        setCourse(totalCourse);
    };
      
      const handleAll = () => {
        const selectAll = checkedState.map(() => true);
        setCheckedState(selectAll);
      
        // Perbarui dataOrder berdasarkan cart
        setDataOrder(cart);
      
        // Hitung totalPrice dan totalCourse berdasarkan cart
        const finalPrice = cart.reduce(
            (sum, item) => sum + item.price,
            0
        );
        settotalPrice(finalPrice);
      
        const totalCourse = cart.length;
        setCourse(totalCourse);
    };
      

    const dateConvert = (date) => {

        // Parse tanggal dengan format yang diberikan
        var parts = date.split(/[\s/:]+/);
        var tanggalObjek = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0], parts[3], parts[4], parts[5]));

        // Daftar nama hari dalam bahasa Inggris
        var namaHari = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
        ];

        // Daftar nama bulan dalam bahasa Inggris
        var namaBulan = [
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

        // Ambil informasi tanggal, bulan, hari, dan tahun
        var hari = namaHari[tanggalObjek.getUTCDay()];
        var tanggal = tanggalObjek.getUTCDate();
        var bulan = namaBulan[tanggalObjek.getUTCMonth()];
        var tahun = tanggalObjek.getUTCFullYear();

        // Buat string hasil dengan format yang diinginkan
        var hasil = hari + ", " + tanggal + " " + bulan + " " + tahun;

        // Tampilkan hasil
        return hasil;

    }

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column'}}>
            {cart && cart.map((list, index) => (
                <Box key={index} sx={{borderBottom:3, borderColor:'grey.300', py:2, display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                    <Stack direction={{sm:'row', xs:'column'}}>
                        <Stack direction='row'>
                            <FormControlLabel
                                control={<Checkbox checked={checkedState[index]} onChange={(event) => handleOnChange(event, index)} />}
                            />
                            <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${list.image}`}/>
                        </Stack>
                        <Box sx={{px:{sm:3, xs:6}}}>
                            <Typography sx={{pb:1, mt:{sm:0, xs:2}}}>{list.type_name}</Typography>
                            <Typography variant='h5' sx={{fontWeight:'bold', pb:1}}>{list.title}</Typography>
                            <Typography sx={{pb:1}}>Schedule : {dateConvert(list.schedule)}</Typography>
                            <Typography variant='h6' sx={{color:secondary.palette.primary.main, pb:1, fontWeight:'bold'}}>
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(list.price)}
                            </Typography>
                        </Box>
                    </Stack>
                    <Button onClick={() => deleteCart(list.id_cart)}>
                        <DeleteForeverIcon fontSize='large' sx={{color:'red'}}/>
                    </Button>
                </Box>
            ))}
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
            <Box>
                {dataOrder && dataOrder.map((item) => (
                    <Typography>{item.id_menu}</Typography>
                ))}
            </Box>
            <Box sx={{pt:4, px:{sm:10, xs:5}, mb:15}}>
                <Box sx={{borderBottom:3, borderColor:'grey.300', py:1}}>
                    <FormControlLabel
                        label="Pilih Semua"
                        control={
                        <Checkbox
                            checked={checkedState.every(value => value === true)}
                            onChange={handleAll}
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
                    <Typography sx={{color:'#FABC1D', fontWeight:'bold', fontSize:{sm:'1.2rem', xs:'1.1rem'}, pt:1}}>
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalPrice)}
                    </Typography>
                    <Typography>{dataOrder.length}</Typography>
                </Stack>
                <Box>
                    <ThemeProvider theme={secondary}>
                        <Button sx={{px:{sm:4, xs:2}, borderRadius:2, color:primary}} variant='contained' onClick={handleClickOpen}>Pay Now</Button>
                    </ThemeProvider>
                </Box>
            </Box>
            <PaymentMethod
                selectedValue = {selectedValue}
                open = {open}
                onClose = {handleClose}
                totalPrice = {totalPrice}
                totalCourse = {course}
                orderDetail = {dataOrder}
            />
        </div>
    )
}

export default Checkout