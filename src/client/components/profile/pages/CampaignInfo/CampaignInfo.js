import React, { useState } from 'react';
import {
  Box, useTheme, useMediaQuery, Grid, Hidden
} from '@material-ui/core';
import {
  Route, useHistory, Switch, useRouteMatch, Redirect
} from 'react-router-dom';
import WhiteBlock from '../../../../containers/WhiteBlock';
import StyledText from '../../../../containers/StyledText';
import PageTitle from '../../PageTitle';
import { Colors } from '../../../../lib/Сonstants';
import SelectedCampaigns from './SelectedCampaigns';
import AppliedCampaigns from './AppliedCampaigns';

function TabComponent(props) {
  const {
    tab, setTab, text, tabNumber
  } = props;
  const styles = tab === tabNumber ? {
    border: `3px solid ${Colors.pink2}`,
    fontWeight: 'bold'
  } : {
    border: '0',
    fontWeight: '400'
  };
  const history = useHistory();

  function clickTab() {
    setTab(tabNumber);
    history.push(`/Profile/CampaignInfo/${tabNumber === 1 ? 'Applied' : 'Selected'}`);
  }

  return (
    <Box
      padding="13px 20px"
      borderBottom={styles.border}
      css={{ cursor: 'pointer' }}
      onClick={clickTab}
    >
      <StyledText fontSize="16px" fontWeight={styles.fontWeight}>{text}</StyledText>
    </Box>
  );
}

function CampaignInfo(props) {
  const [tab, setTab] = useState(1);
  const match = useRouteMatch();

  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <WhiteBlock height="100%" borderRadius={isMD ? '7px' : '0'}>
      <Hidden smDown>
        <PageTitle>
          <StyledText fontSize="24px">
            캠페인 관리
          </StyledText>
        </PageTitle>
      </Hidden>
      <Box py={isMD ? 4 : 1} px={isMD ? 6 : 1}>
        <Box borderBottom={`1px solid ${Colors.grey7}`}>
          <Grid container>
            <Grid item>
              <TabComponent tab={tab} setTab={setTab} text="신청한 캠페인" tabNumber={1} />
            </Grid>
            <Grid item>
              <TabComponent tab={tab} setTab={setTab} text="선정된 캠페인" tabNumber={2} />
            </Grid>
          </Grid>
        </Box>
        <Switch>
          <Route
            path={`${match.url}/Applied`}
            render={renderProps => <AppliedCampaigns {...renderProps} setTab={setTab} />}
          />
          <Route
            path={`${match.url}/Selected`}
            render={renderProps => <SelectedCampaigns {...renderProps} setTab={setTab} />}
          />
          <Route
            exact
            path={`${match.url}/`}
            render={() => (
              <Redirect to={`${match.url}/Applied`} />
            )}
          />
        </Switch>
      </Box>
    </WhiteBlock>
  );
}

export default CampaignInfo;
