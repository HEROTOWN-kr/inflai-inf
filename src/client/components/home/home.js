import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import axios from 'axios';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CampaignAll from '../campaign/CampaignAll';
import StyledText from '../../containers/StyledText';
import { Colors } from '../../lib/Сonstants';
import HomeCampaigns from './sections/HomeCampaigns';
import HomeBanners from './sections/HomeBanners';
import HomePartners from './sections/HomePartners';

function Home(props) {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box px={{ xs: 2, md: 6 }} py={{ xs: 4, md: 8 }} maxWidth="1920px" margin="0 auto">
      <HomeCampaigns {...props} isMD={isMD} />
      <HomeBanners />
      <HomePartners />
    </Box>
  );
}

export default Home;
