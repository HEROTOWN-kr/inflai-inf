import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Box, Button, Checkbox, Divider, Grid, Hidden, FormControlLabel, Typography, makeStyles
} from '@material-ui/core';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import WhiteBlock from '../../../../containers/WhiteBlock';
import PageTitle from '../../PageTitle';
import StyledText from '../../../../containers/StyledText';
import AuthContext from '../../../../context/AuthContext';
import StyledTextField from '../../../../containers/StyledTextField';
import DaumPostCode from '../../../../containers/DaumPostCode';
import StyledImage from '../../../../containers/StyledImage';
import StyledButton from '../../../../containers/StyledButton';
import { Colors } from '../../../../lib/Сonstants';
import Sns from './Sns';
import defaultAccountImage from '../../../../img/default_account_image.png';
import DaumPostCodeMobile from '../../../../containers/DaumPostCodeMobile';
import CategoryDialog from '../../../navbar/MobileView/CategoryDialog';
import DaumPostCodeDialog from '../../../../containers/DaumPostCodeDialog';
import ReactFormText from '../../../../containers/ReactFormText';
import SocialLogin from './SocialLogin/SocialLogin';
import LabelComponent from './LabelComponent';
import PasswordChange from './PasswordChange/PasswordChange';
import UserDelete from './UserDelete';

function ImageActionButton(props) {
  const {
    children, color, background, onClick
  } = props;

  const styles = {
    cursor: 'pointer',
    background: background || 'red',
    color: color || '#ffffff',
    borderRadius: '12px',
    fontSize: '14px',
    padding: '3px 16px'
  };

  return (
    <div style={styles} onClick={onClick}>
      {children}
    </div>
  );
}

Yup.addMethod(Yup.string, 'integerString', function () {
  return this.matches(/^\d+$/, '숫자 입력만 가능합니다');
});

const schema = Yup.object().shape({
  nickName: Yup.string().required('이름을 입력해주세요'),
  phone: Yup.string().required('연락처를 입력해주세요').integerString(),
  postcode: Yup.string().required('우편번호를 입력해주세요'),
  roadAddress: Yup.string().required('도로명주소를 입력해주세요'),
  detailAddress: Yup.string().required('상세주소를 입력해주세요'),
});

const defaultValues = {
  nickName: '',
  phone: '',
  postcode: '',
  roadAddress: '',
  detailAddress: '',
  extraAddress: '',
  message: false,
};

const useStyles = makeStyles({
  label: {
    fontSize: '13px'
  }
});

