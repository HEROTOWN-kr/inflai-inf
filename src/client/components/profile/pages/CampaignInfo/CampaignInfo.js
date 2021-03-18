import React, { useContext, useEffect, useState } from 'react';
import {
  Box, useTheme, useMediaQuery, Grid, Hidden
} from '@material-ui/core';
import axios from 'axios';
import { Skeleton } from '@material-ui/lab';
import WhiteBlock from '../../../../containers/WhiteBlock';
import StyledText from '../../../../containers/StyledText';
import PageTitle from '../../PageTitle';
import { Colors } from '../../../../lib/Сonstants';
import AuthContext from '../../../../context/AuthContext';
import CampaignCard from '../../../campaign/CampaignCard';
import MyPagination from '../../../../containers/MyPagination';
import CampaignSelectedCard from './CampaignSelectedCard';
import ReviewInfoDialog from './ReviewInfoDialog';

function TabComponent(props) {
  const {
    tab, setTab, text, tabNumber
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
      padding="13px 20px"
      borderBottom={styles.border}
      css={{ cursor: 'pointer' }}
      onClick={() => setTab(tabNumber)}
    >
      <StyledText fontSize="16px" fontWeight={styles.fontWeight}>{text}</StyledText>
    </Box>
  );
}

function CampaignInfo(props) {
  const { history, match } = props;
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const { token } = useContext(AuthContext);

  const [reviewDialog, setReviewDialog] = useState(false);
  const [currentAd, setCurrentAd] = useState({ id: 0, url: '' });

  function toggleReviewDialog() {
    setReviewDialog(!reviewDialog);
  }

  function getCampaigns(status) {
    setLoading(true);
    const params = {
      token
    };
    if (status) params.status = status;

    axios.get('/api/TB_PARTICIPANT/getCampaigns', {
      params
    }).then((res) => {
      const { data } = res.data;
      setCampaigns(data);
      setLoading(false);
    }).catch(err => alert(err));
  }

  function saveReviewInfo(url) {
    const apiObj = { adId: currentAd.id, url, token };
    axios.post('/api/TB_PARTICIPANT/writeReview', apiObj).then((res) => {
      getCampaigns(2);
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function writeReview(adId, PAR_REVIEW) {
    setCurrentAd({ id: adId, url: PAR_REVIEW });
    toggleReviewDialog();
  }

  useEffect(() => {
    if (token) getCampaigns(null);
  }, [token]);

  useEffect(() => {
    if (token) {
      if (tab === 2) {
        getCampaigns(2);
      } else {
        getCampaigns(null);
      }
    }
  }, [tab]);

  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const is1300 = useMediaQuery('(min-width:1300px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  function getCardWidth() {
    if (isXl) {
      return '25%';
    } if (is1300) {
      return '25%';
    } if (isMD) {
      return '33.333%';
    } if (isSM) {
      return '33.333%';
    }
    return '50%';
  }

  function detailInfo(AD_ID) {
    history.push(`/Campaign/detail/${AD_ID}`);
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <WhiteBlock height="100%" borderRadius={isMD ? '7px' : '0'}>
      <Hidden smDown>
        <PageTitle>
          <StyledText fontSize="24px">
            캠페인 관리
          </StyledText>
        </PageTitle>
      </Hidden>
      <Box py={isMD ? 4 : 1} px={isMD ? 6 : 1}>
        <Box borderBottom={`1px solid ${Colors.grey7}`}>
          <Grid container>
            <Grid item>
              <TabComponent tab={tab} setTab={setTab} text="신청한 캠페인" tabNumber={1} />
            </Grid>
            <Grid item>
              <TabComponent tab={tab} setTab={setTab} text="선정된 캠페인" tabNumber={2} />
            </Grid>
          </Grid>
        </Box>
        <Box my={isMD ? 4 : 2}>
          {loading ? (
            <Grid container>
              <Grid item style={{ width: getCardWidth() }}>
                <Box
                  border="1px solid #eaeaea"
                  overflow="hidden"
                  borderRadius="10px"
                  css={{ cursor: 'pointer' }}
                >
                  <Skeleton variant="rect" width="100%" height={isMD ? 186 : 138} />
                  <Box p={isMD ? 3 : 1}>
                    <Grid container spacing={isMD ? 2 : 1}>
                      <Grid item xs={12}>
                        <Skeleton variant="text" width="50%" />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton variant="text" />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton variant="text" />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton variant="text" />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <React.Fragment>
              { campaigns.length > 0 ? (
                <Grid container spacing={isMD ? 3 : 1}>
                  {campaigns.map((item) => {
                    const {
                      AD_ID, AD_TYPE, AD_CTG, AD_CTG2, AD_SRCH_END, AD_NAME, AD_SHRT_DISC, TB_PARTICIPANTs, AD_INF_CNT, proportion, TB_PHOTO_ADs, PAR_REVIEW
                    } = item;
                    return (
                      tab === 1 ? (
                        <Grid item key={AD_ID} style={{ width: getCardWidth() }}>
                          <CampaignCard
                            type={AD_TYPE}
                            image={TB_PHOTO_ADs[0].PHO_FILE_URL}
                            ctg1={AD_CTG}
                            ctg2={AD_CTG2}
                            srchEnd={AD_SRCH_END}
                            name={AD_NAME}
                            shrtDisc={AD_SHRT_DISC}
                            participantsLength={TB_PARTICIPANTs.length}
                            cnt={AD_INF_CNT}
                            proportion={proportion}
                            onClick={() => detailInfo(AD_ID)}
                            isMD={isMD}
                          />
                        </Grid>
                      ) : (
                        <Grid item xs={12} md="auto" key={AD_ID}>
                          <CampaignSelectedCard
                            type={AD_TYPE}
                            image={TB_PHOTO_ADs[0].PHO_FILE_URL}
                            ctg1={AD_CTG}
                            ctg2={AD_CTG2}
                            srchEnd={AD_SRCH_END}
                            name={AD_NAME}
                            shrtDisc={AD_SHRT_DISC}
                            participantsLength={TB_PARTICIPANTs.length}
                            cnt={AD_INF_CNT}
                            proportion={proportion}
                            review={PAR_REVIEW}
                            onClick={() => detailInfo(AD_ID)}
                            writeReview={() => writeReview(AD_ID, PAR_REVIEW)}
                            isMD={isMD}
                          />
                        </Grid>
                      )
                    );
                  })}
                </Grid>
              ) : (
                <Grid container justify="center">
                  <Grid item>
                        신청한 블로그 캠페인이 없습니다.
                  </Grid>
                </Grid>
              )}
            </React.Fragment>
          )}
        </Box>
        {campaigns.length > 0 ? (
          <Box pt={isMD ? 6 : 1}>
            <Grid container justify="center">
              <Grid item>
                <MyPagination
                  itemCount={campaigns.length}
                  page={page}
                  changePage={changePage}
                  perPage={4}
                />
              </Grid>
            </Grid>
          </Box>
        ) : null}
      </Box>
      <ReviewInfoDialog
        open={reviewDialog}
        closeDialog={toggleReviewDialog}
        onConfirm={saveReviewInfo}
        currentAd={currentAd}
      />
    </WhiteBlock>
  );
}

export default CampaignInfo;
