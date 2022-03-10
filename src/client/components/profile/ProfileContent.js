import React from 'react';
import { Box } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from '../main/NotFound';
import UserInfo from './pages/UserInfo/UserInfo';
import CampaignInfo from './pages/CampaignInfo/CampaignInfo';
import MyPage from './MyPage';
import Favorite from './pages/Favorite/Favorite';
import Sns from './pages/SNS/Sns';

function ProfileContent(props) {
  const {
    match, isMD, isSM, currentMenu, setCurrentMenu
  } = props;

  return (
    <Box height="100%">
      <Switch>
        <Route
          path={`${match.path}/UserInfo`}
          render={renderProps => <UserInfo {...props} currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />}
        />
        <Route
          path={`${match.path}/CampaignInfo`}
          render={renderProps => <CampaignInfo {...renderProps} currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />}
        />
        <Route
          path={`${match.path}/Favorite`}
          render={renderProps => <Favorite {...renderProps} currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} isMD={isMD} isSM={isSM} />}
        />
        <Route
          path={`${match.path}/MyPage`}
          render={renderProps => <MyPage {...props} />}
        />
        <Route
          path={`${match.path}/Sns`}
          render={renderProps => <Sns {...props} />}
        />
        <Route
          exact
          path={`${match.path}/`}
          render={() => (
            <Redirect to={`${match.path}/UserInfo`} />
          )}
        />
        <Route
          component={NotFound}
        />
      </Switch>
    </Box>
  );
}

export default ProfileContent;
