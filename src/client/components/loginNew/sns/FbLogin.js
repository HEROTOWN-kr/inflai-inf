import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Box, Grid } from '@material-ui/core';
import FacebookIcon from '../../../img/facebook-logo.png';
import AuthContext from '../../../context/AuthContext';
import SocialButtonNew from './SocialButtonNew';
import InstagramDialog from '../../login/InstagramDialog';
import InstagramSelectDialog from '../../login/InstagramSelectDialog';
import StyledButton from '../../../containers/StyledButton';

function FbLogin() {
  const history = useHistory();
  const [instaDialogOpen, setInstaDialogOpen] = useState(false);
  const [instaSelectDialogOpen, setInstaSelectDialogOpen] = useState(false);
  const [instaAccounts, setInstaAccounts] = useState([]);

  const auth = useContext(AuthContext);
  const { FB } = window;

  function toggleInstaDialog() {
    setInstaDialogOpen(!instaDialogOpen);
  }

  function selectAccountDialog() {
    setInstaSelectDialogOpen(!instaSelectDialogOpen);
  }

  function saveLoginInfo(info) {
    localStorage.setItem('loginInfo', JSON.stringify({
      ...info
    }));
    history.push('/Join');
  }

  function addInstagram(selectedId) {
    window.FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        const { accessToken, userID } = response.authResponse;
        const selectedInfo = instaAccounts.filter(item => item.id === selectedId);
        const loginInfo = {
          type: 'facebook', accessToken, fbId: userID, instagramInfo: selectedInfo[0]
        };
        saveLoginInfo(loginInfo);
      } else {
        alert('The user isn\'t logged in to Facebook');
      }
    });
  }

  function facebookLogin() {
    FB.login((loginRes) => {
      if (loginRes.authResponse) {
        const { accessToken, userID } = loginRes.authResponse;

        axios.post('/api/TB_INFLUENCER/facebookLoginNew', {
          facebookToken: accessToken,
          facebookUserId: userID
        }).then((res) => {
          if (res.status === 200) {
            const {
              social_type, userToken, userName, userPhoto
            } = res.data;
            auth.login(userToken, userName, social_type, userPhoto);
            history.push('/');
          } else if (res.status === 202) {
            setInstaAccounts(res.data.data);
            selectAccountDialog();
          } else if (res.status === 201) {
            const instagramInfo = res.data.data;
            const loginInfo = {
              type: 'facebook', accessToken, fbId: userID, instagramInfo
            };
            saveLoginInfo(loginInfo);
          }
        }).catch((err) => {
          alert(err.response.data.message);
        });
      } else {
        console.log('not connected');
      }
    }, { scope: 'public_profile, email, pages_show_list, instagram_basic, instagram_manage_insights' });
  }

  return (
    <React.Fragment>
      <SocialButtonNew onClick={toggleInstaDialog} icon={FacebookIcon} text="페이스북 로그인" background="#3B5998" color="#FFFFFF" />
      <InstagramDialog open={instaDialogOpen} closeDialog={toggleInstaDialog} facebookLogin={facebookLogin} />
      <InstagramSelectDialog
        open={instaSelectDialogOpen}
        closeDialog={selectAccountDialog}
        instaAccounts={instaAccounts}
        connectAccount={addInstagram}
      />
    </React.Fragment>
  );
}

export default FbLogin;
