import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../../css/sub.scss';
import Home from '../home/home';
import NotFound from './NotFound';
import Login from '../login/Login';
import SignUp from '../signup/SignUp';
import CampaignList from '../campaign/CampaignList';
import Profile from '../profile/Profile';
import PrivateRoute from '../../containers/PrivateRoute';
import Campaign from '../campaign/Campaign';


function Main(props) {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        path="/Login"
        render={renderProps => <Login {...renderProps} />}
      />
      <Route
        path="/SignUp"
        render={renderProps => <SignUp {...renderProps} />}
      />
      <PrivateRoute
        path="/Profile"
        component={Profile}
      />
      <Route
        path="/CampaignList"
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
