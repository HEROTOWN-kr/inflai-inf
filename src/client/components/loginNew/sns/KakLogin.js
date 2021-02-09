import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import NaverLogin from 'react-naver-login';
import Grid from '@material-ui/core/Grid';
import AuthContext from '../../../context/AuthContext';
import SocialButtonNew from './SocialButtonNew';
import NaverIcon from '../../../img/naver-icon.png';
import SocialButton from '../../login/SocialButton';
import KakaoIcon from '../../../img/kakao-logo.png';

function KakLogin() {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const kakaoLoginForm = () => {
    try {
      const { Kakao } = window;

      Kakao.Auth.loginForm({
        success(authObj) {
          Kakao.API.request({
            url: '/v2/user/me',
            success(response) {
              const { id, kakao_account } = response;
              axios.get('/api/TB_INFLUENCER/kakaoLogin', {
                params: {
                  id,
                  email: kakao_account.email,
                  name: kakao_account.profile.nickname,
                  photo: kakao_account.profile.profile_image_url,
                  type: '1',
                  social_type: 'kakao'
                }
              }).then((influencerData) => {
                const {
                  social_type, userToken, userName, userPhone, userPhoto
                } = influencerData.data;
                auth.login(userToken, userName, social_type, userPhoto);
                if (userPhone) {
                  history.push('/');
                } else {
                  history.push('/profile');
                }
              });
            },
            fail(err2) {
              console.log(JSON.stringify(err2));
            }
          });
        },
        fail(err) {
          console.log(JSON.stringify(err));
        }
      });
    } catch (err) {
      alert(err.response.message);
    }
  };

  return (
    <SocialButtonNew onClick={kakaoLoginForm} icon={KakaoIcon} text="카카오 로그인" background="#F7E317" color="#3C1E1E" />
  );
}

export default KakLogin;
