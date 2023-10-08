import { Box, MenuItem, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const green = createTheme({
    palette: {
        primary: {
            main: '#5B9E33'
        },
    },
});

const UpdatePayment = () => {
    const [paymentName, setPaymentName] = useState()
    const [logo, setLogo] = useState()
    const [active, setActive] = useState(null)
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getCategory()
    },[])

    const getCategory = () => {
        axios.get(process.env.REACT_APP_API_URL + `/Payment/GetPaymentById?Id_Payment=${id}`)
        .then(res => {
            setPaymentName(res.data.payment_name)
            setLogo(res.data.logo)
            setActive(res.data.isActivated)
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (event) => {
            const dataURL = event.target.result;
            // Mengonversi data URL menjadi byte dengan menghapus "data:image/jpeg;base64,"
            const bytes = dataURL.split(',')[1];
    
            // Simpan byte dalam state
            setLogo(bytes);
          };
    
          // Membaca file sebagai data URL
          reader.readAsDataURL(file);
        }
    };
    
    const updateData = () => {
        setLoading(true)
        axios.put(process.env.REACT_APP_API_URL + `/Payment/UpdatePayment?Id_payment=${id}`, {
            payment_name: paymentName,
            logo: logo,
            isActivated: active
        })
        .then(res => {
            if (res.status === 204) {
                setLoading(false)
                navigate('/dashboard-admin/manage-payment')
            }
        })
    }

    return (
        <div>
            <Typography variant='h5'>Update Payment Method</Typography>

            {paymentName && 
                <Box sx={{mt:5, pr:{lg:50, md:25, sm:10}}}>
                    <TextField 
                        fullWidth 
                        type='text' 
                        label = 'Payment Name' 
                        defaultValue = {paymentName} 
                        onChange={(e) => setPaymentName(e.target.value)} 
                    />
                    <Box sx={{mt:3}}>
                        {logo && (
                            <Box>
                                <Typography>Image for this Payment:</Typography>
                                <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${logo}`}/>
                            </Box>
                        )}
                        <TextField type="file" inputProps={{accept:"image/*"}} onChange={handleImageChange} />    
                    </Box>
                    <Box sx={{mt:3}}>
                        <TextField
                            select
                            label="Status"
                            defaultValue={active}
                            helperText="Please select status this payment"
                            onChange={(e) => setActive(e.target.value)}
                        >
                            <MenuItem value={true}>Active</MenuItem>
                            <MenuItem value={false}>Inactive</MenuItem>
                        </TextField>
                    </Box>
                    <ThemeProvider theme={green}>
                        <Button sx={{ mt: 3, px: 5, borderRadius: 2 }} variant='contained' onClick={updateData}>Save</Button>
                    </ThemeProvider>
                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent:'center' }}>
                            <CircularProgress />
                        </Box>
                    )}
                </Box>
            }
        </div>
    )
}

export default UpdatePayment