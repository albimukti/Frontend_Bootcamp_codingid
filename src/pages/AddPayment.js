import { Box, MenuItem, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

const AddPayment = () => {
    const [paymentName, setPaymentName] = useState()
    const [logo, setLogo] = useState()
    const [active, setActive] = useState()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

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

    const addNew = () => {
        setLoading(true)
        axios.post(process.env.REACT_APP_API_URL + '/Payment/AddPaymentMethod', {
            payment_name: paymentName,
            logo: logo,
            isActivated: active
        })
        .then(res => {
            if (res.status === 201) {
                setLoading(false)
                navigate('/dashboard-admin/manage-payment')
            }
        })
    }

    return (
        <div>
            <Box sx={{mt:5, pr:{lg:50, md:25, sm:10}}}>
                <TextField 
                    fullWidth 
                    type='text' 
                    label = 'Payment Name'
                    onChange={(e) => setPaymentName(e.target.value)} 
                />
                <Box sx={{mt:3}}>
                    <Box>
                        <Typography>Image for this Payment:</Typography>
                        <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${logo}`}/>
                    </Box>
                    <TextField type="file" inputProps={{accept:"image/*"}} onChange={handleImageChange} />    
                </Box>
                <Box sx={{mt:3}}>
                    <TextField
                        select
                        label="Status"
                        helperText="Please select status this payment"
                        onChange={(e) => setActive(e.target.value)}
                    >
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                    </TextField>
                </Box>
            </Box>
            <Button sx={{ mt: 3, px: 5, borderRadius: 2 }} variant='contained' onClick={addNew}>Save</Button>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent:'center' }}>
                    <CircularProgress />
                </Box>
            )}
        </div>
    )
}

export default AddPayment