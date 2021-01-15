import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import axios from 'axios';
import * as Scroll from 'react-scroll';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CampaignAll from '../campaign/CampaignAll';
import StyledText from '../../containers/StyledText';
import { Colors } from '../../lib/Сonstants';
import HomeCampaigns from './sections/HomeCampaigns';
import HomeBanners from './sections/HomeBanners';
import HomePartners from './sections/HomePartners';
import HomeVideoTitle from './sections/HomeVideoTitle';

const ElementLink = Scroll.Element;


function Home(props) {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box>
      <HomeVideoTitle />
      {/* <ElementLink name="target" /> */}
      <Box px={{ xs: 2, md: 6 }} py={{ xs: 4, md: 8 }} maxWidth="1920px" margin="0 auto">
        <HomeCampaigns {...props} isMD={isMD} />
        <HomeBanners />
        <HomePartners />
      </Box>
    </Box>
  );
}

export default Home;
