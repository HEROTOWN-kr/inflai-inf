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
  { id: 7, name: '전체', link: '/' },
  { id: 0, name: '생활', link: '/Life' },
  { id: 1, name: '유아동', link: '/Child' },
  { id: 2, name: '뷰티', link: '/Beauty' },
  { id: 3, name: '디지털', link: '/Digital' },
  { id: 4, name: '패션', link: '/Fashion' },
  { id: 5, name: '도서', link: '/Book' },
  { id: 6, name: '식품', link: '/Food' },
];

const matchUrl = '/Campaign/Product';

function ProductAll(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Life(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Child(props) {
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

function Digital(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Fashion(props) {
  const { campaigns, loading } = props;
  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function Book(props) {
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

function Product() {
  const [tab, setTab] = useState({ id: 7, name: '전체' });
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const category = 1;

  function getCampaigns() {
    setLoading(true);
    const params = { category };
    if (tab.id !== 7) params.subCategory = tab.id;

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
      <StyledText fontSize="25px">
        <span style={{ color: Colors.pink }}>제품</span>
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
              <ProductAll
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={7}
                name="전체"
              />
            )}
          />
          <Route
            path={`${matchUrl}/Life`}
            render={renderProps => (
              <Life
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={0}
                name="생활"
              />
            )}
          />
          <Route
            path={`${matchUrl}/Child`}
            render={renderProps => (
              <Child
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={1}
                name="유아동"
              />
            )}
          />
          <Route
            exact
            path={`${matchUrl}/Beauty`}
            render={renderProps => (
              <Beauty
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={2}
                name="뷰티"
              />
            )}
          />
          <Route
            exact
            path={`${matchUrl}/Digital`}
            render={renderProps => (
              <Digital
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={3}
                name="디지털"
              />
            )}
          />
          <Route
            exact
            path={`${matchUrl}/Fashion`}
            render={renderProps => (
              <Fashion
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={4}
                name="패션"
              />
            )}
          />
          <Route
            exact
            path={`${matchUrl}/Book`}
            render={renderProps => (
              <Book
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={5}
                name="도서"
              />
            )}
          />
          <Route
            exact
            path={`${matchUrl}/Food`}
            render={renderProps => (
              <Food
                {...renderProps}
                campaigns={campaigns}
                loading={loading}
                setTab={setTab}
                id={6}
                name="식품"
              />
            )}
          />
        </Switch>
      </Box>
    </Box>
  );
}

export default Product;
