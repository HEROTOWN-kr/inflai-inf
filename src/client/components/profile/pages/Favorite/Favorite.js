import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Grid, Hidden, useMediaQuery, useTheme
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import WhiteBlock from '../../../../containers/WhiteBlock';
import PageTitle from '../../PageTitle';
import StyledText from '../../../../containers/StyledText';
import CampaignCard from '../../../campaign/CampaignCard';
import AuthContext from '../../../../context/AuthContext';
import MyPagination from '../../../../containers/MyPagination';

function Favorite() {
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const { token } = useContext(AuthContext);
  const history = useHistory();

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

  function getCampaigns(status) {
    setLoading(true);
    const params = {
      token
    };
    if (status) params.status = status;

    axios.get('/api/TB_FAVORITES/', {
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
            관심 캠페인
          </StyledText>
        </PageTitle>
      </Hidden>
      <Box py={{ xs: 4, md: 4 }} px={{ xs: 1, md: 6 }}>
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
                <Box p={{ xs: 1, md: 3 }}>
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
                    AD_ID, AD_CTG, AD_CTG2, AD_SRCH_END, AD_NAME, AD_SHRT_DISC, TB_PARTICIPANTs, AD_INF_CNT, proportion, TB_PHOTO_ADs,
                  } = item;
                  return (
                    <Grid item key={AD_ID} style={{ width: getCardWidth() }}>
                      <CampaignCard
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
                  );
                })}
              </Grid>
            ) : (
              <Grid container justify="center">
                <Grid item>
                  <Box py={8}>
                    관심 캠페인이 없습니다.
                  </Box>
                </Grid>
              </Grid>
            )}
          </React.Fragment>
        )}
        {campaigns.length > 0 ? (
          <Box pt={isMD ? 6 : 4}>
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
    </WhiteBlock>
  );
}

export default Favorite;
