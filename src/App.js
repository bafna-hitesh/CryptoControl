import React, { useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { doc, onSnapshot } from 'firebase/firestore';
import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from './components';
import Alert from './components/Alert';
import './App.css';
import { auth, db } from './firebase';

function App() {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  });
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
    // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, 'watchlist', user?.uid);
      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) setWatchlist(coin.data().coins);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) setUser(authUser);
      else setUser(null);
    });
    return () => {
      // perform cleanup actions
      unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      <Alert alert={alert} setAlert={setAlert} />
      <div className="navbar">
        <Navbar alert={alert} setAlert={setAlert} user={user} watchlist={watchlist} />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails user={user} setAlert={setAlert} watchlist={watchlist} setWatchList={setWatchlist} />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2022
            <Link to="/" style={{ marginLeft: '5px' }}>
              CryptControl Inc.
            </Link> <br />
            All Rights Reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}
export default App;
