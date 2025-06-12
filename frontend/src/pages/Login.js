import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) return handleError('All fields are required');

    try {
      setLoading(true);
      const res = await axios.post("https://deploy-mern-app-1-api.vercel.app/auth/login", loginInfo);
      const { success, message, jwtToken, name, userId, error } = res.data;

      if (success) {
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name || '');
        localStorage.setItem('userId', userId);
        handleSuccess(message);
        setTimeout(() => navigate('/'), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message || 'Login failed');
      }
    } catch (err) {
      handleError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post('https://deploy-mern-app-1-api.vercel.app/auth/google-login', {
          token: tokenResponse.access_token
        });

        const { success, message, jwtToken, name, userId } = res.data;

        if (success) {
          localStorage.setItem('token', jwtToken);
          localStorage.setItem('loggedInUser', name || '');
          localStorage.setItem('userId', userId);
          handleSuccess('Logged in with Google successfully');
          setTimeout(() => navigate('/'), 1000);
        } else {
          handleError('Invalid user. Please register first.');
        }
      } catch (err) {
        handleError('Google login failed');
      }
    },
    onError: () => handleError('Google login failed'),
    scope: 'profile email',
  });

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
          Login to gymIIEST
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            variant="filled"
            label="Gmail"
            name="email"
            type="email"
            autoComplete="email"
            value={loginInfo.email}
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
            autoComplete="current-password"
            value={loginInfo.password}
            onChange={handleChange}
            InputProps={{ style: { color: '#fff' } }}
            InputLabelProps={{ style: { color: '#ccc' } }}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              background: 'linear-gradient(45deg, rgb(47, 137, 216), rgb(59, 4, 255))',
              fontWeight: 'bold',
              mb: 2,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'LOGIN'}
          </Button>
        </form>

        <Button
          onClick={() => googleLogin()}
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
            justifyContent: "center",
            gap: 1,
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          <FcGoogle size={20} />
          Login with Google
        </Button>

        <Typography align="center" fontSize="14px" sx={{ mt: 2 }}>
          New here?{" "}
          <Button
            component={Link}
            to="/signup"
            sx={{ color: '#90caf9', fontWeight: 'bold', textTransform: 'none' }}
          >
            Register First
          </Button>
        </Typography>

        <ToastContainer />
      </Paper>
    </Box>
  );
};

export default Login;
