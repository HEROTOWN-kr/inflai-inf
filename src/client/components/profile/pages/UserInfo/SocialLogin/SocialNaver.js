import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import axios from 'axios';
import NaverLogin from 'react-naver-login';
import StyledImage from '../../../../../containers/StyledImage';
import NaverIcon from '../../../../../img/naver-icon.png';
import StyledText from '../../../../../containers/StyledText';
import AuthContext from '../../../../../context/AuthContext';
import SocialButtonNew from '../../../../loginNew/sns/SocialButtonNew';

function checkLocalHost(hostname) {
  const result = hostname.indexOf('127.0.0.1');
  return result !== -1;
}

function SocialNaver() {
  const [naverInfo, setNaverInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const { token } = useContext(AuthContext);
  const isLocal = checkLocalHost(window.location.origin);
  const NaverLoginId = isLocal ? 'KyWNbHHgcX4ZcIagGtBg' : 'HddfazOY2WePr9AUHcfh';

  const refreshPage = () => {
    window.location.reload();
  };

  function getNaverInfo() {
    axios.get('/api/TB_NAVER_INF/getInfo', {
      params: { token }
    }).then((res) => {
      if (res.status === 200) {
        if (res.data.data) {
          setNaverInfo(res.data.data);
        }
      } else if (res.status === 201) {
        setErrorMessage(res.data.message);
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function responseNaver(response) {
    if (response) {
      const {
        email, id, name, profile_image
      } = response;
      axios.get('/api/TB_INFLUENCER/naverAdd', {
        params: {
          id,
          email,
          name,
          profile_image,
          social_type: 'naver'
        }
      }).then((res) => {
        if (res.status === 200) {
          setErrorMessage(res.data.message);
        } else if (res.status === 201) {
          setErrorMessage(res.data.message);
        }
      }).catch((err) => {
        alert(err.response.data.message);
      });
    }
  }

  useEffect(() => {
    const { naver } = window;
    if (token) {
      getNaverInfo();
      if (naver && naver.successCallback) {
        naver.successCallback = data => responseNaver(data);
      }
    }
  }, [token]);

  return (
    <React.Fragment>
      <NaverLogin
        clientId={NaverLoginId}
        callbackUrl={`${window.location.origin}/Profile/UserInfo`}
        render={props => (
          <Box
            py={2}
            px={2}
            width={{ xs: 'inherit', md: '250px' }}
            border="1px solid #e9ecef"
            css={{ cursor: 'pointer' }}
            onClick={props.onClick}
          >
            <Grid container justify="center" spacing={1}>
              <Grid item>
                <StyledImage width="18px" height="18px" src={NaverIcon} />
              </Grid>
              <Grid item>
                <StyledText>{naverInfo.NIF_ID ? '네이버 간편로그인 해제' : '네이버 간편로그인 연결하기'}</StyledText>
              </Grid>
            </Grid>
          </Box>
        )}
        onSuccess={result => responseNaver(result)}
        onFailure={result => responseNaver(result)}
      />
      {errorMessage ? (
        <Box my={1}>
          <div className="error-message">{errorMessage}</div>
        </Box>
      ) : null}
    </React.Fragment>

  );
}

export default SocialNaver;
