import React, { useEffect, useState } from 'react';
import { Box, Hidden } from '@material-ui/core';
import { matchPath, useLocation } from 'react-router-dom';
import Main from './main/Main';
import CustomNavBar from './navbar/Navbar';
import Footer from './footer/Footer';
import useAuth from '../hooks/auth.hook';
import AuthContext from '../context/AuthContext';
import BottomMenu from './navbar/MobileView/BottomMenu';

function App() {
  const {
    token, login, logout, userDataUpdate, userPhoto, socialType, userName, ready
  } = useAuth();
  const isAuthenticated = !!token;

  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isInstagram = (ua.indexOf('Instagram') > -1);

  if (isInstagram) window.open('https://influencer.inflai.com/', '_system');

  return (
    <AuthContext.Provider value={{
      token, login, logout, userDataUpdate, userPhoto, socialType, userName, isAuthenticated
    }}
    >
      <div className="app-block">
        <div className="app-header">
          <CustomNavBar />
        </div>
        <div className="app-body">
          <Main />
        </div>
        {isInstagram ? (
          <Box textAlign="center">webView</Box>
        ) : null}
        <div className="app-footer">
          <Footer />
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
