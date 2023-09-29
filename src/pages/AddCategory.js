import { Box, MenuItem, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddCategory = () => {
    const [typeName, setTypeName] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [active, setActive] = useState(null)

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
            setImage(bytes);
          };
    
          // Membaca file sebagai data URL
          reader.readAsDataURL(file);
        }
    };

    const addNew = () => {
        axios.post(process.env.REACT_APP_API_URL + '/Type/CreateType', {
            type_name: typeName,
            description: description,
            image: image,
            isActivated: active
        })
        .then(navigate('/dashboard-admin'))
    }

    return (
        <div>
            <Typography variant="h5">Add New Category</Typography>

            <Box sx={{mt:5, pr:{lg:50, md:25, sm:10}}}>
                <TextField 
                    fullWidth 
                    type='text' 
                    label = 'Category Name' 
                    defaultValue = {typeName} 
                    onChange={(e) => setTypeName(e.target.value)} 
                />
                <Box sx={{mt:3}}>
                    <Box>
                        <Typography>Image for this Category:</Typography>
                        <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${image}`}/>
                    </Box>
                    <TextField type="file" inputProps={{accept:"image/*"}} onChange={handleImageChange} />    
                </Box>
                <TextField 
                    fullWidth 
                    multiline
                    sx={{mt:3}} 
                    type='text' 
                    label = 'Description' 
                    defaultValue = {description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Box sx={{mt:3}}>
                    <TextField
                        select
                        label="Status"
                        defaultValue={active}
                        helperText="Please select status this category"
                        onChange={(e) => setActive(e.target.value)}
                    >
                        <MenuItem value={true}>Active</MenuItem>
                        <MenuItem value={false}>Inactive</MenuItem>
                    </TextField>
                </Box>
                <Button sx={{ mt: 3, px: 5, borderRadius: 2 }} variant='contained' onClick={addNew}>Save</Button>
            </Box>
        </div>
    )
}

export default AddCategory