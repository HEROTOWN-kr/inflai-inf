import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import axios from 'axios';
import CampaignAll from '../campaign/CampaignAll';
import StyledText from '../../containers/StyledText';
import { Colors } from '../../lib/Сonstants';

function Home(props) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  function getCampaigns() {
    setLoading(true);
    const params = { limit: 6 };

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
    <Box px={{ xs: 2, md: 6 }} py={{ xs: 4, md: 8 }} maxWidth="1920px" margin="0 auto">
      <StyledText fontSize="25">
        <span style={{ color: Colors.pink }}>최근</span>
        {' 캠페인'}
      </StyledText>
      <Box mt={6}>
        <CampaignAll {...props} campaigns={campaigns} loading={loading} />
      </Box>
    </Box>
  );
}

export default Home;
