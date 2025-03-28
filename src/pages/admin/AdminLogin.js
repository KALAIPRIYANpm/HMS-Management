import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Box,
  InputAdornment,
  Alert,
} from '@mui/material';
import { Person, Lock } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username: formData.username,
        password: formData.password,
      });

      // If login is successful, store token and admin info
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('admin', JSON.stringify(res.data.admin));
        setSuccess(true);

        // Redirect to Admin Dashboard after a delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'Invalid username or password'
      );
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(120deg, #1a2a6c, #b21f1f, #fdbb2d)',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Particles */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 40%)',
          animation: 'particles 20s linear infinite',
          zIndex: 0,
        }}
      />
      
      <Paper
        elevation={10}
        sx={{
          position: 'relative',
          padding: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 450,
          background: 'rgba(255, 255, 255, 0.95)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          animation: 'fadeIn 1s ease-in-out',
          zIndex: 2,
          '&:hover': {
            transform: 'translateY(-10px)',
            transition: '0.4s ease-in-out',
          },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            background: 'linear-gradient(to right, #1a2a6c, #b21f1f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          🎩 Admin Login
        </Typography>

        {success && (
          <Alert
            severity="success"
            sx={{
              mb: 2,
              animation: 'fadeIn 0.5s ease-in-out',
              fontWeight: 500,
            }}
          >
            ✅ Login Successful! Redirecting...
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              animation: 'fadeIn 0.5s ease-in-out',
              fontWeight: 500,
            }}
          >
            ❌ {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: '#1a2a6c' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#1a2a6c' },
                '&:hover fieldset': { borderColor: '#b21f1f' },
                '&.Mui-focused fieldset': { borderColor: '#fdbb2d' },
              },
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: '#1a2a6c' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#1a2a6c' },
                '&:hover fieldset': { borderColor: '#b21f1f' },
                '&.Mui-focused fieldset': { borderColor: '#fdbb2d' },
              },
            }}
          />

          <Box mt={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(90deg, #1a2a6c, #b21f1f)',
                color: '#fff',
                padding: '12px',
                fontWeight: 'bold',
                letterSpacing: 1,
                '&:hover': {
                  background: 'linear-gradient(90deg, #b21f1f, #fdbb2d)',
                  transform: 'scale(1.05)',
                  transition: '0.3s ease-in-out',
                },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Keyframes and Styles */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes particles {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 1000px 1000px;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default AdminLogin;
