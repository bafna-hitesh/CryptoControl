/* eslint-disable max-len */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, Tab, Tabs, AppBar, Box } from '@material-ui/core';
// import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Login from './Login';
import Signup from './Signup';
import { auth } from '../../firebase';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: 20,
    fontSize: 20,
  },
  googleStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 500,
    letterSpacing: '1px',
    backgroundColor: 'rgba(79, 70, 229, 1)',
    color: 'rgba(255,255,255,1)',
    fontSize: '0.875rem',
    padding: '0.5rem 1rem',
    margin: '1rem 1.5rem',
    lineHeight: '1.25rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
  },
  p: {
    display: 'flex',
    alignItems: 'center',

  },
  spanOrFirst: {
    flex: '1 1 0%',
    height: '1px',
    backgroundColor: 'rgba(161,161,170,1)',
  },
  spanOrSecond: {
    margin: '0 0.75rem',
    textAlign: 'center',
    color: 'rgba(112,112,216,1)',
  },
  spanOrThird: {
    flex: '1 1 0%',
    height: '1px',
    backgroundColor: 'rgba(161,161,170,1)',
  },
}));

export default function AuthModal({ alert, setAlert }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0);

  const googleProvider = new GoogleAuthProvider();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: 'success',
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: 'error',
        });
      });
  };
  return (
    <div>
      <Button
        // variant="contained"
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          width: '100%',
          margin: '0.5rem 2rem',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.65)',
          fontSize: '14px',
          textTransform: 'capitalize',
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{
                backgroundColor: 'transparent',
                color: 'inherit',
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && (
            <Login
              handleClose={handleClose}
              alert={alert}
              setAlert={setAlert}
            />
            )}
            {value === 1 && (
            <Signup
              handleClose={handleClose}
              alert={alert}
              setAlert={setAlert}
            />
            )}
            <p className={classes.p}>
              <span className={classes.spanOrFirst} />
              <span className={classes.spanOrSecond}>
                OR
              </span>
              <span className={classes.spanOrThird} />
            </p>

            <Box className={classes.googleStyle} onClick={signInWithGoogle}>
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                style={{
                display: 'block',
                verticalAlign: 'middle',
                width: '1.5rem',
                height: '1.5rem',
                marginRight: '0.5rem',
                }}
              >
                <path d="M473.16 221.48l-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 01-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96z" />
              </svg>
              <span className="ml-3">Continue with Google</span>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
