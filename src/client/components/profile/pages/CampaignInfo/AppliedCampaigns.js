import React, {
  Fragment, useContext, useEffect, useState
} from 'react';
import {
  Box, Grid, useMediaQuery, useTheme
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import CampaignCard from '../../../campaign/CampaignCard';
import MyPagination from '../../../../containers/MyPagination';
import AuthContext from '../../../../context/AuthContext';

function AppliedCampaigns(props) {
  const { setTab } = props;
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const { token } = useContext(AuthContext);

  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const is1300 = useMediaQuery('(min-width:1300px)');
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

  function getCampaigns() {
    setLoading(true);
    const params = { token };

    axios.get('/api/TB_PARTICIPANT/getCampaigns', {
      params
    }).then((res) => {
      const { data } = res.data;
      setCampaigns(data);
      setLoading(false);
    }).catch(err => alert(err));
  }

  function detailInfo(AD_ID) {
    history.push(`/Campaign/detail/${AD_ID}`);
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (token) getCampaigns();
    setTab(1);
  }, [token]);

  return (
    <Fragment>
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
                  );
                })}
              </Grid>
            ) : (
              <Grid container justify="center">
                <Grid item>
                  신청한 캠페인이 없습니다.
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
                perPage={10}
              />
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </Fragment>
  );
}

export default AppliedCampaigns;
