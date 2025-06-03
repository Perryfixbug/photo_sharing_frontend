import React, { useState } from 'react'
import {Box, Tabs, Tab, Button, TextField, Typography, Paper, Grid} from '@mui/material'
import { postAPI } from '../../lib/restfullAPI'
import { useForm } from 'react-hook-form'
import { setCookie } from '../../lib/cookie'
import { useNavigate } from 'react-router-dom'
import ToastMessage from '../ToastMessage'

const LoginRegister = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const {register, handleSubmit, reset} = useForm();
    const [error, setError] = useState(null);
    const [toastOpen, setToastOpen] = useState(false);
    const navigate = useNavigate();

    const handleTabChange = (event, newValue)=>{
        setTabIndex(newValue);
        reset(); // Reset form when switching tabs
    }
    
    const onSubmit = async (data) => {
        if (tabIndex === 0) {
            // Login
            try {
                const user = await postAPI('auth/login', data);
                // console.log("Login successful:", user);
                if(user){
                    setCookie('userId', user._id, 0.5); 
                    setCookie('fullname', `${user.first_name} ${user.last_name}`, 0.5);
                    navigate('/'); // Redirect to home page after successful login
                    window.location.reload(); // Reload the page to reflect the logged-in state
                    reset(); // Reset form after successful login
                }
                
            } catch (error) {
                console.error("Login failed:", error);
                setToastOpen(true);
                setError(error.response?.data?.message || "Login failed. Please try again.");
            }
        }else{
            try{
                // Register
                const user = await postAPI('auth/register', data);
                // console.log("Register successful:", user);
                // setTimeout(() => {}, 1000); // Simulate a delay for better UX
                // setTabIndex(0); 
                if(user){
                    setCookie('userId', user._id, 0.5); 
                    setCookie('fullname', `${user.first_name} ${user.last_name}`, 0.5);
                    navigate('/'); // Redirect to home page after successful login
                    window.location.reload(); // Reload the page to reflect the logged-in state
                    reset(); // Reset form after successful login
                }
            }catch(e){
                console.error("Register failed:", e);
                setToastOpen(true);
                setError(e.response?.data?.message || "Registration failed. Please try again.");
            }
        }
    }
    return (
        <Box 
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                bgcolor: 'rgba(0,0,0,0.4)',
                zIndex: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper elevation={3} sx={{ p: 3, width: 400, position: 'absolute', top: "50px"}}>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    // indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Login"/>
                    <Tab label="Register"/>
                </Tabs>
                <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit(onSubmit)}>
                    {tabIndex === 0 && (
                        <Box mt={2}>
                            {/* <Typography variant="h6">Login</Typography> */}
                            <TextField label="Username" fullWidth margin="normal" {...register("username")}/>
                            <TextField label="Password" type="password" fullWidth margin="normal" {...register("password")}/>
                        </Box>
                    )}

                    {tabIndex === 1 && (
                    <Box mt={3} p={3} component={Paper} elevation={3}>
                        <Typography variant="h6" gutterBottom>Register</Typography>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            label="First Name"
                            fullWidth
                            {...register("first_name")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            label="Last Name"
                            fullWidth
                            {...register("last_name")}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                            label="Location"
                            fullWidth
                            {...register("location")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            label="Occupation"
                            fullWidth
                            {...register("occupation")}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={2}
                            {...register("description")}
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <TextField
                            label="Username"
                            fullWidth
                            {...register("username")}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            {...register("password")}
                            />
                        </Grid>
                        </Grid>
                    </Box>
                    )}
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
                            {tabIndex === 0 ? 'Login' : 'Register'}
                    </Button>
                </Box>
            </Paper>
            <ToastMessage
                open={toastOpen}
                onClose={()=>setToastOpen(false)}
                message={error}
                severity="error"    
            />
        </Box>
  )
}

export default LoginRegister