import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Box, Grid, Snackbar } from '@material-ui/core';
import axios from 'axios';
import CampaignAll from '../CampaignAll';
import CampaignDetail from '../CampaignDetail';
import CampaignApply from '../CampaignApply';
import Alert from '../../../containers/Alert';
import { Colors } from '../../../lib/Сonstants';
import StyledText from '../../../containers/StyledText';

const categories = [
  { id: 4, name: '전체', link: '/' },
  { id: 0, name: '쇼핑몰', link: '/Shopping' },
  { id: 1, name: '웹서비스', link: '/Web' },
  { id: 2, name: '이벤트', link: '/Event' },
  { id: 3, name: '교육', link: '/Education' },
];

const matchUrl = '/Campaign/Service';

function ServiceAll(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Shopping(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Web(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Event(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Education(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Service(props) {
  const [tab, setTab] = useState({ id: 4, name: '전체' });
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const category = 2;

  function getCampaigns() {
    setLoading(true);
    const params = { category };
    if (tab.id !== 4) params.subCategory = tab.id;

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
      <StyledText fontSize="25px">
        <span style={{ color: Colors.pink }}>서비스</span>
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
              onClick={() => history.push(matchUrl + cat.link)}
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
              <ServiceAll
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={4}
                name="전체"
              />
            )}
          />
          <Route
            path={`${matchUrl}/Shopping`}
            render={renderProps => (
              <Shopping
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={0}
                name="쇼핑몰"
              />
            )}
          />
          <Route
            path={`${matchUrl}/Web`}
            render={renderProps => (
              <Web
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={1}
                name="웹서비스"
              />
            )}
          />
          <Route
            path={`${matchUrl}/Event`}
            render={renderProps => (
              <Event
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={2}
                name="이벤트"
              />
            )}
          />
          <Route
            path={`${matchUrl}/Education`}
            render={renderProps => (
              <Education
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={3}
                name="교육"
              />
            )}
          />
        </Switch>
      </Box>
    </Box>
  );
}

export default Service;
