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

const UpdateCourse = () => {
    const [type, setType] = useState()
    const [category, setCategory] = useState()
    const [course, setCourse] = useState()
    const [image, setImage] = useState()
    const [price, setPrice] = useState() 
    const [description, setDescription] = useState()
    const [active, setActive] = useState(null)
    const [allType, setAllType] = useState([])

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getCourse()
        getAllType()
    },[])

    const getCourse = async () => {
        try {
            const menuResponse = await axios.get(`${process.env.REACT_APP_API_URL}/Menu/GetMenuById?Id_menu=${id}`);
            const menuData = menuResponse.data;
            setType(menuData.fk_id_type);
            setCourse(menuData.title);
            setDescription(menuData.description);
            setImage(menuData.image);
            setPrice(menuData.price);
            setActive(menuData.isActivated);
    
            const typeResponse = await axios.get(`${process.env.REACT_APP_API_URL}/Type/GetTypeById?Id_type=${menuData.fk_id_type}`);
            const typeData = typeResponse.data;
            setCategory(typeData.id_type);
        } catch (error) {
            console.error(error);
        }
    }
    

    const getAllType = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/Type/GetAllType`)
        .then(res => setAllType(res.data))
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
        axios.put(process.env.REACT_APP_API_URL + `/Menu/UpdateMenu?Id_menu=${id}`, {
            title: course,
            description: description,
            price: price,
            image: image,
            fk_id_type: category,
            isActivated: active
        })
        .then(navigate('/dashboard-admin/manage-course'))
        window.location.reload()
    }

    return (
        <div>
            <Typography variant="h5">Update Course</Typography>

            {category && 
                <Box sx={{mt:5, pr:{lg:50, md:25, sm:10}}}>
                    <TextField
                            select
                            sx={{width:'250px'}}
                            label="Category"
                            defaultValue={type}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {allType && allType.map((option) => (
                                <MenuItem key={option.id_type} value={option.id_type}>
                                    {option.type_name}
                                </MenuItem>
                            ))}
                        </TextField>
                    <TextField 
                        fullWidth
                        sx={{mt:3}} 
                        type='text' 
                        label = 'Course Name' 
                        defaultValue = {course} 
                        onChange={(e) => setCourse(e.target.value)} 
                    />
                    
                    <Box sx={{mt:3}}>
                        {image && (
                            <Box>
                                <Typography>Image for this Course:</Typography>
                                <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${image}`}/>
                            </Box>
                        )}
                        <TextField type="file" inputProps={{accept:"image/*"}} onChange={handleImageChange} />    
                    </Box>
                    <TextField 
                        fullWidth 
                        sx={{mt:3}} 
                        type='number' 
                        label = 'Price' 
                        defaultValue = {price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />
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
                            helperText="Please select status this course"
                            onChange={(e) => setActive(e.target.value)}
                        >
                            <MenuItem value={true}>Active</MenuItem>
                            <MenuItem value={false}>Inactive</MenuItem>
                        </TextField>
                    </Box>
                    <ThemeProvider theme={green}>
                        <Button sx={{ mt: 3, px: 4, borderRadius: 2 }} variant='contained' onClick={updateData}>Save</Button>
                    </ThemeProvider>
                </Box>
                
            }
        </div>
    )
}

export default UpdateCourse