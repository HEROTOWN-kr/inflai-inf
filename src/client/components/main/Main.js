import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import '../../css/sub.scss';
import Home from '../home/home';
import NotFound from './NotFound';
import Login from '../login/Login';
import LoginNew from '../loginNew/LoginNew';
import SignUp from '../signup/SignUp';
import Profile from '../profile/Profile';
import PrivateRoute from '../../containers/PrivateRoute';
import Campaign from '../campaign/Campaign';
import SignUpNew from '../loginNew/SignUpNew';
import Join from '../loginNew/Join';
import Activate from '../loginNew/Activate';
import ResetPassPage from '../loginNew/ResetPassPage';


function Main() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/Login"
        render={renderProps => <Login {...renderProps} />}
      />
      <Route
        path="/SignUp"
        render={renderProps => <SignUp {...renderProps} />}
      />
      <Route
        exact
        path="/LoginNew"
        render={renderProps => <LoginNew {...renderProps} />}
      />
      <Route
        exact
        path="/SignUpNew"
        render={renderProps => <SignUpNew {...renderProps} />}
      />
      <Route
        exact
        path="/Join"
        render={renderProps => <Join {...renderProps} />}
      />
      <Route
        path="/Activate/:hash"
        render={renderProps => <Activate {...renderProps} />}
      />
      <Route
        path="/Reset/:hash"
        render={renderProps => <ResetPassPage {...renderProps} />}
      />
      <PrivateRoute
        path="/Profile"
        component={Profile}
      />
      {/* <Route
        path="/Profile"
        render={renderProps => <Profile {...renderProps} />}
      /> */}
      <Route
        path="/Campaign"
        render={renderProps => <Campaign {...renderProps} />}
      />
      {/* <Route
        path="/Profile"
        render={renderProps => <Profile {...renderProps} />}
      /> */}
      <Route
        component={NotFound}
      />
    </Switch>
  );
}

export default Main;