function UserInfo(props) {
  const { isMD } = props;
  const [imageUrl, setImageUrl] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const { token, userDataUpdate } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const {
    register, handleSubmit, reset, errors, setValue, control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  function getUserInfo() {
    axios.get('/api/TB_INFLUENCER/', { params: { token } }).then((res) => {
      const { data } = res.data;
      const {
        INF_EMAIL, INF_NAME, INF_TEL, INF_POST_CODE, INF_ROAD_ADDR, INF_DETAIL_ADDR,
        INF_EXTR_ADDR, INF_PHOTO_URL, INF_MESSAGE, TB_INSTum, TB_YOUTUBE, TB_NAVER
      } = data;
      reset({
        nickName: INF_NAME,
        phone: INF_TEL,
        postcode: INF_POST_CODE,
        roadAddress: INF_ROAD_ADDR,
        detailAddress: INF_DETAIL_ADDR,
        extraAddress: INF_EXTR_ADDR,
        message: INF_MESSAGE === 1,
      });
      setUserInfo({
        TB_INSTum, TB_YOUTUBE, TB_NAVER, INF_PHOTO_URL, INF_EMAIL
      });
      userDataUpdate(INF_NAME, INF_PHOTO_URL);
    });
  }

  useEffect(() => {
    register({ name: 'photo' });
  }, [register]);

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  const updateProfile = async (data) => {
    try {
      const apiObj = { ...data, message: data.message ? 1 : 0, token };

      await axios.post('/api/TB_INFLUENCER/updateInfo', apiObj);
      if (data.photo) {
        const { photo } = data;
        const formData = new FormData();
        formData.append('file', photo);
        formData.append('token', token);
        return axios.post('/api/TB_INFLUENCER/uploadAWS', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(async (response) => {
          getUserInfo();
          enqueueSnackbar('저장되었습니다', { variant: 'success' });
        }).catch(err => alert('photo upload error'));
      }
      getUserInfo();
      enqueueSnackbar('저장되었습니다', { variant: 'success' });
    } catch (err) {
      alert(err.message);
    }
  };

  function addPicture(event) {
    setValue('photo', event.target.files[0]);
    const picture = event.target.files[0];
    const picUrl = URL.createObjectURL(picture);
    setImageUrl(picUrl);
  }

  async function deletePicture() {
    await axios.post('/api/TB_INFLUENCER/deleteAWS', { token }).catch(err => alert('pic delete error'));
    setImageUrl(null);
    setValue('photo', null);
    getUserInfo();
  }

  return (
    <WhiteBlock borderRadius={isMD ? '7px' : '0'}>
      <Hidden smDown>
        <PageTitle>
          <StyledText fontSize="24px">
            회원정보수정
          </StyledText>
        </PageTitle>
      </Hidden>
      <Box py={isMD ? 4 : 1} px={isMD ? 6 : 2}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box py={1}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <LabelComponent fontSize="15px" labelName="이메일 아이디" />
                    </Grid>
                    <Grid item xs={12} md>
                      <StyledText fontSize="15px">
                        {userInfo.INF_EMAIL || ''}
                      </StyledText>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <LabelComponent fontSize="15px" labelName="이름" />
                  </Grid>
                  <Grid item xs={12} md>
                    <Box width={isMD ? '250px' : '100%'}>
                      <ReactFormText
                        register={register}
                        errors={errors}
                        name="nickName"
                        placeholder="이름"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <LabelComponent fontSize="15px" labelName="전화번호" />
                  </Grid>
                  <Grid item xs={12} md>
                    <Box width={isMD ? '250px' : '100%'}>
                      <ReactFormText
                        register={register}
                        errors={errors}
                        name="phone"
                        placeholder="전화번호"
                      />
                    </Box>
                    <Box fontSize="13px" color={Colors.grey2}>
                      ※ 전화번호는 한번만 기입하시면 캠페인신청카톡알림 및 상품수령시 계속 사용이 됩니다. 정확한 전화번호로 기입해주세요.
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <LabelComponent fontSize="15px" labelName="주소" />
                  </Grid>
                  <Grid item xs={12} md>
                    <Box maxWidth={isMD ? '500px' : 'none'}>
                      <DaumPostCode setValue={setValue} register={register} errors={errors} />
                      <Box fontSize="13px" color={Colors.grey2}>
                        ※ 주소는 한번만 기입하시면 향후 제품수령시 자동으로 사용이 됩니다. 정확하게 기입해주세요.
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box py={2}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <LabelComponent fontSize="15px" labelName="사진" />
                    </Grid>
                    <Grid item xs={12} md>
                      <Grid container alignItems="center" spacing={2} justify={isMD ? 'flex-start' : 'center'}>
                        <Grid item>
                          <StyledImage
                            width="110px"
                            height="110px"
                            borderRadius="100%"
                            src={imageUrl || userInfo.INF_PHOTO_URL || defaultAccountImage}
                          />
                        </Grid>
                        <Grid item>
                          <label htmlFor="picAdd">
                            <ImageActionButton background="#00a1ff">
                                                          이미지 등록
                              <input
                                id="picAdd"
                                name="photo"
                                type="file"
                                style={{
                                  opacity: '0', width: '0', padding: '0', border: '0', height: '0'
                                }}
                                accept="image/*"
                                onChange={(event => addPicture(event))}
                              />
                            </ImageActionButton>
                          </label>
                          {userInfo.INF_PHOTO_URL ? (
                            <Box pt={1}>
                              <ImageActionButton onClick={() => deletePicture(token)}>
                                                              이미지 삭제
                              </ImageActionButton>
                            </Box>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <LabelComponent fontSize="15px" labelName="카카오수신동의" />
                  </Grid>
                  <Grid item xs={12} md>
                    <Controller
                      name="message"
                      control={control}
                      render={checkBoxProps => (
                        <FormControlLabel
                          control={(
                            <Checkbox
                              onChange={e => checkBoxProps.onChange(e.target.checked)}
                              checked={checkBoxProps.value}
                            />
                             )}
                          label={(
                            <Typography classes={{ body1: classes.label }}>
                            카카오톡 통한 캠페인 모집 및 추천, 이벤트 정보 등의 수신에 동의합니다.
                            </Typography>
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box pt={isMD ? 4 : 0}>
              <Grid container alignItems="flex-end">
                <Grid item xs={4} />
                <Grid item xs={4}>
                  <Box width={{ xs: '100%', md: '280px' }} m="0 auto">
                    <StyledButton
                      onClick={handleSubmit(updateProfile)}
                      background={Colors.skyBlue}
                      hoverBackground="#1c4dbb"
                    >
                      저장
                    </StyledButton>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box textAlign="right">
                    <UserDelete />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Box py={4}>
          <Box pb={4}>
            <StyledText fontSize="19px" fontWeight="600">SNS</StyledText>
          </Box>
          <Sns {...props} userInfo={userInfo} getUserInfo={getUserInfo} />
        </Box>
        <Divider />
        <SocialLogin />
        <Divider />
        <PasswordChange />
      </Box>
    </WhiteBlock>
  );
}

export default UserInfo;
