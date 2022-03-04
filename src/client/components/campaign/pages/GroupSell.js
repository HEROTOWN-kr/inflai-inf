import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@material-ui/core';
import StyledText from '../../../containers/StyledText';
import { Colors } from '../../../lib/Сonstants';
import CampaignAll from '../CampaignAll';

function GroupSell(props) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  function getCampaigns() {
    setLoading(true);

    const params = { campaignType: '2' };
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
      <StyledText fontSize="25px">
        <span style={{ color: Colors.pink }}>공동구매</span>
        {' 캠페인'}
      </StyledText>
      <Box mt={6}>
        <CampaignAll campaigns={campaigns} loading={loading} />
      </Box>
    </Box>
  );
}

export default GroupSell;
