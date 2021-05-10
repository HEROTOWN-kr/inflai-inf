import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Grid, useMediaQuery, useTheme
} from '@material-ui/core';
import axios from 'axios';
import LabelComponent from '../UserInfo/LabelComponent';
import AuthContext from '../../../../context/AuthContext';

function CardComponent(props) {
  const { title, data } = props;

  return (
    <Box width={{ xs: 'auto', sm: '170px' }} p="12px" fontSize="14px" border="1px solid #e8e8e8" color="#aeaeae">
      {title}
      <Box mt="12px" fontSize="22px" fontWeight="700" color="#000000a6">
        {data}
      </Box>
    </Box>
  );
}

function Youtube(props) {
  const { changeTab } = props;
  const { token } = useContext(AuthContext);
  const [youtubeInfo, setYoutubeInfo] = useState({
    id: null,
    channelId: null,
    subs: null,
    views: null,
  });

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  function getChannelInfo() {
    axios.get('/api/TB_YOUTUBE/channelInfo', { params: { token } }).then((res) => {
      if (res.status === 200) {
        const {
          YOU_ID, YOU_ACCOUNT_ID, YOU_NAME, YOU_SUBS, YOU_VIEWS
        } = res.data.data;
        setYoutubeInfo({
          ...youtubeInfo,
          channelId: YOU_ACCOUNT_ID,
          subs: YOU_SUBS,
          views: YOU_VIEWS,
          id: YOU_ID,
        });
      } else if (res.status === 201) {
        setYoutubeInfo({
          ...youtubeInfo,
          channelId: '',
          subs: '',
          views: '',
          id: '',
        });
      }
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    if (token) {
      changeTab(3);
      getChannelInfo();
    }
  }, [token]);

  return (
    <Box py={{ xs: 1, md: 4 }} px={{ xs: 1, md: 6 }}>
      <Box mb={2}>
        <LabelComponent fontWeight="700" color="#000000" fontSize="15px" labelName="연동된 유튜브체널 정보" />
      </Box>
      <Grid container spacing={isSM ? 2 : 1}>
        <Grid item xs={6} sm="auto">
          <CardComponent title="영상조회(평균)" data={youtubeInfo.views || '-'} />
        </Grid>
        <Grid item xs={6} sm="auto">
          <CardComponent title="구독자" data={youtubeInfo.subs || '-'} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Youtube;
