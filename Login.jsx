import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import "./Login.css";
import AOS from 'aos'
import 'aos/dist/aos.css'



const mockUsers = {
  admin: { email: 'mustaq@gmail.com', password: '12345' },
  employee: { email: 'fahad@gmail.com', password: '123456' }
};

const LoginForm = () => {
useEffect(()=>{
  AOS.init()
})

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    
    if (email === mockUsers.admin.email && password === mockUsers.admin.password) {
      navigate('/admin');
    } else if (email === mockUsers.employee.email && password === mockUsers.employee.password) {
      navigate('/employe');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
    console.log('Sign Up button clicked');
  };

  return (
    <div className="login-container" >
      <Container className="login-box" maxWidth="xs" data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
        <Typography variant="h4" className="login-title">
          Login
        </Typography>
        <TextField
          label="Email Address"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box className="login-button">
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button 
            variant="outlined"
            color="secondary"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default LoginForm;


