import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Button, Divider, Grid, Hidden, makeStyles
} from '@material-ui/core';
import axios from 'axios';
import PageTitle from '../../PageTitle';
import StyledText from '../../../../containers/StyledText';
import WhiteBlock from '../../../../containers/WhiteBlock';
import { Colors, ratings } from '../../../../lib/Сonstants';
import AuthContext from '../../../../context/AuthContext';

const useStyles = makeStyles({
  stats: {
    padding: '30px 0',
    backgroundColor: '#f8f8f9',
    color: Colors.dark,
    fontSize: '14px',
    display: 'flex'
  },
  list: {
    fontSize: '13px',
    listStyle: 'square',
    color: '#666',
    lineHeight: '22px'
  }
});

function CheckInfo(props) {
  const [stats, setStats] = useState({
    checkCount: 0,
    participateCount: 0,
    INF_NAME: '',
    INF_RATING: 1,
    futureRating: 1,
    currentMonth: '01',
    nextMonth: '02',
    participateMin: 0,
    checkMin: 0,
    checked: false,
  });

  const { isMD } = props;
  const classes = useStyles();

  const { token } = useContext(AuthContext);

  function getStats() {
    axios.get('/api/TB_CHECK/getStats', { params: { token } }).then((res) => {
      setStats(res.data);
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function check() {
    axios.post('/api/TB_CHECK/check', { token }).then((res) => {
      setStats({ ...stats, checked: true });
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  useEffect(() => {
    if (token) getStats();
  }, [token]);

  return (
    <WhiteBlock borderRadius={isMD ? '7px' : '0'}>
      <Hidden smDown>
        <PageTitle>
          <StyledText fontSize="24px">
              출석형환
          </StyledText>
        </PageTitle>
      </Hidden>
      <Box py={isMD ? 4 : 2} px={isMD ? 6 : 0}>
        <Box maxWidth={660} m="0 auto" px={2}>
          <Box mb="40px" fontSize="18px" color={Colors.dark} fontWeight="300" textAlign="center">
            <Box>
              <img width="80px" height="80px" style={{ margin: '12px 0' }} src={ratings[stats.INF_RATING].icon} alt="noImage" />
            </Box>
            <Box>
              <span style={{ fontWeight: 'bold' }}>{stats.INF_NAME}</span>
              님
            </Box>
            <Box>
              현재 인플라이 등급은
              <span style={{ fontWeight: 'bold', color: Colors.pink3 }}>
                {` ${ratings[stats.INF_RATING].text} `}
              </span>
              입니다.
            </Box>
            <Box mt={2}>
              { stats.checked ? (
                <Button variant="outlined" disabled>체크완료</Button>
              ) : (
                <Button variant="outlined" color="primary" onClick={check}>출석체크</Button>
              )}

            </Box>
          </Box>
          <Box className={classes.stats}>
            <Grid container>
              <Grid item xs={6}>
                <Box borderRight="1px solid #ddd" px={{ xs: '10px', md: '25px' }} py={1} display="flex" justifyContent="space-between">
                  <Box>{`${stats.currentMonth} 월 신청횟수`}</Box>
                  <Box>
                    <b style={{ color: Colors.pink3 }}>{stats.participateCount}</b>
                    {` / ${stats.participateMin}`}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box px={{ xs: '10px', md: '25px' }} py={1} display="flex" justifyContent="space-between">
                  <Box>{`${stats.currentMonth} 월 커뮤니티 출석`}</Box>
                  <Box>
                    <b style={{ color: Colors.pink3 }}>{stats.checkCount}</b>
                    {` / ${stats.checkMin}`}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box my="30px">
            <Box fontSize="15px" fontWeight="500" color={Colors.dark}>{`${stats.nextMonth}월 예정 멤버십 등급`}</Box>
            <Box textAlign="center">
              <img width="80px" height="80px" style={{ margin: '40px 0 12px' }} src={ratings[stats.futureRating].icon} alt="noImage" />
              <Box fontSize="18px" fontWeight="bold" color={Colors.pink3}>{ratings[stats.futureRating].text}</Box>
            </Box>
          </Box>
          <Divider style={{ margin: '30px 0' }} />
          <Box>
            <ul style={{ listStyle: 'none' }}>
              <li className={classes.list}>인플라이 등급은 5가지 있습니다. (NEW, BRONZE, SILVER, GOLD, PLATINUM)</li>
              <li className={classes.list}>매달 신청횟수 및 출석체크 목표를 달성하면 다음 달 인플라이 등급이 올라갑니다.</li>
              <li className={classes.list}>매달 1일 인플라이 등급이 결정됩니다.</li>
              <li className={classes.list}>등급은 한달에 한 번씩 올릴 수 있습니다.</li>
            </ul>
          </Box>
        </Box>
      </Box>
    </WhiteBlock>
  );
}

export default CheckInfo;
