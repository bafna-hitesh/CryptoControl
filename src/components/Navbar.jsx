import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

import Particles from '../Particles';

const styles = {
  root: {
    position: 'relative',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    height: '100%',
    background: '#222',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
const Navbar = ({ alert, setAlert, user, watchlist }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className={`nav-container ${activeMenu && 'nav'}`}>
      <Particles style={styles.root} />
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo"><Link to="/">CryptoControl</Link></Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
        <div>
          {user ? <UserSidebar user={user} setAlert={setAlert} watchlist={watchlist} /> : <AuthModal alert={alert} setAlert={setAlert} />}
        </div>
      </Menu>
      )}
    </div>
  );
};

export default Navbar;
