import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

const Signup = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) return handleError('All fields are required');

        try {
            const res = await fetch("https://deploy-mern-app-1-api.vercel.app/auth/signup", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });

            const { success, message, error } = await res.json();

            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(error?.details?.[0]?.message || message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundImage: 'url("/gme.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 2,
        }}>
            <Paper elevation={6} sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                padding: 4,
                borderRadius: 3,
                width: 380,
                color: '#fff',
            }}>
                <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                    Register to gymIIEST
                </Typography>

                <form onSubmit={handleSignup}>
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Full Name"
                        name="name"
                        value={signupInfo.name}
                        onChange={handleChange}
                        InputProps={{ style: { color: '#fff' } }}
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Gmail"
                        name="email"
                        type="email"
                        value={signupInfo.email}
                        onChange={handleChange}
                        InputProps={{ style: { color: '#fff' } }}
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Password"
                        name="password"
                        type="password"
                        value={signupInfo.password}
                        onChange={handleChange}
                        InputProps={{ style: { color: '#fff' } }}
                        InputLabelProps={{ style: { color: '#ccc' } }}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{
                            background: 'linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))',
                            fontWeight: 'bold',
                            mb: 2,
                        }}
                    >
                        SIGNUP
                    </Button>
                </form>

                {/* Placeholder for Google Auth (not functional yet) */}
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                        mt: 1,
                        borderColor: "#fff",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                        },
                    }}
                >
                    <img
                        src="google-icon.svg"
                        alt="Google"
                        style={{ width: 20, height: 20 }}
                    />
                    Signup with Google
                </Button>

                <Typography align="center" fontSize="14px">
                    Already have an account?{" "}
                    <Button component={Link} to="/login" sx={{ color: '#90caf9', fontWeight: 'bold', textTransform: 'none' }}>
                        Login here
                    </Button>
                </Typography>

                <ToastContainer />
            </Paper>
        </Box>
    );
};

export default Signup;
