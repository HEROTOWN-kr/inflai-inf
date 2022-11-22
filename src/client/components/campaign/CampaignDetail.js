import React, {
  useCallback,
  useContext, useEffect, useRef, useState
} from 'react';
import {
  Grid, Divider, CircularProgress, Button, Box, Hidden, IconButton, makeStyles, Typography
} from '@material-ui/core';
import axios from 'axios';
import {
  Sync, Favorite, FavoriteBorder, Print, Share, Error, SupervisorAccount, ExpandMore, ExpandLess, ChevronRight, FiberManualRecord
} from '@material-ui/icons';
import ReactHtmlParser from 'react-html-parser';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import { Skeleton } from '@material-ui/lab';
import MetaTags from 'react-meta-tags';
import { useSnackbar } from 'notistack';
import { Colors, AdvertiseTypes, ratings, snsTypes } from '../../lib/Сonstants';
import IconYoutube from '../../img/icon_youtube_url.png';
import IconInsta from '../../img/icon_instagram_url.png';
import IconBlog from '../../img/icon_blog_url.png';
import StyledText from '../../containers/StyledText';
import StyledImage from '../../containers/StyledImage';
import StyledSvg from '../../containers/StyledSvg';
import StyledButton from '../../containers/StyledButton';
import defaultAccountImage from '../../img/default_account_image.png';
import AuthContext from '../../context/AuthContext';
import TopMenu from './TopMenu';
import MyPagination from '../../containers/MyPagination';
import SelectedList from './SelectedList';
import CampaignShareDialog from './CampaignShareDialog';

const useStyles = makeStyles({
  root: {
    color: Colors.pink3
  },
  linkText: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  rightMenu: {
    borderBottom: 'solid 1px #efefef',
    cursor: 'pointer',
    '&:hover': {
      color: '#000',
      backgroundColor: '#fafafa'
    }
  },
  record: {
    fontSize: '0.35rem',
    marginRight: '7px'
  },
  num: {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: '600'
  }
});

const RightMenuLinks = [
  {
    text: '캠페인 상세정보',
    link: 'detail'
  },
  {
    text: '제공내역',
    link: 'provide'
  },
  {
    text: '참조할 링크',
    link: 'links'
  },
  {
    text: '검색 키워드',
    link: 'search'
  },
  {
    text: '포스팅가이드',
    link: 'discription'
  },
  {
    text: '업체 정보',
    link: 'info'
  },
];

const SnsType = ({ item }) => {
  const { name, checked } = item;
  if (!checked) return null;
  return (
    <Grid item>
      <StyledImage
        width="21px"
        height="21px"
        src={snsTypes[`${name === 'instagram' ? '1' : '3'}`]?.icon || defaultAccountImage}
      />
    </Grid>
  );
};

