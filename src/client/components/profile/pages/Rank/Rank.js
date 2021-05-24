import React, { useState } from 'react';
import {
  Box, Grid, Hidden, Tab, Tabs, useMediaQuery, useTheme
} from '@material-ui/core';
import {
  Link, Redirect, Route, Switch, useRouteMatch
} from 'react-router-dom';
import WhiteBlock from '../../../../containers/WhiteBlock';
import PageTitle from '../../PageTitle';
import StyledText from '../../../../containers/StyledText';
import InstagramRank from './InstagramRank';
import NaverRank from './NaverRank';
import YoutubeRank from './YoutubeRank';

const menuLinks = [
  {
    label: '인스타그램',
    link: '/Instagram',
    value: 1
  },
  {
    label: '네이버블로그',
    link: '/NaverBlog',
    value: 2
  },
  {
    label: '유튜브',
    link: '/Youtube',
    value: 3
  },
];

function Rank(props) {
  const match = useRouteMatch();

  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeTab = (tabValue) => {
    setValue(tabValue);
  };
  return (
    <WhiteBlock height="100%">
      <Hidden smDown>
        <PageTitle>
          <StyledText fontSize="24px">
                  랭킹 정보
          </StyledText>
        </PageTitle>
      </Hidden>
      <Box borderBottom="1px solid #eaeaea">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          { menuLinks.map(item => (
            <Tab key={item.value} label={item.label} component={Link} to={match.url + item.link} value={item.value} />
          )) }
        </Tabs>
      </Box>
      <Switch>
        <Route
          path={`${match.url}/Instagram`}
          render={renderProps => <InstagramRank changeTab={changeTab} />}
        />
        <Route
          path={`${match.url}/NaverBlog`}
          render={renderProps => <NaverRank changeTab={changeTab} />}
        />
        <Route
          path={`${match.url}/Youtube`}
          render={renderProps => <YoutubeRank changeTab={changeTab} />}
        />
        <Route
          exact
          path={`${match.url}/`}
          render={() => (
            <Redirect to={`${match.url}/Youtube`} />
          )}
        />
      </Switch>
    </WhiteBlock>
  );
}

export default Rank;
