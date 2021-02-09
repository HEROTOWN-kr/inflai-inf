import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FacebookIcon from '../../../img/facebook-logo.png';
import AuthContext from '../../../context/AuthContext';
import SocialButtonNew from './SocialButtonNew';
import InstagramDialog from '../../login/InstagramDialog';
import InstagramSelectDialog from '../../login/InstagramSelectDialog';

function FbLogin() {
  const history = useHistory();
  const [instaDialogOpen, setInstaDialogOpen] = useState(false);
  const [instaSelectDialogOpen, setInstaSelectDialogOpen] = useState(false);
  const [instaAccounts, setInstaAccounts] = useState([]);
  const auth = useContext(AuthContext);

  function toggleInstaDialog() {
    setInstaDialogOpen(!instaDialogOpen);
  }

  function selectAccountDialog() {
    setInstaSelectDialogOpen(!instaSelectDialogOpen);
  }

  function addInstagram(selectedId) {
    window.FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        const { accessToken, userID } = response.authResponse;
        axios.post('/api/TB_INFLUENCER/instaLogin', {
          facebookToken: accessToken,
          facebookUserId: userID,
          instaId: selectedId
        }).then((res) => {
          if (res.status === 200) {
            const {
              userPhone, social_type, userToken, userName, userPhoto, regState
            } = res.data;
            auth.login(userToken, userName, social_type, userPhoto);
            if (userPhone) {
              history.push('/');
            } else {
              history.push('/profile');
            }
          }
        }).catch(err => alert(err.response.data));
      } else {
        alert('The user isn\'t logged in to Facebook');
      }
    });
  }

  function facebookLogin() {
    window.FB.login((loginRes) => {
      if (loginRes.authResponse) {
        const { accessToken, userID } = loginRes.authResponse;

        axios.post('/api/TB_INFLUENCER/facebookLogin', {
          facebookToken: accessToken,
          facebookUserId: userID
        }).then((res) => {
          if (res.status === 200) {
            const {
              userPhone, social_type, userToken, userName, userPhoto, regState
            } = res.data;
            auth.login(userToken, userName, social_type, userPhoto);
            if (userPhone) {
              history.push('/');
            } else {
              history.push('/profile');
            }
          }
          if (res.status === 202) {
            setInstaAccounts(res.data.data);
            selectAccountDialog();
          }
        }).catch((err) => {
          alert(err.response.data.message);
        });
      } else {
        console.log('not connected');
      }
    }, { scope: 'public_profile, email, manage_pages, instagram_basic, instagram_manage_insights' });
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
