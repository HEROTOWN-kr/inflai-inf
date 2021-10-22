import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const storageName = 'userData';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const urlParams = window.location.search;
  const searchParams = new URLSearchParams(urlParams);
  const paramsToken = searchParams.has('token');

  const data = JSON.parse(localStorage.getItem(storageName));
  const { token } = data || {};

  return (

  // Show the component only when the user is logged in
  // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={props => (
        token || paramsToken
          ? <Component {...props} />
          : <Redirect to="/Login" />
      )}
    />
  );
};

export default PrivateRoute;