function TimeComponent(props) {
  const [seconds, setSeconds] = useState(0);
  const [leftData, setLeftData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { FinalDate } = props;
  const currentDate = new Date();
  const endDate = new Date(FinalDate);
  const currentDateSec = Math.round(currentDate.getTime() / 1000);
  const endDateSec = Math.round(endDate.getTime() / 1000);
  const secondsLeft = endDateSec - currentDateSec; // 1440516958

  const classes = useStyles();

  useEffect(() => {
    if (seconds > 0) {
      const d = Math.floor(seconds / (3600 * 24));
      const h = Math.floor(seconds % (3600 * 24) / 3600);
      const m = Math.floor(seconds % 3600 / 60);
      const s = Math.floor(seconds % 60);
      setLeftData({
        days: d, hours: h, minutes: m, seconds: s
      });
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  }, [seconds]);

  useEffect(() => {
    if (FinalDate) {
      setSeconds(secondsLeft);
    }
  }, [FinalDate]);

  return (
    <Box fontSize="14px" color="#000000">
        남은시간&nbsp;&nbsp;
      <span className={classes.num}>{leftData.days}</span>
        일&nbsp;&nbsp;
      <span className={classes.num}>{leftData.hours}</span>
        시간&nbsp;&nbsp;
      <span className={classes.num}>{leftData.minutes}</span>
        분&nbsp;&nbsp;
      <span className={classes.num}>{leftData.seconds}</span>
        초&nbsp;&nbsp;
    </Box>
  );
}

function TabComponent(props) {
  const {
    tab, setTab, text, tabNumber, isMD
  } = props;
  const styles = tab === tabNumber ? {
    border: `3px solid ${Colors.pink2}`,
    fontWeight: 'bold'
  } : {
    border: '0',
    fontWeight: '400'
  };


  return (
    <Box
      padding={{ xs: '13px 5px', md: '13px 20px' }}
      borderBottom={styles.border}
      css={{ cursor: 'pointer' }}
      onClick={() => setTab(tabNumber)}
    >
      <StyledText fontSize={isMD ? '16px' : '14px'} fontWeight={styles.fontWeight} textAlign="center">{text}</StyledText>
    </Box>
  );
}

function ParticipantList(props) {
  const { adId, type, isMD } = props;
  const [participants, setParticipants] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 10;

  const changePage = (event, value) => {
    setPage(value);
  };

  function getParticipants() {
    axios.get('/api/TB_PARTICIPANT/getList', {
      params: {
        adId, type, limit, page
      }
    }).then((res) => {
      const { data } = res.data;
      setParticipants(data);
      setCount(res.data.count);
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    if (type) getParticipants();
  }, [type, page]);

  return (
    <>
      {participants.length === 0 ? (
        <Box py={4}>
          <Grid container justify="center">
            <Grid item>
                  신청한 리뷰어 없습니다
            </Grid>
          </Grid>
        </Box>
      ) : (
        <React.Fragment>
          {participants.map(item => (
            <Box key={item.PAR_ID} py={2} borderBottom={`1px solid ${Colors.grey7}`}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <StyledImage borderRadius="100%" width={isMD ? '90px' : '60px'} height={isMD ? '90px' : '60px'} src={item.INF_PHOTO_URL || defaultAccountImage} onError={event => event.target.setAttribute('src', defaultAccountImage)} />
                </Grid>
                <Grid item xs>
                  <Grid container spacing={isMD ? 2 : 1}>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <StyledText fontSize="16px" fontWeight="bold">{item.PAR_NAME}</StyledText>
                        </Grid>
                        <Grid item>
                          <StyledImage width="21px" height="21px" src={ratings[item.INF_RATING].icon} />
                        </Grid>

                        {item.PAR_INSTA ? (
                          <Grid item><StyledImage width="21px" height="21px" src={IconInsta} /></Grid>
                        ) : null}
                        {item.PAR_YOUTUBE ? (
                          <Grid item><StyledImage width="21px" height="21px" src={IconYoutube} /></Grid>
                        ) : null}
                        {item.PAR_NAVER ? (
                          <Grid item><StyledImage width="21px" height="21px" src={IconBlog} /></Grid>
                        ) : null}

                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledText fontSize={isMD ? '15px' : '14px'} lineHeight="1.3em">{item.PAR_MESSAGE}</StyledText>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledText fontSize={isMD ? '15px' : '14px'}>
                        {item.PAR_DT}
                      </StyledText>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ))}
          {participants.length > 0 ? (
            <Box py={isMD ? 4 : 1}>
              <Grid container justify="center">
                <Grid item>
                  <MyPagination
                    itemCount={count}
                    page={page}
                    changePage={changePage}
                    perPage={limit}
                  />
                </Grid>
              </Grid>
            </Box>
          ) : null}
        </React.Fragment>
      )}
    </>
  );
}

function CampaignDetail() {
  const history = useHistory();
  const params = useParams();
  const adId = params.id;
  const classes = useStyles();
  const [productData, setProductData] = useState({
    AD_NAME: '',
    AD_PROVIDE: '',
    AD_SHRT_DISC: '',
    AD_DISC: '',
    TB_PHOTO_ADs: [],
    TB_PARTICIPANTs: [],
    AD_CTG: 0,
    AD_TYPE: '1'
  });
  const [currentImage, setCurrentImage] = useState('');
  const [isSticky, setSticky] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState({ visible: false, isOpen: false });
  const [tab, setTab] = useState(1);
  const [shareDialog, setShareDialog] = useState(false);
  const [liked, setLiked] = useState(false);
  const testImage = 'https://www.inflai.com/attach/portfolio/33/1yqw1whkavscxke.PNG';
  const { token } = useContext(AuthContext);
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const Scroller = Scroll.scroller;
  const ElementLink = Scroll.Element;

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setTimeout(() => {
        const showMoreButton = node.getBoundingClientRect().height > 760;
        if (showMoreButton) setShowMore({ ...showMore, visible: true });
      }, 500);
    }
  }, []);

  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  function toggleShowMore() {
    setShowMore({ ...showMore, isOpen: !showMore.isOpen });
  }

  function toggleShareDialog() {
    setShareDialog(!shareDialog);
  }

  const handleScroll = () => {
    setSticky(window.pageYOffset > 90);
  };

  function scrollTo(target) {
    setTimeout(() => {
      Scroller.scrollTo(target, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        ignoreCancelEvents: true
      });
    }, 1);
  }

  function getDetailData() {
    setLoading(true);
    const apiObj = {
      id: adId,
    };

    axios.get('/api/TB_AD/campaignDetail', {
      params: apiObj
    }).then((res) => {
      const { data } = res.data;
      const { AD_LINKS, AD_REPORT_TYPES, ...rest } = data;
      const dataObj = { ...rest };
      if (AD_LINKS) dataObj.AD_LINKS = JSON.parse(AD_LINKS);
      if (AD_REPORT_TYPES) dataObj.AD_REPORT_TYPES = JSON.parse(AD_REPORT_TYPES);

      setProductData(dataObj);
      setCurrentImage(data.TB_PHOTO_ADs[0].PHO_FILE_URL);
      setLoading(false);
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function sendRequest() {
    if (!token) {
      history.push('/Login');
    }
    axios.get('/api/TB_PARTICIPANT/checkParticipant', {
      params: { adId, token }
    }).then((res) => {
      if (res.status === 201) {
        enqueueSnackbar(res.data.data.message, { variant: 'success' });
      } else {
        history.push(`/Campaign/apply/${adId}`);
      }
    }).catch(error => alert(error.response.data.message));
  }

  function checkFavorites() {
    if (token) {
      axios.get('/api/TB_FAVORITES/check', {
        params: {
          adId,
          token
        }
      }).then((res) => {
        const { data } = res.data;
        if (data) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }).catch((error) => {
        alert(error.response.data.message);
      });
    }
  }

  function favoriteClick() {
    if (token) {
      if (!liked) {
        axios.post('/api/TB_FAVORITES/', { token, adId }).then((res) => {
          setLiked(true);
        }).catch(error => alert(error.response.data.message));
      } else {
        axios.post('/api/TB_FAVORITES/delete', { token, adId }).then((res) => {
          setLiked(false);
        }).catch(error => alert(error.response.data.message));
      }
    } else {
      history.push('/Login');
    }
  }

  function calculateDates(date) {
    const currentDate = new Date();
    const lastDate = new Date(date);
    const daysLag = Math.ceil(Math.abs(lastDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    return daysLag;
  }

  function addDays(data, days) {
    const date = new Date(data);
    date.setDate(date.getDate() + days);
    const yyyy = date.getFullYear();
    const month = date.getMonth() + 1;
    const mm = (month > 9 ? '' : '0') + month;
    const day = date.getDate();
    const dd = (day > 9 ? '' : '0') + day;
    return [yyyy, mm, dd].join('-');
  }

  useEffect(() => {
    getDetailData();
  }, []);

  useEffect(() => {
    checkFavorites();
  }, [token]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  const location = useLocation();
  const currentUrl = `https://influencer.inflai.com${location.pathname}`;

  return (
    <React.Fragment>
      {/* <HelmetMetaData title={productData.AD_NAME} description={productData.AD_SHRT_DISC} image={currentImage} /> */}
      <MetaTags>
        <title>인플라이체험단 인플루언서 페이지</title>
        <meta name="description" content="인플라이체험단 인플루언서 페이지" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={productData.AD_NAME} />
        <meta property="og:description" content={productData.AD_SHRT_DISC} />
        <meta property="og:image" content={currentImage || 'https://influencer.inflai.com/attach/video/logo_inflai-color.png'} />
      </MetaTags>
      <Box maxWidth="1160px" margin="0 auto" className="campaign-detail">
        <Hidden mdUp>
          <TopMenu title="캠페인 안내" history={history} />
        </Hidden>
        <Grid container>
          <Grid item xs>
            <Box py={isMD ? 6 : 2} pr={isMD ? 6 : 2} pl={isLG ? 0 : 2}>
              {loading ? (
                <Skeleton variant="text" height={33} />
              ) : (
                <Box fontSize={isMD ? '33px' : '20px'}>{productData.AD_NAME}</Box>
              )}
              <Box mt={isMD ? 3 : 2} mb={isMD ? 5 : 2}>
                {loading ? (
                  <Skeleton variant="text" height={16} />
                ) : (
                  <Box fontSize={isMD ? '16px' : '14px'} whiteSpace="pre-wrap" color={Colors.grey2}>
                    {productData.AD_SHRT_DISC}
                  </Box>
                )}
              </Box>
              <Hidden smDown>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Grid container>
                      <Grid item>
                        {liked ? (
                          <IconButton size="medium" onClick={favoriteClick}>
                            <Favorite style={{ color: Colors.pink3 }} />
                          </IconButton>
                        ) : (
                          <IconButton size="medium" onClick={favoriteClick}>
                            <FavoriteBorder style={{ color: Colors.grey8 }} />
                          </IconButton>
                        )}
                      </Grid>
                      <Grid item>
                        <IconButton size="medium" onClick={toggleShareDialog}>
                          <Share />
                        </IconButton>
                      </Grid>
                      {/* <Grid item><Print /></Grid> */}
                      {/* <Grid item><Error /></Grid> */}
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
              {loading ? (
                <Skeleton variant="rect" width="100%" height={435} />
              ) : (
                <StyledImage width="550px" height={isMD ? '435px' : 'auto'} src={currentImage || testImage} />
              )}
              <Box mt={1} mb={isMD ? 5 : 1}>
                <Grid container spacing={1}>
                  {productData.TB_PHOTO_ADs.map(item => (
                    <Grid item xs={2} key={item.PHO_FILE_URL}>
                      <StyledImage width="100%" src={item.PHO_FILE_URL} alt="noFoto" onMouseOver={() => setCurrentImage(item.PHO_FILE_URL)} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Grid container justify={isMD ? 'flex-end' : 'flex-start'} spacing={1}>
                <Grid item xs={12} md={7}>
                  <Box border={isMD ? `1px solid ${Colors.grey7}` : null} borderRadius="5px" px={isMD ? 3 : 0} pt={isMD ? 3 : 1} pb={isMD ? 6 : 4}>
                    <StyledText fontSize="16px" fontWeight="bold">리뷰어 신청현황</StyledText>
                    <Box mt={isMD ? 3 : 2}>
                      <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <StyledSvg
                              component={SupervisorAccount}
                              color={Colors.grey5}
                              fontSize="20px"
                            />
                            <StyledText overflowHidden fontSize="15px" color={Colors.grey5}>
                              <span style={{ color: Colors.pink, margin: '2px', fontWeight: 'bold' }}>{`${productData.TB_PARTICIPANTs.length} `}</span>
                                명
                            </StyledText>
                          </div>
                        </Grid>
                        <Grid item>
                          <StyledText overflowHidden fontSize="15px" color={Colors.grey5}>
                            <span style={{ color: Colors.black, fontWeight: 'bold' }}>{`${productData.AD_INF_CNT} `}</span>
                              명
                          </StyledText>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box mt={1} height="5px" borderRadius="50px" overflow="hidden" css={{ background: Colors.grey6 }}>
                      <Box height="4px" width={`${productData.proportion}%`} css={{ background: Colors.pink2 }} />
                    </Box>
                    <div style={{ position: 'relative', top: '9px', left: '-23px' }}>
                      <div
                        className="percent_bubble_layer"
                        style={{
                          position: 'absolute', top: '10', left: productData.proportion > 100 ? '100%' : `${productData.proportion}%`, padding: '5px 0'
                        }}
                      >
                        <StyledText fontSize="12px" color={Colors.pink}>{`${productData.proportion}%`}</StyledText>
                      </div>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Box border={isMD ? `1px solid ${Colors.grey7}` : null} borderRadius="5px" p={isMD ? 3 : 0} pt={isMD ? 3 : 1}>
                    <Grid container spacing={isMD ? 3 : 2}>
                      <Grid item xs={12}>
                        <Grid container justify="space-between">
                          <Grid item><StyledText fontWeight="bold">카테고리</StyledText></Grid>
                          <Grid item>
                            <Grid container>
                              { productData.AD_REPORT === '1' || productData.AD_CAM_TYPE === '3' ? (
                                <Grid item>
                                  <StyledText color={snsTypes['4'].color}>(기자단)&nbsp;</StyledText>
                                </Grid>
                              ) : null}
                              { productData.AD_CAM_TYPE === '2' ? (
                                <Grid item>
                                  <StyledText color={snsTypes['4'].color}>[공동구매]&nbsp;</StyledText>
                                </Grid>
                              ) : null}
                              <Grid item>
                                <StyledText>{`${AdvertiseTypes.mainType[productData.AD_CTG]}/${AdvertiseTypes.subType[productData.AD_CTG][productData.AD_CTG2]}`}</StyledText>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container justify="space-between">
                          <Grid item><StyledText fontWeight="bold">진행상태</StyledText></Grid>
                          <Grid item>
                            <StyledText color={Colors.pink}>
                              {`리뷰어신청 D-${calculateDates(productData.AD_SRCH_END)}`}
                            </StyledText>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container justify="space-between" alignItems="center">
                          <Grid item><StyledText fontWeight="bold">모집희망SNS</StyledText></Grid>
                          { productData.AD_TYPE !== '4' ? (
                            <Grid item><StyledImage width="21px" height="21px" src={snsTypes[productData.AD_TYPE]?.icon || defaultAccountImage} /></Grid>
                          ) : (
                            <Grid item>
                              <Grid container spacing={1}>
                                { productData.AD_REPORT_TYPES.map(item => (
                                  <SnsType item={item} />
                                ))}
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>

                      { isMD ? null : (
                        <>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container justify="space-between">
                              <Grid item><StyledText fontWeight="bold">리뷰어신청기간</StyledText></Grid>
                              <Grid item>
                                <StyledText>
                                  {`${productData.AD_SRCH_START} ~ ${productData.AD_SRCH_END}`}
                                </StyledText>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container justify="space-between">
                              <Grid item><StyledText fontWeight="bold">선정자 발표</StyledText></Grid>
                              <Grid item>
                                <StyledText>
                                  {`${productData.AD_SEL_START} ~ ${productData.AD_SEL_END}`}
                                </StyledText>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container justify="space-between">
                              <Grid item><StyledText fontWeight="bold">리뷰 등록기간</StyledText></Grid>
                              <Grid item>
                                <StyledText>
                                  {`${addDays(productData.AD_SEL_END, 1)} ~ ${addDays(productData.AD_SEL_END, 8)}`}
                                </StyledText>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      )}


                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Box mt={isMD ? 10 : 2} borderBottom={`1px solid ${Colors.grey7}`}>
                <Grid container>
                  <ElementLink name="detail" />
                  <Grid item xs={4} md="auto">
                    <TabComponent isMD={isMD} tab={tab} setTab={setTab} text="상세정보" tabNumber={1} />
                  </Grid>
                  <Grid item xs={4} md="auto">
                    <TabComponent isMD={isMD} tab={tab} setTab={setTab} text={`신청한 리뷰어 ${productData.TB_PARTICIPANTs.length}`} tabNumber={2} />
                  </Grid>
                  {productData.AD_SEL_VIEW === '1' ? (
                    <Grid item xs={4} md="auto">
                      <TabComponent isMD={isMD} tab={tab} setTab={setTab} text="선정 리뷰어" tabNumber={3} />
                    </Grid>
                  ) : null}
                </Grid>
              </Box>
              {tab === 1 ? (
                <Box style={{
                  textAlign: 'center',
                  maxHeight: showMore.isOpen ? 'none' : '760px',
                  overflow: 'hidden',
                  wordBreak: 'break-all'
                }}
                >
                  <div ref={measuredRef}>
                    {ReactHtmlParser(productData.AD_DETAIL)}
                  </div>
                </Box>
              ) : null}
              {tab === 2 ? (
                <ParticipantList adId={adId} type={productData.AD_TYPE} isMD={isMD} />
              ) : null}
              {tab === 3 ? (
                <SelectedList adId={adId} type={productData.AD_TYPE} isMD={isMD} />
              ) : null}
              {showMore.visible && tab === 1 ? (
                <Box mt={1} borderTop={`1px solid ${Colors.grey8}`}>
                  <StyledButton variant="text" background="#ffffff" color="#666" hoverBackground="#f8f8f8" onClick={toggleShowMore}>
                    {showMore.isOpen ? (
                      <React.Fragment>
                          상품정보접기
                        <ExpandLess />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        상품정보 더보기
                        <ExpandMore />
                      </React.Fragment>
                    )}
                  </StyledButton>
                </Box>
              ) : null}
              <Grid container spacing={isMD ? 4 : 2} style={{ fontSize: isMD ? '16px' : '14px' }}>
                { productData.AD_CAM_TYPE === '2' ? (
                  <>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <ElementLink name="provide" />
                        <Grid item>
                          <Box width="125px" fontWeight="bold" component="p">판매 방식</Box>
                        </Grid>
                        <Grid item xs={12} sm className="provide-info">
                          {productData.AD_SELL_TYPE === '1' ? '사이트통해' : '직접판매'}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <ElementLink name="provide" />
                        <Grid item>
                          <Box width="125px" fontWeight="bold" component="p">제품 가격</Box>
                        </Grid>
                        <Grid item xs={12} sm className="provide-info">
                          {`${productData.AD_PROD_PRICE}원`}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <ElementLink name="provide" />
                        <Grid item>
                          <Box width="125px" fontWeight="bold" component="p">수수료</Box>
                        </Grid>
                        <Grid item xs={12} sm className="provide-info">
                          {`${productData.AD_PROD_DISCOUNT}원`}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <ElementLink name="provide" />
                        <Grid item>
                          <Box width="125px" fontWeight="bold" component="p">판매 정보</Box>
                        </Grid>
                        <Grid item xs={12} sm className="provide-info">
                          {productData.AD_PROD_INFO}
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : null}

                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <ElementLink name="provide" />
                    <Grid item>
                      <Box width="125px" fontWeight="bold" component="p">제공내역</Box>
                    </Grid>
                    <Grid item xs={12} sm className="provide-info">
                      {productData.AD_PROVIDE}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <ElementLink name="links" />
                    <Grid item>
                      <Box width="125px" fontWeight="bold">
                        참조할 링크
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm className="provide-info">
                      { productData.AD_LINKS ? (
                        <Grid container spacing={1}>
                          { productData.AD_LINKS.map(item => (
                            <Grid item key={item}>
                              <Box
                                mt={{ xs: '4px', md: 0 }}
                                p="2px 5px 2px 10px"
                                bgcolor="#0000000d"
                                borderRadius="5px"
                                maxWidth={300}
                                style={{ cursor: 'pointer' }}
                                onClick={() => window.open(item, '_blank')}
                              >
                                <Typography classes={{ root: classes.linkText }}>{item}</Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      ) : null}
                      <Box />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <ElementLink name="search" />
                    <Grid item>
                      <Box width="125px" fontWeight="bold">
                          검색 키워드
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm className="provide-info">
                      <Box>
                        {productData.AD_SEARCH_KEY}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <ElementLink name="discription" />
                    <Grid item>
                      <Box width="125px" fontWeight="bold">
                          포스팅가이드
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm className="provide-info">
                      <Box>
                        {productData.AD_DISC}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid container>
                    <ElementLink name="info" />
                    <Grid item>
                      <Box width="125px" fontWeight="bold">
                          업체 정보
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm className="provide-info">
                      <Grid container>
                        {productData.AD_POST_CODE ? (
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item><Box width="65px" fontWeight="bold">주소</Box></Grid>
                              <Grid item xs>
                                {`(${productData.AD_POST_CODE}) ${productData.AD_ROAD_ADDR} ${productData.AD_DETAIL_ADDR} ${productData.AD_EXTR_ADDR}`}
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {isMD ? (
            <Grid item style={{ borderLeft: '1px solid #eee' }}>
              <Box width="300px" position="relative">
                <Box position="absolute" top={isSticky ? '-92px' : '0'} left="0">
                  <Box position={isSticky ? 'fixed' : 'static'}>
                    <Box py={{ xs: 2, md: 6 }} pl={{ xs: 2, lg: '15px' }} pr={{ xs: 2, lg: 0 }} width="300px">
                      <Box pb="13px" borderBottom="solid 1px #efefef">
                        <Box fontSize="18px" color="#000000">
                          {productData.AD_NAME}
                        </Box>
                        <Box my="10px" fontSize="14px">
                          {productData.AD_SHRT_DISC}
                        </Box>
                        <Box mb="15px">
                          <Grid container>
                            { productData.AD_REPORT === '1' || productData.AD_CAM_TYPE === '3' ? (
                              <Grid item>
                                <Box fontSize="12px" mr="7px" p="2px 5px" color={snsTypes['4'].color} border={`solid 1px ${snsTypes['4'].color}`}>
                                  기자단
                                </Box>
                              </Grid>
                            ) : null}
                            { productData.AD_CAM_TYPE === '2' ? (
                              <Grid item>
                                <Box fontSize="12px" mr="7px" p="2px 5px" color={snsTypes['4'].color} border={`solid 1px ${snsTypes['4'].color}`}>
                                    공동구매
                                </Box>
                              </Grid>
                            ) : null}
                            <Grid item>
                              <Box fontSize="12px" mr="7px" p="2px 5px" color={snsTypes[productData.AD_TYPE].color} border={`solid 1px ${snsTypes[productData.AD_TYPE].color}`}>
                                {snsTypes[productData.AD_TYPE].text}
                              </Box>
                            </Grid>
                            <Grid item>
                              <Box fontSize="12px" p="2px 5px" bgcolor="#efefef" border="solid 1px #dcdcdc">
                                {productData.AD_DELIVERY === 0 ? '방문형' : '배송형'}
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                        <TimeComponent FinalDate={productData.AD_SRCH_END} />
                        <Box fontSize="14px" color="#000000">
                          신청&nbsp;
                          <span className={classes.num} style={{ color: '#ff3478' }}>{productData.TB_PARTICIPANTs.length}</span>
                          &nbsp;/&nbsp;모집&nbsp;
                          <span className={classes.num}>{productData.AD_INF_CNT}</span>
                        </Box>
                      </Box>
                      <Box pl="5px" pt="14px" pb="23px" fontSize="14px" borderBottom="solid 1px #efefef">
                        <Box mb="4px" color="#ff3478">
                          <Grid container alignItems="center">
                            <Grid item>
                              <FiberManualRecord classes={{ fontSizeSmall: classes.record }} fontSize="small" />
                            </Grid>
                            <Grid item>
                              <Box width="110px">리뷰어 신청기간</Box>
                            </Grid>
                            <Grid item>
                              <span className={classes.num}>
                                {`${productData.AD_SRCH_START} ~ ${productData.AD_SRCH_END}`}
                              </span>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box mb="4px">
                          <Grid container alignItems="center">
                            <Grid item>
                              <FiberManualRecord classes={{ fontSizeSmall: classes.record }} fontSize="small" />
                            </Grid>
                            <Grid item>
                              <Box width="110px">선정자 발표</Box>
                            </Grid>
                            <Grid item>
                              <span className={classes.num}>
                                {`${productData.AD_SEL_START} ~ ${productData.AD_SEL_END}`}
                              </span>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box mb="4px">
                          <Grid container alignItems="center">
                            <Grid item>
                              <FiberManualRecord classes={{ fontSizeSmall: classes.record }} fontSize="small" />
                            </Grid>
                            <Grid item>
                              <Box width="110px">리뷰 등록기간</Box>
                            </Grid>
                            <Grid item>
                              <span className={classes.num}>
                                {`${addDays(productData.AD_SEL_END, 1)} ~ ${addDays(productData.AD_SEL_END, 8)}`}
                              </span>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                      { RightMenuLinks.map(item => (
                        <Box
                          key={item.link}
                          py="13px"
                          pl="5px"
                          classes={{ root: classes.rightMenu }}
                          onClick={() => scrollTo(item.link)}
                        >
                          <Grid container alignItems="center" justify="space-between">
                            <Grid item>{item.text}</Grid>
                            <Grid item>
                              <ChevronRight />
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                      <Box mt="20px">
                        <StyledButton background={Colors.pink3} hoverBackground={Colors.pink} fontWeight="bold" fontSize="20px" onClick={sendRequest}>
                          리뷰어 신청하기
                        </StyledButton>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ) : null}

        </Grid>
        {isMD ? null : (
          <Box
            position="fixed"
            bottom="0"
            zIndex="2"
            borderTop={`1px solid ${Colors.grey7}`}
            width="100%"
            css={{ backgroundColor: Colors.white }}
          >
            <Grid container alignItems="center">
              <Grid item>
                <Box px={2} color={Colors.pink3}>
                  {liked ? (
                    <Favorite onClick={favoriteClick} style={{ color: Colors.pink3 }} />
                  ) : (
                    <FavoriteBorder onClick={favoriteClick} style={{ color: Colors.grey8 }} />
                  )}
                </Box>
              </Grid>
              <Grid item xs>
                <StyledButton variant="text" height={60} borderRadius="0" onClick={sendRequest}>신청하기</StyledButton>
              </Grid>
            </Grid>
          </Box>
        )}
        <CampaignShareDialog
          open={shareDialog}
          closeDialog={toggleShareDialog}
          title={productData.AD_NAME}
          description={productData.AD_SHRT_DISC}
          img={currentImage}
        />
      </Box>
    </React.Fragment>
  );
}

export default CampaignDetail;
