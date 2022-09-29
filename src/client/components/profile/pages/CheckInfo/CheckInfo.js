import React from 'react';
import {
  Box, Grid, Hidden, makeStyles
} from '@material-ui/core';
import PageTitle from '../../PageTitle';
import StyledText from '../../../../containers/StyledText';
import WhiteBlock from '../../../../containers/WhiteBlock';

const useStyles = makeStyles({
  stats: {
    padding: '30px 0',
    backgroundColor: '#f8f8f9',
    color: '#222',
    fontSize: '14px',
    display: 'flex'
  }
});

function CheckInfo(props) {
  const { isMD } = props;
  const classes = useStyles();

  return (
    <WhiteBlock borderRadius={isMD ? '7px' : '0'}>
      <Hidden smDown>
        <PageTitle>
          <StyledText fontSize="24px">
              출석형환
          </StyledText>
        </PageTitle>
      </Hidden>
      <Box py={isMD ? 4 : 1} px={isMD ? 6 : 2}>
        <Box maxWidth={660}>
          <Box>안드리안님</Box>
          <Box>현재 인플라이 등급은 NEW 입니다.</Box>
          <Box className={classes.stats}>
            <Grid container>
              <Grid item xs={6}>
                <Box borderRight="1px solid #ddd" px="25px" py={1} display="flex" justifyContent="space-between">
                  <Box>09 월 신청횟수</Box>
                  <Box>0 / 10</Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box px="25px" py={1} display="flex" justifyContent="space-between">
                  <Box>09 월 커뮤니티 출석</Box>
                  <Box>0 / 10</Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </WhiteBlock>
  );
}

export default CheckInfo;
