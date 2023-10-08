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

const UpdateUser = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [role, setRole] = useState()
    const [active, setActive] = useState(null)
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getUser()
    },[])

    const getUser = () => {
        axios.get(process.env.REACT_APP_API_URL + `/User/GetUserById?Id_user=${id}`)
        .then(res => {
            setName(res.data.name)
            setEmail(res.data.email)
            setRole(res.data.role)
            setActive(res.data.isActivated)
        })
        .catch(error => {
            console.error(error);
        });
    }

    const updateData = () => {
        setLoading(true)
        axios.put(process.env.REACT_APP_API_URL + `/User/UpdateUser?Id_user=${id}`, {
            name: name,
            email: email,
            role: role,
            isActivated: active
        })
        .then(res => {
            if (res.status === 204) {
                setLoading(false)
                navigate('/dashboard-admin/manage-user')
            }
        })
    }

    return (
        <div>
            <Typography variant='h5'>Update User</Typography>

            {name && 
                <Box sx={{mt:5, pr:{lg:50, md:25, sm:10}}}>
                    <TextField 
                        fullWidth 
                        type='text' 
                        label = 'Name' 
                        defaultValue = {name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <TextField 
                        fullWidth
                        sx={{mt:3}} 
                        type='text' 
                        label = 'Email' 
                        defaultValue = {email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <TextField
                        select
                        sx={{mt:3}} 
                        label="Role"
                        defaultValue={role}
                        helperText="Please Select Role for this User"
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value='Admin'>Admin</MenuItem>
                        <MenuItem value='User'>User</MenuItem>
                    </TextField>
                    <Box sx={{mt:3}}>
                        <TextField
                            select
                            label="Status"
                            defaultValue={active}
                            helperText="Please Select Status for this User"
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

export default UpdateUser