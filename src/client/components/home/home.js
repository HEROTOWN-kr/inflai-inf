import React from 'react';
import { Box } from '@material-ui/core';
import CampaignAll from '../campaign/CampaignAll';
import StyledText from '../../containers/StyledText';
import { Colors } from '../../lib/Сonstants';

function Home(props) {
  return (
    <Box px={{ xs: 2, md: 6 }} py={{ xs: 4, md: 8 }} maxWidth="1920px" margin="0 auto">
      <StyledText fontSize="25">
        <span style={{ color: Colors.pink }}>최근</span>
        {' 캠페인'}
      </StyledText>
      <Box mt={6}>
        <CampaignAll {...props} />
      </Box>
    </Box>
  );
}

export default Home;
