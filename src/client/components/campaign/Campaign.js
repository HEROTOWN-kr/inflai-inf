import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Box, Snackbar } from '@material-ui/core';
import CampaignDetail from './CampaignDetail';
import CampaignApply from './CampaignApply';
import Alert from '../../containers/Alert';
import Area from './pages/Area';
import Product from './pages/Product';
import Service from './pages/Service';


function Campaign(props) {
  const { match } = props;
  const [message, setMessage] = useState({
    open: false,
    text: '',
    type: 'success'
  });

  const messageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage({ ...message, open: false });
  };

  return (
    <div>
      <Switch>
        <Route
          path={`${match.path}/Area`}
          render={renderProps => <Area {...renderProps} />}
        />
        <Route
          path={`${match.path}/Product`}
          render={renderProps => <Product {...renderProps} />}
        />
        <Route
          path={`${match.path}/Service`}
          render={renderProps => <Service {...renderProps} />}
        />
        <Route
          path={`${match.path}/apply/:id`}
          render={renderProps => <CampaignApply {...renderProps} setMessage={setMessage} />}
        />
        <Route
          path={`${match.path}/detail/:id`}
          render={renderProps => <CampaignDetail {...renderProps} />}
        />
        <Route
          exact
          path={`${match.path}/`}
          render={() => (
            <Redirect to={`${match.path}/Area`} />
          )}
        />
      </Switch>
      <Snackbar
        open={message.open}
        autoHideDuration={4000}
        onClose={messageClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={messageClose} severity={message.type}>
          {message.text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Campaign;
