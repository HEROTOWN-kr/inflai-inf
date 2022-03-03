import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { SupervisorAccount } from '@material-ui/icons';
import StyledImage from '../../containers/StyledImage';
import StyledText from '../../containers/StyledText';
import { AdvertiseTypes, Colors } from '../../lib/Сonstants';
import StyledSvg from '../../containers/StyledSvg';
import noImage from '../../img/noImage.png';
import noFound from '../../img/notFound400_316.png';

const snsTypes = {
  1: {
    text: 'Instagram',
    color: Colors.pink
  },
  2: {
    text: 'Youtube',
    color: Colors.red
  },
  3: {
    text: 'Blog',
    color: Colors.green
  }
};

function PeriodComponent(props) {
  const { srchEnd } = props;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const lastDate = new Date(srchEnd);
  if (lastDate < currentDate) {
    return null;
  }
  const daysLag = Math.ceil(Math.abs(lastDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
  return ` D-${daysLag}`;
}

function CampaignCard(props) {
  const {
    image, type, report, srchEnd, name, shrtDisc, campaignType,
    participantsLength, cnt, proportion, onClick, isMD
  } = props;

  return (
    <Box border="1px solid #eaeaea" overflow="hidden" borderRadius="10px" css={{ cursor: 'pointer' }} onClick={onClick}>
      <StyledImage width="100%" height="auto" src={image || noFound} onError={event => event.target.setAttribute('src', noFound)} />
      <Box borderTop="1px solid #eaeaea" p={isMD ? 3 : 1}>
        <Grid container spacing={isMD ? 2 : 1}>
          <Grid item xs={12}>
            <Grid container>
              { report === '1' ? (
                <Grid item>
                  <Box mr="4px" color="#0027ff" fontWeight="600">(기자단)</Box>
                </Grid>
              ) : null}
              { campaignType === '2' ? (
                <Grid item>
                  <Box mr="4px" color="#00b605" fontWeight="600">[공동구매]</Box>
                </Grid>
              ) : null}
              <Grid item>
                <Box mr="4px" color={snsTypes[type].color} fontWeight="600">{snsTypes[type].text}</Box>
              </Grid>
              <Grid item>
                <PeriodComponent srchEnd={srchEnd} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <StyledText overflowHidden fontWeight="bold" fontSize="16px">
              {name}
            </StyledText>
          </Grid>
          <Grid item xs={12}>
            <StyledText overflowHidden fontSize="13px" color={Colors.grey5}>
              {shrtDisc}
            </StyledText>
          </Grid>
          <Grid item xs={12}>
            <Box pt={isMD ? 1 : 0}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StyledSvg
                      component={SupervisorAccount}
                      color={Colors.grey5}
                      fontSize="20px"
                    />
                    <StyledText overflowHidden fontSize="13px" color={Colors.grey5}>
                      <span style={{ color: Colors.pink }}>{participantsLength}</span>
                      {`/${cnt}명`}
                    </StyledText>
                  </div>
                </Grid>
                <Grid item>
                  <StyledText overflowHidden fontSize="13px" color={Colors.grey5}>
                    {`${proportion}%`}
                  </StyledText>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box height="5px" borderRadius="50px" overflow="hidden" css={{ background: Colors.grey6 }}>
              <Box height="4px" width={`${proportion}%`} css={{ background: Colors.pink2 }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>

  );
}

export default CampaignCard;
