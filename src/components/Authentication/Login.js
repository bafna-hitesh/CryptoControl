import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

function Login({ handleClose, setAlert }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: 'Please fill all the Fields',
        type: 'error',
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: 'success',
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };
  return (
    <Box
      p={3}
      style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{
        backgroundColor: 'rgba(79, 70, 229, 1)',
        color: 'rgba(255,255,255,1)',
        fontSize: '0.875rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        cursor: 'pointer',
       }}
      >
        Login
      </Button>
    </Box>
  );
}

export default Login;
