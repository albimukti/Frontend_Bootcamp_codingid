import { Box, MenuItem, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddUser = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [role, setRole] = useState()

    const navigate = useNavigate()

    const addNew = () => {
        axios.post(process.env.REACT_APP_API_URL + '/User/CreateUser', {
            name: name,
            email: email,
            password: password,
            role: "User",
            isActivated: false
        })
        .then(navigate('/dashboard-admin/manage-user'))
    }

    return (
        <div>
            <Typography variant='h5'>Add New User</Typography>

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
                    fullWidth 
                    sx={{mt:3}}  
                    type="password"
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}/>
                <TextField
                    select
                    sx={{mt:3}} 
                    label="Status"
                    defaultValue={role}
                    helperText="Please Select Role for this User"
                    onChange={(e) => setRole(e.target.value)}
                >
                    <MenuItem value='Admin'>Admin</MenuItem>
                    <MenuItem value='User'>User</MenuItem>
                </TextField>
            </Box>
            <Button sx={{ mt: 3, px: 5, borderRadius: 2 }} variant='contained' onClick={addNew}>Save</Button>
        </div>
    )
}

export default AddUser