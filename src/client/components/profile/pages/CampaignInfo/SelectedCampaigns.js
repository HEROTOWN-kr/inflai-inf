import React, {
  Fragment, useContext, useEffect, useState
} from 'react';
import {
  Box, Grid, useMediaQuery, useTheme
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';
import CampaignCard from '../../../campaign/CampaignCard';
import CampaignSelectedCard from './CampaignSelectedCard';
import MyPagination from '../../../../containers/MyPagination';
import AuthContext from '../../../../context/AuthContext';
import ReviewInfoDialog from './ReviewInfoDialog';
import SellUrlDialog from './SellUrlDialog';

function SelectedCampaigns(props) {
  const { setTab } = props;
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const { token } = useContext(AuthContext);
  const history = useHistory();

  const [reviewDialog, setReviewDialog] = useState(false);
  const [currentAd, setCurrentAd] = useState({ id: 0, url: '' });

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

  function toggleReviewDialog() {
    setReviewDialog(!reviewDialog);
  }


  function getCampaigns() {
    setLoading(true);
    const params = { token, status: '2' };

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
      getCampaigns();
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function writeReview(adId, PAR_REVIEW) {
    setCurrentAd({ id: adId, url: PAR_REVIEW });
    toggleReviewDialog();
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  function detailInfo(AD_ID) {
    history.push(`/Campaign/detail/${AD_ID}`);
  }

  useEffect(() => {
    if (token) getCampaigns();
    setTab(2);
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
                    AD_ID, AD_TYPE, AD_SRCH_END, AD_NAME, PAR_SELL_URL,
                    AD_SHRT_DISC, TB_PHOTO_ADs, PAR_REVIEW, AD_CAM_TYPE, AD_REPORT
                  } = item;
                  return (
                    <Grid item xs={12} md="auto" key={AD_ID}>
                      <CampaignSelectedCard
                        adId={AD_ID}
                        type={AD_TYPE}
                        campaignType={AD_CAM_TYPE}
                        report={AD_REPORT}
                        image={TB_PHOTO_ADs[0].PHO_FILE_URL}
                        srchEnd={AD_SRCH_END}
                        name={AD_NAME}
                        shrtDisc={AD_SHRT_DISC}
                        review={PAR_REVIEW}
                        sellUrl={PAR_SELL_URL}
                        onClick={() => detailInfo(AD_ID)}
                        writeReview={() => writeReview(AD_ID, PAR_REVIEW)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Grid container justify="center">
                <Grid item>
                        선정한 캠페인이 없습니다.
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
      <ReviewInfoDialog
        open={reviewDialog}
        closeDialog={toggleReviewDialog}
        onConfirm={saveReviewInfo}
        currentAd={currentAd}
      />
    </Fragment>
  );
}

export default SelectedCampaigns;
