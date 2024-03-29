import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Checkbox, CircularProgress, Divider, Grid, Hidden, Snackbar, TextareaAutosize, TextField
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import StyledText from '../../containers/StyledText';
import { Colors, snsTypes } from '../../lib/Сonstants';
import ReactFormText from '../../containers/ReactFormText';
import DaumPostCode from '../../containers/DaumPostCode';
import StyledImage from '../../containers/StyledImage';
import noImage from '../../img/noImage.png';
import StyledButton from '../../containers/StyledButton';
import instagramIcon from '../../img/instagram.png';
import youtubeIcon from '../../img/youtube.png';
import blogIcon from '../../img/icon_blog_url.png';
import AuthContext from '../../context/AuthContext';
import TopMenu from './TopMenu';
import StyledBackDrop from '../../containers/StyledBackDrop';

const defaultValues = {
  insta: false,
  youtube: false,
  naver: false,
  name: '',
  receiverName: '',
  phone: '',
  email: '',
  postcode: '',
  roadAddress: '',
  detailAddress: '',
  extraAddress: '',
  delivery: ''
};

function SnsBlock({ item }) {
  const { name, checked } = item;
  if (!checked) return null;
  return (
    <Grid item xs={4}>
      <Box p={1} border={`1px solid ${snsTypes[`${name === 'instagram' ? '1' : '3'}`].color}`}>
        <StyledText textAlign="center" fontSize="13px" color={snsTypes[`${name === 'instagram' ? '1' : '3'}`].color} fontWeight="bold">{snsTypes[`${name === 'instagram' ? '1' : '3'}`].textKr}</StyledText>
      </Box>
    </Grid>
  );
}

function ApplyFormComponent(componentProps) {
  const { title, children } = componentProps;
  return (
    <Grid container alignItems="center">
      <Grid item xs={12} md="auto">
        <Box width={{ xs: '115px', lg: '187px' }} fontWeight="bold" fontSize="16px">
          {title}
        </Box>
      </Grid>
      <Grid item xs={12} md={9}>
        <Box py={{ xs: 2, md: 5 }}>{children}</Box>
      </Grid>
    </Grid>
  );
}

