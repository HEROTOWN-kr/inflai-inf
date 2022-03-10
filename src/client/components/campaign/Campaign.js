import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Box, Snackbar } from '@material-ui/core';
import CampaignDetail from './CampaignDetail';
import CampaignApply from './CampaignApply';
import Alert from '../../containers/Alert';
import Area from './pages/Area';
import Product from './pages/Product';
import Service from './pages/Service';
import Seller from './pages/Seller';
import Report from './pages/Report';
import GroupSell from './pages/GroupSell';


function Campaign(props) {
  const { match } = props;

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
          path={`${match.path}/Report`}
          render={renderProps => <Report {...renderProps} />}
        />
        <Route
          path={`${match.path}/Seller`}
          render={renderProps => <GroupSell {...renderProps} />}
        />
        <Route
          path={`${match.path}/apply/:id`}
          render={renderProps => <CampaignApply {...renderProps} />}
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
    </div>
  );
}

export default Campaign;
