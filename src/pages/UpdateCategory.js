import { Box, MenuItem, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const green = createTheme({
    palette: {
        primary: {
            main: '#5B9E33'
        },
    },
});

const UpdateCategory = () => {
    const [category, setCategory] = useState()
    const [typeName, setTypeName] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const [active, setActive] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getCategory()
    },[])

    const getCategory = () => {
        axios.get(process.env.REACT_APP_API_URL + `/Type/GetTypeById?Id_type=${id}`)
        .then(res => {
            setCategory(res.data)
            setTypeName(res.data.type_name)
            setDescription(res.data.description)
            setImage(res.data.image)
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
            setImage(bytes);
          };
    
          // Membaca file sebagai data URL
          reader.readAsDataURL(file);
        }
    };

    const updateData = () => {
        axios.put(process.env.REACT_APP_API_URL + `/Type/UpdateType?Id_type=${id}`, {
            type_name: typeName,
            description: description,
            image: image,
            isActivated: active
        })
        .then(navigate('/dashboard-admin'))
    }

    return (
        <div>
            <Typography variant="h5">Update Category</Typography>

            {category && 
                <Box sx={{mt:5, pr:{lg:50, md:25, sm:10}}}>
                    <TextField 
                        fullWidth 
                        type='text' 
                        label = 'Category Name' 
                        defaultValue = {category.type_name} 
                        onChange={(e) => setTypeName(e.target.value)} 
                    />
                    <Box sx={{mt:3}}>
                        {image && (
                            <Box>
                                <Typography>Image for this Category:</Typography>
                                <Box component='img' sx={{height:'140px', width:'210px'}} src={`data:image/png;base64,${image}`}/>
                            </Box>
                        )}
                        <TextField type="file" inputProps={{accept:"image/*"}} onChange={handleImageChange} />    
                    </Box>
                    <TextField 
                        fullWidth 
                        multiline
                        sx={{mt:3}} 
                        type='text' 
                        label = 'Description' 
                        defaultValue = {category.description} 
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
                    <ThemeProvider theme={green}>
                        <Button sx={{ mt: 3, px: 5, borderRadius: 2 }} variant='contained' onClick={updateData}>Save</Button>
                    </ThemeProvider>
                </Box>
                
            }
        </div>
    )
}

export default UpdateCategory