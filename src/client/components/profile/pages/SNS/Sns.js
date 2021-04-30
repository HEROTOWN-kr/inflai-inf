import React, { useState } from 'react';
import {
  Box,
  Hidden, Tab, Tabs, useMediaQuery, useTheme
} from '@material-ui/core';
import {
  Link,
  Redirect, Route, Switch, useRouteMatch
} from 'react-router-dom';
import PageTitle from '../../PageTitle';
import StyledText from '../../../../containers/StyledText';
import WhiteBlock from '../../../../containers/WhiteBlock';
import UserInfo from '../UserInfo/UserInfo';
import NaverBlog from './NaverBlog';
import Instagram from './Instagram';
import Youtube from './Youtube';

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

function Sns() {
  const match = useRouteMatch();

  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changeTab = (tabValue) => {
    setValue(tabValue);
  };

  return (
    <WhiteBlock height="100%" borderRadius={isMD ? '7px' : '0'}>
      <Hidden smDown>
        <PageTitle>
          <StyledText fontSize="24px">
                      SNS
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
            <Tab label={item.label} component={Link} to={match.url + item.link} value={item.value} />
          )) }
        </Tabs>
      </Box>
      <Switch>
        <Route
          path={`${match.url}/Instagram`}
          render={renderProps => <Instagram changeTab={changeTab} />}
        />
        <Route
          path={`${match.url}/NaverBlog`}
          render={renderProps => <NaverBlog changeTab={changeTab} />}
        />
        <Route
          path={`${match.url}/Youtube`}
          render={renderProps => <Youtube changeTab={changeTab} />}
        />
        <Route
          exact
          path={`${match.url}/`}
          render={() => (
            <Redirect to={`${match.url}/Instagram`} />
          )}
        />
      </Switch>
    </WhiteBlock>
  );
}

export default Sns;
