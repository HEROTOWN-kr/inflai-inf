import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  Box, Divider, Grid, Hidden
} from '@material-ui/core';
import WhiteBlock from '../../../containers/WhiteBlock';
import PageTitle from '../PageTitle';
import StyledText from '../../../containers/StyledText';
import AuthContext from '../../../context/AuthContext';
import StyledTextField from '../../../containers/StyledTextField';
import DaumPostCode from '../../../containers/DaumPostCode';
import StyledImage from '../../../containers/StyledImage';
import StyledButton from '../../../containers/StyledButton';
import { Colors } from '../../../lib/Сonstants';
import Sns from '../Sns';
import defaultAccountImage from '../../../img/default_account_image.png';

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

function LabelComponent(props) {
  const { labelName } = props;
  return (
    <Box width="175px">
      <StyledText fontSize="15">
        {labelName}
      </StyledText>
    </Box>
  );
}

function UserInfo(props) {
  const {
    userInfo, setUserInfo, getUserInfo, setMessage, isMD
  } = props;
  const [imageUrl, setImageUrl] = useState('');
  const [noticeCheck, setNoticeCheck] = useState(false);
  const {
    register, handleSubmit, watch, errors, setValue, control, getValues
  } = useForm();
  const { token, userDataUpdate } = useContext(AuthContext);

  useEffect(() => {
    register({ name: 'photo' }, {});
  }, [register]);

  useEffect(() => {
    const {
      INF_NAME, INF_TEL, INF_POST_CODE, INF_ROAD_ADDR, INF_DETAIL_ADDR,
      INF_EXTR_ADDR, INF_AREA, INF_PROD, INF_PHOTO, INF_MESSAGE
    } = userInfo;

    setValue('nickName', INF_NAME);
    setValue('phone', INF_TEL);
    setValue('postcode', INF_POST_CODE);
    setValue('roadAddress', INF_ROAD_ADDR);
    setValue('detailAddress', INF_DETAIL_ADDR);
    setValue('extraAddress', INF_EXTR_ADDR);
    setValue('region', INF_AREA || '0');
    setValue('product', INF_PROD);
    setNoticeCheck(INF_MESSAGE === 1);

    userDataUpdate(INF_NAME, INF_PHOTO);
  }, [userInfo]);

  const updateProfile = async (data) => {
    try {
      const apiObj = { ...data, token };
      apiObj.message = noticeCheck ? 1 : 0;

      await axios.post('/api/TB_INFLUENCER/updateInfo', apiObj);

      if (data.photo) {
        const { photo } = data;
        const formData = new FormData();
        formData.append('file', photo);
        formData.append('token', token);
        return axios.post('/api/TB_INFLUENCER/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(async (response) => {
          await getUserInfo();
          setMessage({ type: 'success', open: true, text: '신청되었습니다' });
        }).catch(err => alert('photo upload error'));
      }
      await getUserInfo();
      setMessage({ type: 'success', open: true, text: '저장되었습니다' });
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
    await axios.post('/api/TB_INFLUENCER/delete', { token }).catch(err => alert('pic delete error'));
    setImageUrl(null);
    setValue('photo', null);
    getUserInfo();
  }

  function onCheckboxClick(checked) {
    setNoticeCheck(checked);
  }

  return (
    <WhiteBlock borderRadius={isMD ? '7px' : '0'}>
      <Hidden smDown>
        <PageTitle>
          <StyledText fontSize="24">
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
                      <LabelComponent labelName="이메일 아이디" />
                    </Grid>
                    <Grid item xs={12} md>
                      <StyledText fontSize="15">
                        {userInfo.INF_EMAIL || ''}
                      </StyledText>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <LabelComponent labelName="이름" />
                  </Grid>
                  <Grid item xs={12} md>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <StyledTextField
                          fullWidth
                          name="nickName"
                          defaultValue={userInfo.INF_NAME || ''}
                          inputRef={register({ required: true })}
                          error={!!errors.nickName}
                          variant="outlined"
                          helperText={errors.nickName ? (
                            <span className="error-message">이름을 입력해주세요</span>
                          ) : null}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <LabelComponent labelName="전화번호" />
                  </Grid>
                  <Grid item xs={12} md>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <StyledTextField
                          fullWidth
                          name="phone"
                          defaultValue={userInfo.INF_TEL || ''}
                          inputRef={register({ required: true })}
                          error={!!errors.phone}
                          variant="outlined"
                          helperText={errors.phone ? (
                            <span className="error-message">전화번호를 입력해주세요</span>
                          ) : null}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <LabelComponent labelName="주소" />
                  </Grid>
                  <Grid item xs={12} md>
                    <DaumPostCode setValue={setValue} register={register} errors={errors} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box py={2}>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <LabelComponent labelName="사진" />
                    </Grid>
                    <Grid item xs={12} md>
                      <Grid container alignItems="center" spacing={2} justify={isMD ? 'flex-start' : 'center'}>
                        <Grid item>
                          <StyledImage
                            width="110px"
                            height="110px"
                            borderRadius="100%"
                            src={imageUrl || userInfo.INF_PHOTO || defaultAccountImage}
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
                                style={{ display: 'none' }}
                                                              // multiple
                                accept="image/*"
                                onChange={(event => addPicture(event))}
                              />
                            </ImageActionButton>
                          </label>
                          {userInfo.INF_PHOTO ? (
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
                    <LabelComponent labelName="카카오수신동의" />
                  </Grid>
                  <Grid item xs={12} md>
                    <input id="kakaoCheck" type="checkbox" checked={noticeCheck} onChange={e => onCheckboxClick(e.target.checked)} />
                    <label htmlFor="kakaoCheck">
                      {' 카카오톡 통한 캠페인 모집 및 추천, 이벤트 정보 등의 수신에 동의합니다.'}
                    </label>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box pt={isMD ? 4 : 0}>
              <Grid container justify="center">
                <Grid item>
                  <Box width="280px">
                    <StyledButton
                      onClick={handleSubmit(updateProfile)}
                      background={Colors.skyBlue}
                      hoverBackground="#1c4dbb"
                    >
                      저장
                    </StyledButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box pb={4}>
              <StyledText fontSize="19" fontWeight="600">SNS</StyledText>
            </Box>
            <Sns {...props} LabelComponent={LabelComponent} />
          </Grid>
        </Grid>
        <Box px={2} />
      </Box>
    </WhiteBlock>
  );
}

export default UserInfo;
