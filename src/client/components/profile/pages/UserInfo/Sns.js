import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Button, Grid, Hidden, InputBase, makeStyles
} from '@material-ui/core';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledText from '../../../../containers/StyledText';
import StyledImage from '../../../../containers/StyledImage';
import instagramIcon from '../../../../img/instagram.png';
import youtubeIcon from '../../../../img/youtube.png';
import InstagramDialog from '../../../login/InstagramDialog';
import InstagramSelectDialog from '../../../login/InstagramSelectDialog';
import YoutubeDialog from '../../../login/YoutubeDialog';
import StyledButton from '../../../../containers/StyledButton';
import { Colors } from '../../../../lib/Сonstants';
import AuthContext from '../../../../context/AuthContext';
import LabelComponent from './LabelComponent';

const useStyles = makeStyles({
  FormHelperContained: {
    marginLeft: '0'
  },
});

const defaultValues = {
  naverUrl: ''
};

const schema = Yup.object().shape({
  naverUrl: Yup.string().required('네이버 주소를 입력해주세요')
    .test('snsTypeCheck', '올바른 블로그 URL이 아닙니다. URL을 확인해주세요.', val => (
      val.indexOf('http://') === 0 || val.indexOf('https://') === 0
    )),
});

function Sns(props) {
  const { userInfo, getUserInfo, isMD } = props;
  const { TB_INSTum, TB_YOUTUBE, TB_NAVER } = userInfo;
  const {
    INS_ID, INS_USERNAME, INS_STATUS, INS_DT
  } = TB_INSTum || {};
  const { YOU_ID, YOU_NAME, YOU_DT } = TB_YOUTUBE || {};
  const { NAV_ID, NAV_URL, NAV_DT } = TB_NAVER || {};
  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const [fbData, setFbData] = useState({
    isConnect: false,
    data: {}
  });

  const {
    register, handleSubmit, watch, errors, setValue, control, getValues
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  const [instaDialogOpen, setInstaDialogOpen] = useState(false);
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false);
  const [instaSelectDialogOpen, setInstaSelectDialogOpen] = useState(false);
  const [instaAccounts, setInstaAccounts] = useState([]);

  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isInstagram = (ua.indexOf('Instagram') > -1);
  // const isInstagram = true;

  async function instagramButtonClick() {
    if (!INS_ID) {
      setInstaDialogOpen(!instaDialogOpen);
    } else {
      axios.post('/api/TB_INSTA/delete', {
        id: INS_ID
      }).then((res) => {
        getUserInfo();
      }).catch(err => alert(err.message));
    }
  }

  const GoogleButtonRef = React.useRef(null);

  function toggleYoutubeDialog() {
    setYoutubeDialogOpen(!youtubeDialogOpen);
  }

  const responseGoogle = async (response) => {
    if (!response.error) {
      axios.post('/api/TB_YOUTUBE/add', {
        code: response.code,
        host: window.location.host,
        token
      }).then((res) => {
        getUserInfo();
      }).catch(error => alert(error.response.data.message));
    } else {
      alert('google auth error');
    }
  };

  function youtubeButtonClick() {
    if (!YOU_ID) {
      setYoutubeDialogOpen(!youtubeDialogOpen);
    } else {
      axios.post('/api/TB_YOUTUBE/delete', {
        id: YOU_ID
      }).then((res) => {
        getUserInfo();
      }).catch(err => alert(err.message));
    }
  }

  function naverButtonClick(data) {
    axios.post('/api/TB_NAVER/add', {
      url: data.naverUrl,
      token
    }).then((res) => {
      getUserInfo();
    }).catch((error) => {
      alert(error.response.data.message);
    });
  }

  function deleteNaverUrl() {
    axios.post('/api/TB_NAVER/delete', {
      id: NAV_ID
    }).then((res) => {
      getUserInfo();
    }).catch(err => alert(err.response.data.message));
  }

  function selectAccountDialog() {
    setInstaSelectDialogOpen(!instaSelectDialogOpen);
  }

  function findInstagramAccounts(accessToken, userID) {
    const { FB } = window;

    FB.api('/me', 'GET', {
      fields: 'accounts{instagram_business_account{id,username,profile_picture_url}}'
    }, (response) => {
      console.log(response);
      const { data } = response.accounts;
      if (!data) {
        alert('페이스북 페이지에 연결된 인스타그램 계정이 없습니다');
      } else if (data && data.length > 1) {
        const businesAccs = data.filter(item => item.instagram_business_account);
        if (businesAccs.length > 1) {
          const accounts = businesAccs.map(item => item.instagram_business_account);
          setInstaAccounts(accounts);
          selectAccountDialog();
        } else {
          axios.post('/api/TB_INSTA/add', {
            facebookToken: accessToken,
            facebookUserId: userID,
            token,
            instaId: businesAccs[0].instagram_business_account.id
          }).then((res) => {
            getUserInfo();
          }).catch(err => alert(err.response.data.message));
        }
      } else {
        axios.post('/api/TB_INSTA/add', {
          facebookToken: accessToken,
          facebookUserId: userID,
          token,
          instaId: data[0].instagram_business_account.id
        }).then((res) => {
          getUserInfo();
        }).catch(err => alert(err.response.data.message));
      }
    });
  }

  async function facebookLogin() {
    const { FB } = window;

    if (fbData.isConnect) {
      const { accessToken, userID } = fbData.data;
      findInstagramAccounts(accessToken, userID);
    } else {
      FB.login((loginRes2) => {
        if (loginRes2.authResponse) {
          const { accessToken, userID } = loginRes2.authResponse;
          findInstagramAccounts(accessToken, userID);
        } else {
          alert('not connected');
        }
      }, { scope: 'public_profile, email, manage_pages, instagram_basic, instagram_manage_insights' });
    }

    /* FB.getLoginStatus((loginRes) => {
      if (loginRes.status === 'connected') {
        const { accessToken, userID } = loginRes.authResponse;
        findInstagramAccounts(accessToken, userID);
      } else {
        FB.login((loginRes2) => {
          if (loginRes2.status === 'connected') {
            const { accessToken, userID } = loginRes2.authResponse;
            findInstagramAccounts(accessToken, userID);
          } else {
            alert('not connected');
          }
        }, { scope: 'public_profile, email, manage_pages, instagram_basic, instagram_manage_insights' });
      }
    }, true); */
  }

  function getFacebookLoginStatus() {
    const { FB } = window;
    if (FB) {
      FB.getLoginStatus((loginRes) => {
        if (loginRes.status === 'connected') {
          setFbData({ isConnect: true, data: loginRes.authResponse });
        }
      }, true);
    }
  }

  useEffect(() => {
    getFacebookLoginStatus();
  }, [window.FB]);

  async function addInstagram(selectedId) {
    const { FB } = window;

    FB.getLoginStatus((loginRes) => {
      if (loginRes.status === 'connected') {
        const { accessToken, userID } = loginRes.authResponse;
        axios.post('/api/TB_INSTA/add', {
          facebookToken: accessToken,
          facebookUserId: userID,
          token,
          instaId: selectedId
        }).then((res) => {
          getUserInfo();
        }).catch(err => alert(err.response.data.message));
      } else {
        alert('The user isn\'t logged in to Facebook');
      }
    });
  }

  function fbRecconect() {

  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <LabelComponent labelName="인스타" />
          </Grid>
          <Grid item xs={12} md>
            <Grid container spacing={1}>
              <Grid item xs md="auto">
                <Box py={2} px={2} width={{ xs: 'inherit', md: '250px' }} border="1px solid #e9ecef" css={{ cursor: 'pointer' }} onClick={() => instagramButtonClick()}>
                  <Grid container justify="center" spacing={1}>
                    <Grid item>
                      <StyledImage width="18px" height="18px" src={instagramIcon} />
                    </Grid>
                    <Grid item>
                      <StyledText>{INS_ID ? '인스타그램 연결 해제' : '인스타그램 연결하기'}</StyledText>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              { INS_ID ? null : (
                <Grid item>
                  <Box py={2} px={2} height="52px" border="1px solid #e9ecef" boxSizing="border-box" css={{ cursor: 'pointer' }} onClick={() => window.open('http://pf.kakao.com/_AYxeUxb/62492911', '_blank')}>
                    <StyledText>연결방법 (필독)</StyledText>
                  </Box>
                </Grid>
              ) }
              { INS_STATUS === 0 ? (
                <Grid item>
                  <Box py={2} px={2} height="52px" border="1px solid #e9ecef" boxSizing="border-box" css={{ cursor: 'pointer' }} onClick={() => fbRecconect(INS_ID)}>
                    <StyledText>재연결</StyledText>
                  </Box>
                </Grid>
              ) : null }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {INS_ID ? (
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={1}>
            {isMD ? (
              <Grid item>
                <LabelComponent labelName="" />
              </Grid>
            ) : null}
            <Grid item xs={12} md>
              <Box pb={2}>
                <StyledText fontSize="14px">
                  {'연결한 계정: '}
                  <b>{INS_USERNAME}</b>
                </StyledText>
              </Box>
              <StyledText fontSize="13px">{`${INS_DT}에 연결되었습니다`}</StyledText>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      {isInstagram ? (
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={1}>
            {isMD ? (
              <Grid item>
                <LabelComponent labelName="" />
              </Grid>
            ) : null}
            <Grid item xs={12} md>
              <Box>
                <StyledText fontSize="14px" color="red" lineHeight="1.3em">
                  사파리 혹은 크롬으로 접속하셔야 연동이 문제없이 됩니다 ㅠㅠ!
                </StyledText>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <LabelComponent labelName="유튜브" />
          </Grid>
          <Grid item xs={12} md>
            <Box py={2} px={2} width={{ xs: 'inherit', md: '250px' }} border="1px solid #e9ecef" css={{ cursor: 'pointer' }} onClick={() => youtubeButtonClick()}>
              <Grid container justify="center" spacing={1}>
                <Grid item>
                  <StyledImage width="24px" height="18px" src={youtubeIcon} />
                </Grid>
                <Grid item>
                  <StyledText>{YOU_ID ? '유튜브 연결 해제' : '유튜브 연결하기'}</StyledText>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {YOU_ID ? (
        <Grid item xs={12}>
          <Grid container alignItems="center">
            {isMD ? (
              <Grid item>
                <LabelComponent labelName="" />
              </Grid>
            ) : null}
            <Grid item xs={12} md>
              <Box pb={2}>
                <StyledText fontSize="14px">
                  {'연결한 채널: '}
                  <b>{YOU_NAME}</b>
                </StyledText>
              </Box>
              <StyledText fontSize="13px">{`${YOU_DT}에 연결되었습니다`}</StyledText>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <LabelComponent labelName="네이버" />
          </Grid>
          <Grid item xs={12} md>
            <Box width={{ xs: 'inherit', md: '500px' }}>
              <Grid container alignItems="center" spacing={isMD ? 2 : 1} justify="center">
                <Grid item xs={12} md>
                  {NAV_ID ? (
                    <React.Fragment>
                      {NAV_URL}
                    </React.Fragment>
                  ) : (
                    <Box py={1} px={2} border="1px solid #e9ecef">
                      <InputBase
                        inputRef={register}
                        name="naverUrl"
                        fullWidth
                        placeholder="http://블로그주소 또는 https://블로그주소"
                        inputProps={{ 'aria-label': 'naked', style: { padding: '0' } }}
                      />
                    </Box>
                  )}
                </Grid>
                <Grid item>
                  <Box width="130px">
                    <StyledButton
                      height={38}
                      boxShadow="none"
                      padding="0 10"
                      background={Colors.blue2}
                      onClick={NAV_ID ? deleteNaverUrl : handleSubmit(naverButtonClick)}
                    >
                      {NAV_ID ? '연결해제' : '연결하기'}
                    </StyledButton>
                  </Box>
                </Grid>
              </Grid>
              {errors.naverUrl ? (
                <div className="error-message">{errors.naverUrl.message}</div>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <InstagramDialog open={instaDialogOpen} closeDialog={instagramButtonClick} facebookLogin={facebookLogin} userPage />
      <InstagramSelectDialog
        open={instaSelectDialogOpen}
        closeDialog={selectAccountDialog}
        instaAccounts={instaAccounts}
        connectAccount={addInstagram}
      />
      <YoutubeDialog open={youtubeDialogOpen} closeDialog={toggleYoutubeDialog} googleLogin={() => GoogleButtonRef.current.click()} />
      <GoogleLogin
        clientId="997274422725-gb40o5tv579csr09ch7q8an63tfmjgfo.apps.googleusercontent.com" // CLIENTID                buttonText="LOGIN WITH GOOGLE"
        scope="profile email https://www.googleapis.com/auth/youtube.readonly"
        responseType="code"
        accessType="offline"
        prompt="consent"
        render={renderProps => (
          <button ref={GoogleButtonRef} onClick={renderProps.onClick} disabled={renderProps.disabled} style={{ display: 'none' }}>This is my custom Google button</button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </Grid>
  );
}

export default Sns;
