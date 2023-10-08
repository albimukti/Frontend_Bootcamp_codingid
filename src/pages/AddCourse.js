import { Box, MenuItem, Button, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';


const AddCourse = () => {
    const [category, setCategory] = useState()
    const [course, setCourse] = useState()
    const [image, setImage] = useState()
    const [price, setPrice] = useState() 
    const [description, setDescription] = useState()
    const [active, setActive] = useState(null)
    const [allType, setAllType] = useState([])
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getAllType()
    },[])

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

    const addNew = () => {
        setLoading(true)
        axios.post(process.env.REACT_APP_API_URL + '/Menu/CreateMenu', {
            title: course,
            description: description,
            price: price,
            image: image,
            fk_id_type: category,
            isActivated: active
        })
        .then(res => {
            if (res.status === 201) {
                setLoading(false)
                navigate('/dashboard-admin/manage-course')
            }
        })
    }

    return (
        <div>
            <Typography variant="h5">Add New Course</Typography>

            {allType && 
                <Box sx={{mt:5, pr:{lg:50, md:25, sm:10}}}>
                    <TextField
                            select
                            sx={{width:'250px'}}
                            label="Category"
                            helperText="Please choose category for this course"
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
                        <Box>
                            <Typography>Image for this Course:</Typography>
                            <Box component='img' sx={{height:'140px'}} src={`data:image/png;base64,${image}`}/>
                        </Box>
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
                    <Button sx={{ mt: 3, px: 5, borderRadius: 2 }} variant='contained' onClick={addNew}>Save</Button>
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

export default AddCourse