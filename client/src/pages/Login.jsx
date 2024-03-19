import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { login } from '../http/apis'
import { Link } from 'react-router-dom';


function Login({onLogin}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            const { data } = await login({ email, password })
            if (data.success === true) {
                 onLogin();
                toast.success('Logged in successfully!');
                setTimeout(() => {
                   
                    toast.success(data.message);
                    navigate('/add-list');
                }, 1000);

            }
            else {
                toast.error(data.message);
            }
        } else {
            toast.error('Please enter email and password!');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 8,
            }}
        >
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
            <Toaster />
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                    Don't have an account?  <Link to="/register">Sign up</Link>
                </Typography>

            </Box>
        </Box>
    );
}

export default Login;