function CampaignApply(props) {
  const { match, history } = props;
  const [applyData, setApplyData] = useState({});
  const [addData, setAddData] = useState({ TB_PHOTO_ADs: [], AD_TYPE: '1' });
  const [isSticky, setSticky] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const { token } = useContext(AuthContext);

  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));

  const schema = Yup.object().shape({
    sns: Yup.string()
      .when(['naver', 'youtube', 'insta'], {
        is: (naver, youtube, insta) => !naver && !youtube && !insta,
        then: Yup.string().required('SNS를 선택해주세요'),
      }),
    name: Yup.string()
      .required('이름을 입력해주세요'),
    message: Yup.string()
      .required('신청한마디를 입력해주세요'),
    receiverName: Yup.string()
      .when(['delivery'], {
        is: delivery => delivery === '1',
        then: Yup.string().required('제공상품 수령인을 입력해주세요'),
      }),
    postcode: Yup.string()
      .when(['delivery'], {
        is: delivery => delivery === '1',
        then: Yup.string().required('우편번호를 입력해주세요'),
      }),
    roadAddress: Yup.string()
      .when(['delivery'], {
        is: delivery => delivery === '1',
        then: Yup.string().required('도로명주소를 입력해주세요'),
      }),
    detailAddress: Yup.string()
      .when(['delivery'], {
        is: delivery => delivery === '1',
        then: Yup.string().required('상세주소를 입력해주세요'),
      }),
    phone: Yup.string()
      .required('연락처를 입력해주세요'),
    email: Yup.string()
      .email('잘못된 이메일 형식 입니다')
      .required('이메일을 입력해주세요'),
  });

  const {
    register, handleSubmit, reset, errors, setValue, control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  const handleScroll = () => {
    setSticky(window.pageYOffset > 80);
  };


  async function getAddInfo() {
    try {
      const response = await axios.get('/api/TB_AD/campaignDetail', { params: { id: match.params.id, } });
      const { data } = response.data;

      const { AD_REPORT_TYPES, ...rest } = data;
      const dataObj = { ...rest };
      if (AD_REPORT_TYPES) dataObj.AD_REPORT_TYPES = JSON.parse(AD_REPORT_TYPES);

      if (dataObj) {
        setAddData(dataObj);
        setValue('delivery', data.AD_DELIVERY.toString());
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function getApplicantInfo() {
    try {
      const response = await axios.get('/api/TB_INFLUENCER/getApplicant', { params: { token } });
      const { data } = response.data;
      if (data) {
        setApplyData(data);
        const {
          INF_NAME, INF_EMAIL, INF_TEL, INF_POST_CODE, INF_ROAD_ADDR, INF_DETAIL_ADDR,
          INF_EXTR_ADDR
        } = data;

        const resetObj = {
          ...defaultValues,
          name: INF_NAME,
          receiverName: INF_NAME,
          phone: INF_TEL,
          email: INF_EMAIL,
          postcode: INF_POST_CODE,
          roadAddress: INF_ROAD_ADDR,
          detailAddress: INF_DETAIL_ADDR,
          extraAddress: INF_EXTR_ADDR
        };

        reset(resetObj);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const apiObj = {
        ...data,
        adId: match.params.id,
        token
      };

      axios.post('/api/TB_PARTICIPANT/save', apiObj).then((res) => {
        if (res.status === 201) {
          alert(res.data.message);
          history.push(`/Campaign/detail/${match.params.id}`);
        } else {
          enqueueSnackbar('신청되었습니다', { variant: 'success' });
          history.push(`/Campaign/detail/${match.params.id}`);
        }
      }).catch((err) => {
        alert(err.response.data.message);
      }).then(() => {
        setIsLoading(false);
      });
    } catch (err) {
      alert(err);
      setIsLoading(false);
    }
  };

  function toggleLoading() {
    setIsLoading(!isLoading);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  useEffect(() => {
    if (token) {
      getApplicantInfo();
      getAddInfo();
    }
  }, [token]);

  return (
    <Box maxWidth="1160px" margin="0 auto" className="campaign-detail">
      <Hidden mdUp>
        <TopMenu title="캠페인 신청하기" history={history} />
      </Hidden>
      <Grid container>
        <Grid item xs>
          <Box py={isMD ? 6 : 2} pr={isMD ? 6 : 2} pl={isLG ? 0 : 2}>
            {isMD ? (
              <React.Fragment>
                <StyledText fontSize="28px" fontWeight="bold">캠페인 신청하기</StyledText>
                <Box mt={3} mb={2}>
                  <Divider />
                </Box>
              </React.Fragment>
            ) : null}

            {addData.AD_TYPE === '5' ? null : (
              <Grid container alignItems="center">
                <Grid item xs={12} md="auto">
                  <Box py={{ xs: 0, md: 5 }} width={{ xs: '115px', lg: '187px' }}>
                    <StyledText fontWeight="bold" fontSize="16px">
                        SNS
                    </StyledText>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box py={{ xs: 2, md: 5 }} borderBottom={{ md: `1px solid ${Colors.grey7}` }}>
                    <Grid container alignItems="center">
                      {addData.AD_TYPE === '1' ? (
                        <Grid item xs={12}>
                          <Grid container alignItems="center">
                            <Grid item>
                              <Box p="4px" border="1px solid #e9ecef" borderRight="0">
                                <Controller
                                  name="insta"
                                  control={control}
                                  render={checkBoxProps => (
                                    <Checkbox
                                      onChange={e => checkBoxProps.onChange(e.target.checked)}
                                      checked={checkBoxProps.value}
                                      disabled={!applyData.instaUserName || applyData.INS_STATUS === 0}
                                    />
                                  )}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs md={5}>
                              <Box py={2} px={4} border="1px solid #e9ecef">
                                <Grid container justify="center" spacing={1} alignItems="center">
                                  <Grid item>
                                    <StyledImage width="18px" height="18px" src={instagramIcon} />
                                  </Grid>
                                  <Grid item>
                                    <StyledText>{applyData.instaUserName || '인스타그램'}</StyledText>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Grid>
                            { applyData.instaUserName ? null : (
                              <Grid item>
                                <Box
                                  padding="18px"
                                  border="1px solid #e9ecef"
                                  borderLeft="0"
                                  css={{ cursor: 'pointer' }}
                                  onClick={() => history.push('/Profile/UserInfo')}
                                >
                                  <StyledText>연결하기</StyledText>
                                </Box>
                              </Grid>
                            ) }
                            { applyData.INS_STATUS === 0 ? (
                              <React.Fragment>
                                <Grid item>
                                  <Box
                                    padding="18px"
                                    border="1px solid #e9ecef"
                                    borderLeft="0"
                                    css={{ cursor: 'pointer' }}
                                    onClick={() => history.push('/Profile/UserInfo')}
                                  >
                                    <StyledText>재연결</StyledText>
                                  </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <Box fontSize="14px" color="#da910c">페이스북 비번을 바꾸거나 인스타 연동 후 60일 지나거나 인스타 비즈니스 계정 취소할때 인스타 계정 재연결 해야 됩니다</Box>
                                </Grid>
                              </React.Fragment>
                            ) : null }
                          </Grid>
                        </Grid>
                      ) : null}
                      {addData.AD_TYPE === '2' ? (
                        <Grid item xs={12}>
                          <Grid container alignItems="center">
                            <Grid item>
                              <Box p="4px" border="1px solid #e9ecef" borderRight="0">
                                <Controller
                                  name="youtube"
                                  control={control}
                                  render={checkBoxProps => (
                                    <Checkbox
                                      onChange={e => checkBoxProps.onChange(e.target.checked)}
                                      checked={checkBoxProps.value}
                                      disabled={!applyData.youtubeChannelName}
                                    />
                                  )}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs md={5}>
                              <Box py={2} px={4} border="1px solid #e9ecef">
                                <Grid container justify="center" spacing={1} alignItems="center">
                                  <Grid item>
                                    <StyledImage width="18px" height="18px" src={youtubeIcon} />
                                  </Grid>
                                  <Grid item>
                                    <StyledText>{applyData.youtubeChannelName || '유튜브'}</StyledText>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Grid>
                            { applyData.youtubeChannelName ? null : (
                              <Grid item>
                                <Box
                                  padding="18px"
                                  border="1px solid #e9ecef"
                                  borderLeft="0"
                                  css={{ cursor: 'pointer' }}
                                  onClick={() => history.push('/Profile/Sns/Youtube')}
                                >
                                  <StyledText>연결하기</StyledText>
                                </Box>
                              </Grid>
                            ) }
                          </Grid>
                        </Grid>
                      ) : null}
                      {addData.AD_TYPE === '3' ? (
                        <Grid item xs={12}>
                          <Grid container alignItems="center">
                            <Grid item>
                              <Box p="4px" border="1px solid #e9ecef" borderRight="0">
                                <Controller
                                  name="naver"
                                  control={control}
                                  render={checkBoxProps => (
                                    <Checkbox
                                      onChange={e => checkBoxProps.onChange(e.target.checked)}
                                      checked={checkBoxProps.value}
                                      disabled={!applyData.naverChannelName}
                                    />
                                  )}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs md={5}>
                              <Box py={2} px={4} border="1px solid #e9ecef">
                                <Grid container justify="center" spacing={1} alignItems="center">
                                  <Grid item>
                                    <StyledImage width="18px" height="18px" src={blogIcon} />
                                  </Grid>
                                  <Grid item>
                                    <StyledText overflowHidden>{applyData.naverChannelName || '블로그'}</StyledText>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Grid>
                            { applyData.naverChannelName ? null : (
                              <Grid item>
                                <Box
                                  padding="18px"
                                  border="1px solid #e9ecef"
                                  borderLeft="0"
                                  css={{ cursor: 'pointer' }}
                                  onClick={() => history.push('/Profile/Sns/NaverBlog')}
                                >
                                  <StyledText>연결하기</StyledText>
                                </Box>
                              </Grid>
                            ) }
                          </Grid>
                        </Grid>
                      ) : null}
                      { errors.sns ? (
                        <div className="error-message">
                          {errors.sns.message}
                        </div>
                      ) : null }
                      <input
                        type="text"
                        readOnly
                        name="sns"
                        ref={register}
                        style={{
                          opacity: '0', width: '0', padding: '0', border: '0', height: '0'
                        }}
                      />
                      <input
                        type="text"
                        readOnly
                        name="delivery"
                        ref={register}
                        style={{
                          opacity: '0', width: '0', padding: '0', border: '0', height: '0'
                        }}
                      />
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            )}

            <ApplyFormComponent title="이름">
              <ReactFormText register={register} errors={errors} name="name" />
            </ApplyFormComponent>
            <ApplyFormComponent title="신청한마디">
              <TextareaAutosize ref={register} rowsMin={8} style={{ width: '99%' }} placeholder="신청한마디" name="message" />
              { errors.message ? (
                <div className="error-message">{errors.message.message}</div>
              ) : null }
            </ApplyFormComponent>
            {addData.AD_DELIVERY ? (
              <React.Fragment>
                <ApplyFormComponent title="제공상품 수령인">
                  <ReactFormText register={register} errors={errors} name="receiverName" />
                </ApplyFormComponent>
                <ApplyFormComponent title="제공상품 배송지">
                  <DaumPostCode setValue={setValue} register={register} errors={errors} />
                </ApplyFormComponent>
              </React.Fragment>
            ) : null}
            <ApplyFormComponent title="연락처">
              <ReactFormText register={register} errors={errors} name="phone" />
            </ApplyFormComponent>
            <ApplyFormComponent title="메일주소">
              <ReactFormText register={register} errors={errors} name="email" />
            </ApplyFormComponent>
          </Box>
        </Grid>
        {isMD ? (
          <Grid item style={{ borderLeft: '1px solid #eee' }}>
            <Box width="360px" position="relative">
              <Box position="absolute" top={isSticky ? '-85px' : '0'} left="0">
                <Box position={isSticky ? 'fixed' : 'static'}>
                  <Box py={isMD ? 6 : 2} pl={isLG ? 6 : 2} pr={isLG ? 0 : 2} width="312px">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <StyledImage width="100%" height="300px" src={addData.TB_PHOTO_ADs.length > 0 ? addData.TB_PHOTO_ADs[0].PHO_FILE_URL : noImage} />
                        <Box py={3}><StyledText overflowHidden fontSize="20px" fontWeight="bold">{addData.AD_NAME}</StyledText></Box>
                        <StyledText overflowHidden fontSize="15px">{addData.AD_SHRT_DISC}</StyledText>
                        <Box pt={2}>
                          { addData.AD_TYPE !== '4' ? (
                            <Box width="30%" p={1} border={`1px solid ${snsTypes[addData.AD_TYPE].color}`}>
                              <StyledText textAlign="center" fontSize="13px" color={snsTypes[addData.AD_TYPE].color} fontWeight="bold">{snsTypes[addData.AD_TYPE].textKr}</StyledText>
                            </Box>
                          ) : (
                            <Grid container spacing={1}>
                              { addData.AD_REPORT_TYPES.map(item => (
                                <SnsBlock item={item} />
                              ))}
                            </Grid>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledText fontSize="14px" fontWeight="bold">리뷰어 신청  2020-11-01 ~ 2020-11-30</StyledText>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <StyledButton background={Colors.pink3} hoverBackground={Colors.pink} fontWeight="bold" fontSize="20px" onClick={handleSubmit(onSubmit)}>
                            캠페인 신청하기
                        </StyledButton>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        ) : null}
      </Grid>
      { isMD ? null : (
        <Box
          position="fixed"
          bottom="0"
          zIndex="2"
          borderTop={`1px solid ${Colors.grey7}`}
          width="100%"
          css={{ backgroundColor: Colors.white }}
        >
          <StyledButton variant="text" height={60} borderRadius="0" onClick={handleSubmit(onSubmit)}>신청하기</StyledButton>
        </Box>
      ) }
      <StyledBackDrop open={isLoading} handleClose={toggleLoading} />
    </Box>
  );
}

export default CampaignApply;
