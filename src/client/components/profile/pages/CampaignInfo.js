import React, { useContext, useEffect, useState } from 'react';
import {
  Box, useTheme, useMediaQuery, Grid
} from '@material-ui/core';
import axios from 'axios';
import { Skeleton } from '@material-ui/lab';
import WhiteBlock from '../../../containers/WhiteBlock';
import StyledText from '../../../containers/StyledText';
import PageTitle from '../PageTitle';
import { Colors } from '../../../lib/Сonstants';
import AuthContext from '../../../context/AuthContext';
import CampaignCard from '../../campaign/CampaignCard';
import MyPagination from '../../../containers/MyPagination';

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
      <StyledText fontSize="16" fontWeight={styles.fontWeight}>{text}</StyledText>
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
  const is1600 = useMediaQuery('(min-width:1600px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  function getCardWidth() {
    if (isXl) {
      return '25%';
    } if (is1600) {
      return '33.333%';
    } if (isLG) {
      return '33.333%';
    } if (isMD) {
      return '33.333%';
    }
    return '100%';
  }

  function detailInfo(AD_ID) {
    history.push(`/CampaignList/${AD_ID}`);
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  return (
    <WhiteBlock height="100%">
      <PageTitle>
        <StyledText fontSize="24">
            캠페인 관리
        </StyledText>
      </PageTitle>
      <Box py={4} px={6}>
        <Box borderBottom={`2px solid ${Colors.grey7}`}>
          <Grid container>
            <Grid item>
              <TabComponent tab={tab} setTab={setTab} text="신청한 캠페인" tabNumber={1} />
            </Grid>
            <Grid item>
              <TabComponent tab={tab} setTab={setTab} text="선정된 캠페인" tabNumber={2} />
            </Grid>
          </Grid>
        </Box>
        <Box my={4}>
          {loading ? (
            <Grid container>
              <Grid item style={{ width: getCardWidth() }}>
                <Box
                  border="1px solid #eaeaea"
                  overflow="hidden"
                  borderRadius="10px"
                  css={{ cursor: 'pointer' }}
                >
                  <Skeleton variant="rect" width="100%" height={186} />
                  <Box p={3}>
                    <Grid container spacing={2}>
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
                <Grid container spacing={3}>
                  {campaigns.map((item) => {
                    const {
                      AD_ID, AD_CTG, AD_CTG2, AD_SRCH_END, AD_NAME, AD_SHRT_DISC, TB_PARTICIPANTs, AD_INF_CNT, proportion, TB_PHOTO_ADs,
                    } = item;
                    return (
                      <Grid item key={AD_ID} style={{ width: getCardWidth() }}>
                        <CampaignCard
                          image={TB_PHOTO_ADs[0].PHO_FILE}
                          ctg1={AD_CTG}
                          ctg2={AD_CTG2}
                          srchEnd={AD_SRCH_END}
                          name={AD_NAME}
                          shrtDisc={AD_SHRT_DISC}
                          participantsLength={TB_PARTICIPANTs.length}
                          cnt={AD_INF_CNT}
                          proportion={proportion}
                          onClick={() => detailInfo(AD_ID)}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Grid container>
                  <Grid item>
                        신청한 블로그 캠페인이 없습니다.
                  </Grid>
                </Grid>
              )}
            </React.Fragment>
          )}
        </Box>
        <Box pt={6}>
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
      </Box>
    </WhiteBlock>
  );
}

export default CampaignInfo;
