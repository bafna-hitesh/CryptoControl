/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Signup = ({ handleClose, setAlert }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSubmit = async () => {
      if (password !== confirmPassword) {
        setAlert({
          open: true,
          message: 'Passwords do not match',
          type: 'error',
        });
        return;
      }

      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}`,
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
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{
          backgroundColor: 'rgba(79, 70, 229, 1)',
          color: 'rgba(255,255,255,1)',
          fontSize: '0.875rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          cursor: 'pointer',
         }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
