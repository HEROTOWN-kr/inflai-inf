import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import axios from 'axios';
import StyledText from '../../../containers/StyledText';
import { Colors } from '../../../lib/Сonstants';
import CampaignAll from '../../campaign/CampaignAll';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HomeSelectCampaigns(props) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  function getCampaigns() {
    setLoading(true);
    const params = { limit: null, select: 1 };

    axios.get('/api/TB_AD/list', { params }).then((res) => {
      const { data } = res.data;
      setCampaigns(data);
      setLoading(false);
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <React.Fragment>
      <StyledText mt={6} fontSize="25px">
        <span style={{ color: Colors.pink }}>진행중</span>
        {' 캠페인'}
      </StyledText>
      <Box mt={{ xs: 2, md: 5 }}>
        <CampaignAll {...props} campaigns={campaigns} loading={loading} />
      </Box>
    </React.Fragment>
  );
}

export default HomeSelectCampaigns;
