import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { create_text } from '../http/apis';
import { Link } from 'react-router-dom';

function AddText() {
    const navigate = useNavigate();
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text) {
            const { data } = await create_text({ text });
            if (data.success === true) {
                toast.success('Text added successfully!');
                
            } else {
                toast.error(data.message);
            }
        } else {
            toast.error('Please enter text!');
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
                Add Text
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
                    multiline
                    rows={4}
                    id="text"
                    label="Text"
                    name="text"
                    autoComplete="text"
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add Text
                </Button>
                <Toaster/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    <Link  to={"/text-list"} >VIEW ALL TEXT</Link>
                </Button>
            </Box>
        </Box>
    );
}

export default AddText;