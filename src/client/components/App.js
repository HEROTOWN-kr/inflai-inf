import React, { useEffect, useState } from 'react';
import { Box, Hidden } from '@material-ui/core';
import { matchPath, useLocation } from 'react-router-dom';
import Main from './main/Main';
import CustomNavBar from './navbar/Navbar';
import Footer from './footer/Footer';
import useAuth from '../hooks/auth.hook';
import AuthContext from '../context/AuthContext';
import BottomMenu from './navbar/MobileView/BottomMenu';
import HelmetMetaData from '../containers/HelmetMetaData';

function App() {
  const {
    token, login, logout, userDataUpdate, userPhoto, socialType, userName, ready
  } = useAuth();
  const isAuthenticated = !!token;

  return (
    <React.Fragment>
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
          <div className="app-footer">
            <Footer />
          </div>
        </div>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
