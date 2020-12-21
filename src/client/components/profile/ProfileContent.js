import React, { useState } from 'react';
import {
  Box, Snackbar, useMediaQuery, useTheme
} from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Colors } from '../../lib/Сonstants';
import WhiteBlock from '../../containers/WhiteBlock';
import NotFound from '../main/NotFound';
import Alert from '../../containers/Alert';
import UserInfo from './pages/UserInfo';
import CampaignInfo from './pages/CampaignInfo';
import Rank from './pages/Rank';
/* import Rank from './pages/Rank';
import UserInfo from './pages/UserInfo/UserInfo';
import CampaignInfo from './pages/CampaignInfo/CampaignInfo';
import MembershipInfo from './pages/MembershipInfo'; */

function ProfileContent(props) {
  const {
    match, isMD, isSM, currentMenu, setCurrentMenu
  } = props;
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
    <Box height="100%">
      <Switch>
        <Route
          path={`${match.path}/UserInfo`}
          render={renderProps => <UserInfo {...props} setMessage={setMessage} currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />}
        />
        <Route
          path={`${match.path}/CampaignInfo`}
          render={renderProps => <CampaignInfo {...renderProps} currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />}
        />
        <Route
          path={`${match.path}/Rank`}
          render={renderProps => <Rank {...renderProps} currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} isMD={isMD} isSM={isSM} />}
        />
        {/* <Route
          path={`${match.path}/MembershipInfo`}
          render={renderProps => <MembershipInfo {...props} setMessage={setMessage} />}
        /> */}
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
    </Box>
  );
}

export default ProfileContent;
