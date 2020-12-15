import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box, Snackbar } from '@material-ui/core';
import CampaignAll from '../CampaignAll';
import CampaignDetail from '../CampaignDetail';
import CampaignApply from '../CampaignApply';
import Alert from '../../../containers/Alert';
import { Colors } from '../../../lib/Сonstants';
import StyledText from '../../../containers/StyledText';


function Area(props) {
  return (
    <Box px={{ xs: 2, md: 6 }} py={{ xs: 4, md: 8 }} maxWidth="1920px" margin="0 auto">
      <StyledText fontSize="25">
        <span style={{ color: Colors.pink }}>지역</span>
        {' 캠페인'}
      </StyledText>
      <Box mt={6}>
        <CampaignAll {...props} />
      </Box>
    </Box>
  );
}

export default Area;
