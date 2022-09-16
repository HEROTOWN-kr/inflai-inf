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
import Process from '../process/Process';
import CampaignSearch from '../campaign/CampaignSearch';
import Service from '../footer/Service';
import Privacy from '../footer/Privacy';
import YoutubeTest from '../login/YoutubeTest';
import AddressSearch from '../profile/AddressSearch';
import Question from '../question/Question';
import Brand from '../brand/Brand';


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
        render={renderProps => <LoginNew {...renderProps} />}
      />
      <Route
        path="/SignUp"
        render={renderProps => <SignUpNew {...renderProps} />}
      />
      {/* <Route
        exact
        path="/LoginNew"
        render={renderProps => <LoginNew {...renderProps} />}
      />
      <Route
        exact
        path="/SignUpNew"
        render={renderProps => <SignUpNew {...renderProps} />}
      /> */}
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
      <Route
        path="/YoutubeTest"
        render={renderProps => <YoutubeTest {...renderProps} />}
      />
      <Route
        path="/Campaign"
        render={renderProps => <Campaign {...renderProps} />}
      />
      <Route
        path="/Brand"
        render={renderProps => <Brand {...renderProps} />}
      />
      <Route
        path="/Question"
        render={renderProps => <Question {...renderProps} />}
      />
      <Route
        path="/Process"
        render={renderProps => <Process {...renderProps} />}
      />
      <Route
        path="/Search"
        render={renderProps => <CampaignSearch {...renderProps} />}
      />
      <Route
        path="/search_addr"
        render={renderProps => <AddressSearch {...renderProps} />}
      />
      <Route
        path="/Policy/Service"
        render={props => <Service {...props} />}
      />
      <Route
        path="/Policy/Privacy"
        render={props => <Privacy {...props} />}
      />
      <Route
        component={NotFound}
      />
    </Switch>
  );
}

export default Main;
