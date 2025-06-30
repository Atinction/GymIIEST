import React, { useState } from 'react';
import {
  Box, Paper, Typography, TextField, Button
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import axios from 'axios';
import { API_BASE_URL } from "../apiConfig";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) return handleError('All fields are required');

    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, loginInfo);
      const { success, jwtToken, name, userId, message } = data;

      if (success) {
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('userId', userId);
        handleSuccess(message);
        setTimeout(() => navigate('/'), 500);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.response?.data?.message || err.message);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/google-login`, {
        token: credentialResponse.credential
      });

      const { success, jwtToken, name, userId, message } = data;

      if (success) {
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);
        localStorage.setItem('userId', userId);
        handleSuccess('Logged in with Google successfully');
        setTimeout(() => navigate('/'), 1000);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'url("/gme.jpg") center/cover', display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>
      <Paper elevation={6} sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0,0,0,0.6)', padding: 4, borderRadius: 3, width: 380, color: '#fff' }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Login to gymIIEST
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField fullWidth variant="filled" label="Email" name="email" type="email"
            value={loginInfo.email} onChange={handleChange}
            InputProps={{ style: { color: '#fff' } }} InputLabelProps={{ style: { color: '#ccc' } }} sx={{ mb: 2 }} />
          <TextField fullWidth variant="filled" label="Password" name="password" type="password"
            value={loginInfo.password} onChange={handleChange}
            InputProps={{ style: { color: '#fff' } }} InputLabelProps={{ style: { color: '#ccc' } }} sx={{ mb: 2 }} />
          <Button fullWidth variant="contained" type="submit"
            sx={{ background: 'linear-gradient(45deg, #2f89d8, #3b04ff)', fontWeight: 'bold', mb: 2 }}>
            LOGIN
          </Button>
        </form>
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => handleError('Google login failed')} />
        <Typography align="center" fontSize="14px" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Button component={Link} to="/signup" sx={{ color: '#90caf9', fontWeight: 'bold' }}>
            Sign up here
          </Button>
        </Typography>
        <ToastContainer />
      </Paper>
    </Box>
  );
};

export default Login;
