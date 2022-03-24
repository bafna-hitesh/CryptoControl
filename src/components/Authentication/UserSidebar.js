/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Avatar } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { signOut } from 'firebase/auth';
import millify from 'millify';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useGetCryptoDetailsQuery } from '../../services/cryptoApi';
import './scrollbar.css';

const useStyles = makeStyles({
    container: {
        width: 300,
        padding: 25,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'monospace',
      },
    profile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logout: {
        height: '8%',
        width: '100%',
        backgroundColor: '#EEBC1D',
        margin: '10 0',
    },
    picture: {
        width: 50,
        height: 50,
        cursor: 'pointer',
        backgroundColor: '#EEBC1D',
        objectFit: 'contain',
        alignItems: 'center',
      },
      watchlist: {
        flex: 1,
        width: '100%',
        margin: '15px 0',
        backgroundColor: '#ecf0f1',
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        overflowY: 'scroll',
      },
      coin: {
        padding: 10,
        borderRadius: 5,
        color: 'black',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EEBC1D',
        boxShadow: '0 0 3px black',
      },
});

export default function UserSidebar({ user, setAlert, watchlist }) {
  const classes = useStyles();

  const removeFromWatchlist = async (coinId, cryptoname) => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coinId) },
        { merge: true },
      );

      setAlert({
        open: true,
        message: `${cryptoname} Removed from the Watchlist !`,
        type: 'success',
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  };

  function DisplayWatchlist() {
    return watchlist.map((coinId) => {
      const data = useGetCryptoDetailsQuery(coinId);
      const cryptoDetails = data?.data?.data?.coin;
      return (
        <div className={classes.coin}>
          <span>{cryptoDetails?.name}</span>
          <span>
            ${cryptoDetails?.price && millify(cryptoDetails?.price)}
            <DeleteOutlined
              style={{ cursor: 'pointer', marginLeft: 10 }}
              fontSize="16"
              onClick={() => removeFromWatchlist(coinId, cryptoDetails?.name)}
            />
          </span>

        </div>

      );
    });
  }

    const [state, setState] = React.useState({
        right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
};

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: 'success',
      message: 'Logout Successfull !',
    });

    toggleDrawer();
  };

    return (
      <div>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Avatar
              icon={<UserOutlined />}
              onClick={toggleDrawer(anchor, true)}
              style={{
                height: 37,
                width: 37,
                margin: '10px 13px',
                cursor: 'pointer',
                color: '#fff',
                backgroundColor: 'inherit',
                border: '1px solid rgba(255, 255, 255, 0.65)',
              }}
              src={user.photoURL}
              alt={user.displayName || user.email}
            />

            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <div className={classes.container}>
                <div className={classes.profile}>
                  <Avatar
                    icon={<UserOutlined />}
                    className={classes.picture}
                    src={user.PhotoUrl}
                    alt={user.displayName || user.email}
                  />
                </div>
                <span
                  style={{
                    width: '100%',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    fontWeight: 'bolder',
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={`${classes.watchlist} custom-skroll`}>
                  <span style={{ fontSize: 15, fontFamily: 'sans-serif', letterSpacing: '2px' }}>
                    Watchlist
                  </span>
                  <DisplayWatchlist />
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Log Out
              </Button>
            </Drawer>
            <span
              style={{ color: '#fff', cursor: 'pointer' }}
              onClick={toggleDrawer(anchor, true)}

            >DashBoard
            </span>
          </React.Fragment>
      ))}
      </div>
  );
}
