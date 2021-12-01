import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Colors } from '../../../lib/Сonstants';
import StyledText from '../../../containers/StyledText';

function GenderGraph(props) {
  const [statistics, setStatistics] = useState(0);
  const [process, setProcess] = useState(false);
  const { INS_ID, setMaxGenderVal } = props;

  async function getStatistics() {
    setProcess(true);
    const InstaData = await axios.get('/api/TB_INSTA/statsGender', {
      params: { INS_ID }
    });
    const { data, maxGender } = InstaData.data;
    if (maxGender) setMaxGenderVal(maxGender);
    setStatistics(data);
    setProcess(false);
  }

  useEffect(() => {
    if (INS_ID) {
      getStatistics();
    }
  }, [INS_ID]);


  return (
    <React.Fragment>
      { process ? <CircularProgress /> : (
        <React.Fragment>
          { statistics ? (
            <Grid container spacing={1}>
              <Grid item xs={12} container justify="space-between">
                <Grid item>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <Box
                        width="10px"
                        height="10px"
                        css={{
                          backgroundColor: Colors.red2,
                          borderRadius: '100%'
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <StyledText>
                        {`남성 ${statistics}%`}
                      </StyledText>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <Box
                        width="10px"
                        height="10px"
                        css={{
                          backgroundColor: Colors.green2,
                          borderRadius: '100%'
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <StyledText>
                        {`여성 ${100 - statistics}%`}
                      </StyledText>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box
                  height="24px"
                  css={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: Colors.green2
                  }}
                >
                  <Box
                    height="inherit"
                    width={`${statistics}%`}
                    css={{
                      backgroundColor: Colors.red2,
                      overflow: 'hidden'
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          ) : (
            <StyledText fontSize="14px" textAlign="center">
              팔로워가 100명 미만인 데이터가 제공되지 않습니다.
            </StyledText>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default GenderGraph;
