import React from 'react';
import { Box, Hidden } from '@material-ui/core';
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
        <div className="app-footer">
          <Footer />
        </div>
        <Hidden mdUp>
          <BottomMenu />
        </Hidden>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
