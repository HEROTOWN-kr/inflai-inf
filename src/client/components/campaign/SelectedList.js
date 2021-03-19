import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid } from '@material-ui/core';
import { Colors } from '../../lib/Сonstants';
import StyledImage from '../../containers/StyledImage';
import defaultAccountImage from '../../img/default_account_image.png';
import StyledText from '../../containers/StyledText';
import IconInsta from '../../img/icon_instagram_url.png';
import IconYoutube from '../../img/icon_youtube_url.png';
import IconBlog from '../../img/icon_blog_url.png';
import MyPagination from '../../containers/MyPagination';
import noFound from '../../img/notFound400_316.png';

function SelectedList(props) {
  const { adId, isMD } = props;
  const [participants, setParticipants] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const limit = 10;

  const changePage = (event, value) => {
    setPage(value);
  };

  function getParticipants() {
    axios.get('/api/TB_PARTICIPANT/getList', {
      params: {
        adId, limit, page, onlySelected: '1'
      }
    }).then((res) => {
      const { data } = res.data;
      setParticipants(data);
      setCount(res.data.count);
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    getParticipants();
  }, [page]);

  useEffect(() => {
    getParticipants();
  }, []);

  return (
    <>
      {participants.length === 0 ? (
        <Box py={4}>
          <Grid container justify="center">
            <Grid item>
                          신청한 리뷰어 없습니다
            </Grid>
          </Grid>
        </Box>
      ) : (
        <React.Fragment>
          {participants.map(item => (
            <Box key={item.PAR_ID} py={2} borderBottom={`1px solid ${Colors.grey7}`}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <StyledImage borderRadius="100%" width={isMD ? '90px' : '60px'} height={isMD ? '90px' : '60px'} src={item.INF_PHOTO_URL || defaultAccountImage} onError={event => event.target.setAttribute('src', defaultAccountImage)} />
                </Grid>
                <Grid item xs>
                  <Grid container spacing={isMD ? 2 : 1}>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                          <StyledText fontSize={16} fontWeight="bold">{item.PAR_NAME}</StyledText>
                        </Grid>
                        {item.PAR_INSTA ? (
                          <Grid item><StyledImage width="21px" height="21px" src={IconInsta} /></Grid>
                        ) : null}
                        {item.PAR_YOUTUBE ? (
                          <Grid item><StyledImage width="21px" height="21px" src={IconYoutube} /></Grid>
                        ) : null}
                        {item.PAR_NAVER ? (
                          <Grid item><StyledImage width="21px" height="21px" src={IconBlog} /></Grid>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledText fontSize={isMD ? 15 : 14} lineHeight="1.3em">{item.PAR_MESSAGE}</StyledText>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledText fontSize={isMD ? 15 : 14}>
                        {item.PAR_DT}
                      </StyledText>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ))}
          {participants.length > 0 ? (
            <Box py={isMD ? 4 : 1}>
              <Grid container justify="center">
                <Grid item>
                  <MyPagination
                    itemCount={count}
                    page={page}
                    changePage={changePage}
                    perPage={limit}
                  />
                </Grid>
              </Grid>
            </Box>
          ) : null}
        </React.Fragment>
      )}
    </>
  );
}

export default SelectedList;
