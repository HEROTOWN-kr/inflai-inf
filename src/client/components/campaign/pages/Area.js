import React, { useEffect, useState } from 'react';
import {
  Route, Switch, useHistory, useLocation
} from 'react-router-dom';
import { Box, Grid, Snackbar } from '@material-ui/core';
import axios from 'axios';
import CampaignAll from '../CampaignAll';
import { Colors } from '../../../lib/Сonstants';
import StyledText from '../../../containers/StyledText';

const categories = [
  { id: 5, name: '전체', link: '/' },
  { id: 0, name: '맛집', link: '/Food' },
  { id: 1, name: '뷰티', link: '/Beauty' },
  { id: 2, name: '숙박', link: '/Place' },
  { id: 3, name: '문화', link: '/Culture' },
  { id: 4, name: '기타', link: '/Other' },
];

function AreaAll(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Food(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Beauty(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Place(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Culture(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Other(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Area() {
  const [tab, setTab] = useState({ id: 5, name: '전체' });
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const matchUrl = '/Campaign/Area';
  const category = 0;

  function getCampaigns() {
    setLoading(true);
    const params = { category };
    if (tab.id !== 5) params.subCategory = tab.id;

    axios.get('/api/TB_AD/list', { params }).then((res) => {
      const { data } = res.data;
      setCampaigns(data);
      setLoading(false);
    }).catch(err => alert(err.response.data.message));
  }

  function changeTab(selectedTab) {
    setTab({ id: selectedTab.id, name: selectedTab.name });
    history.push(matchUrl + selectedTab.link);
  }

  useEffect(() => {
    getCampaigns();
  }, [tab]);

  return (
    <Box px={{ xs: 2, md: 6 }} py={{ xs: 4, md: 8 }} maxWidth="1920px" margin="0 auto">
      <StyledText fontSize="25">
        <span style={{ color: Colors.pink }}>지역</span>
        {` 캠페인 / ${tab.name}`}
      </StyledText>
      <Box my={{ xs: 2, md: 6 }} borderBottom={`1px solid ${Colors.grey8}`}>
        <div className="scrolling-wrapper-flexbox">
          {categories.map(cat => (
            <Box
              key={cat.id}
              padding={{ xs: '12px 12px 8px', md: '13px 24px' }}
              fontSize={{ xs: '14px', md: '18px' }}
              borderBottom="2px solid #ffffff"
              css={{ cursor: 'pointer' }}
              cursor="pointer"
              className={`category-tab${tab.id === cat.id ? ' active' : ''} card`}
              onClick={() => changeTab(cat)}
            >
              {cat.name}
            </Box>
          ))}
        </div>
      </Box>
      <Box mt={6}>
        <Switch>
          <Route
            exact
            path={`${matchUrl}/`}
            render={renderProps => (
              <AreaAll
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={5}
                name="전체"
              />
            )}
          />
          <Route
            path={`${matchUrl}/Food`}
            render={renderProps => (
              <Food
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={0}
                name="맛집"
              />
            )}
          />
          <Route
            path={`${matchUrl}/Beauty`}
            render={renderProps => (
              <Beauty
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={1}
                name="뷰티"
              />
            )}
          />
          <Route
            path={`${matchUrl}/Place`}
            render={renderProps => (
              <Place
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={2}
                name="숙박"
              />
            )}
          />
          <Route
            path={`${matchUrl}/Culture`}
            render={renderProps => (
              <Culture
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={3}
                name="문화"
              />
            )}
          />
          <Route
            path={`${matchUrl}/Other`}
            render={renderProps => (
              <Other
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={4}
                name="기타"
              />
            )}
          />
        </Switch>
      </Box>
    </Box>
  );
}

export default Area;
