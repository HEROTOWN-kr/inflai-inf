import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Box, Grid, Snackbar } from '@material-ui/core';
import axios from 'axios';
import CampaignAll from '../CampaignAll';
import CampaignDetail from '../CampaignDetail';
import CampaignApply from '../CampaignApply';
import Alert from '../../../containers/Alert';
import { Colors } from '../../../lib/Сonstants';
import StyledText from '../../../containers/StyledText';

const categories = [
  { id: 4, name: '전체' },
  { id: 0, name: '쇼핑몰' },
  { id: 1, name: '웹서비스' },
  { id: 2, name: '이벤트' },
  { id: 3, name: '교육' },
];

function Service(props) {
  const [tab, setTab] = useState(4);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const category = 2;

  function getCampaigns() {
    setLoading(true);
    const params = { category };
    if (tab !== 4) params.subCategory = tab;

    axios.get('/api/TB_AD/list', { params }).then((res) => {
      const { data } = res.data;
      setCampaigns(data);
      setLoading(false);
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    getCampaigns();
  }, [tab]);
  return (
    <Box px={{ xs: 2, md: 6 }} py={{ xs: 4, md: 8 }} maxWidth="1920px" margin="0 auto">
      <StyledText fontSize="25">
        <span style={{ color: Colors.pink }}>서비스</span>
        {' 캠페인'}
      </StyledText>
      <Box my={6} borderBottom={`1px solid ${Colors.grey8}`}>
        <Grid container>
          {categories.map(cat => (
            <Grid item key={cat.id}>
              <Box
                className={`category-tab${tab === cat.id ? ' active' : ''} campaign`}
                onClick={() => setTab(cat.id)}
              >
                {cat.name}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={6}>
        <CampaignAll {...props} campaigns={campaigns} loading={loading} />
      </Box>
    </Box>
  );
}

export default Service;
