import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { SupervisorAccount } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import StyledImage from '../../containers/StyledImage';
import noFound from '../../img/notFound400_316.png';
import StyledText from '../../containers/StyledText';
import { Colors } from '../../lib/Сonstants';
import StyledSvg from '../../containers/StyledSvg';

function PeriodComponent(props) {
  const { srchEnd } = props;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const lastDate = new Date(srchEnd);
  if (lastDate < currentDate) {
    return null;
    /* return (
          <span style={{ fontWeight: 600 }}>&nbsp;&nbsp;발표기간</span>
        ); */
  }
  const daysLag = Math.ceil(Math.abs(lastDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
  return ` D-${daysLag}`;
}

function CampaignCardSmall(props) {
  const history = useHistory();

  const {
    image, type, ctg1, ctg2, srchEnd, name, shrtDisc, participantsLength, cnt, proportion, onClick, isMD
  } = props;

  return (
    <Box border="1px solid #eaeaea" overflow="hidden" borderRadius="10px" css={{ cursor: 'pointer' }} width="250px">
      <StyledImage width="100%" height="auto" src={image || noFound} onError={event => event.target.setAttribute('src', noFound)} />
      <Box borderTop="1px solid #eaeaea" p={{ xs: 1, md: 2 }}>
        <Box fontSize="13px">
          <span style={{ color: Colors.pink, fontWeight: '600' }}>Instagram</span>
          {' '}
              D-5
        </Box>
        <Box my="5px">
          <Typography noWrap>
              10초항균 니손내손 핸드퍼퓸클린미스트
          </Typography>
        </Box>
        <Typography>
            손소독도 향기롭게 니손내손 클린미스트로 하자구요~우리!!
            10초만에 유해균 99.9% 항균효과!! 테스트로 확인된 사실입니다!!
        </Typography>
      </Box>
    </Box>

  );
}

export default CampaignCardSmall;
