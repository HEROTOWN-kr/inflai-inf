import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Skeleton } from '@material-ui/lab';
import InfiniteScroll from 'react-infinite-scroll-component';
import CampaignCard from './CampaignCard';

function CampaignAll(props) {
  const { campaigns, loading } = props;
  const history = useHistory();

  const testImage = 'https://www.inflai.com/attach/portfolio/33/1yqw1whkavscxke.PNG';
  const theme = useTheme();

  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const is1600 = useMediaQuery('(min-width:1600px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  function getCardWidth() {
    if (isXl) {
      return '16.666%';
    } if (is1600) {
      return '20%';
    } if (isLG) {
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

  return (
    <React.Fragment>
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
            <Grid container spacing={isMD ? 3 : 1}>
              {campaigns.map((item) => {
                const {
                  AD_ID, AD_TYPE, AD_CTG, AD_CTG2, AD_SRCH_END, AD_CAM_TYPE,
                  AD_NAME, AD_SHRT_DISC, TB_PARTICIPANTs, AD_INF_CNT,
                  proportion, TB_PHOTO_ADs, mainImage, AD_REPORT
                } = item;

                return (
                  <Grid item key={AD_ID} style={{ width: getCardWidth() }}>
                    <CampaignCard
                      image={mainImage}
                      type={AD_TYPE}
                      campaignType={AD_CAM_TYPE}
                      report={AD_REPORT}
                      srchEnd={AD_SRCH_END}
                      name={AD_NAME}
                      shrtDisc={AD_SHRT_DISC}
                      participantsLength={TB_PARTICIPANTs.length}
                      cnt={AD_INF_CNT}
                      proportion={proportion}
                      isMD={isMD}
                      onClick={() => detailInfo(item.AD_ID)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Box mt={4} textAlign="center">조회된 캠페인이 없습니다.</Box>
          ) }
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default CampaignAll;
