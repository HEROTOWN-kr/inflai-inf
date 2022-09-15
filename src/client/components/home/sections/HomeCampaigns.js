import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import StyledText from '../../../containers/StyledText';
import { Colors } from '../../../lib/Сonstants';
import CampaignAll from '../../campaign/CampaignAll';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CampaignAllNew from '../../campaign/CampaignAllNew';

function HomeCampaigns(props) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  function getCampaigns() {
    setLoading(true);
    // const params = { limit: 6 };
    // const params = { limit: 12, offset: 0 };
    const params = { limit: null };

    axios.get('/api/TB_AD/list', { params }).then((res) => {
      const { data } = res.data;
      setCampaigns(data);
      // setCount(res.data.count);
      setLoading(false);
    }).catch(err => alert(err.response.data.message));
  }

  function fetchMoreData() {
    if (campaigns.length >= count) {
      setHasMore(false);
    } else {
      const params = { limit: 10, offset: campaigns.length };
      axios.get('/api/TB_AD/listHome', { params }).then((res) => {
        const { data } = res.data;
        setCampaigns(data);
        setCount(res.data.count);
      }).catch(err => alert(err.response.data.message));
    }
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <React.Fragment>
      <StyledText fontSize="25px">
        <span style={{ color: Colors.pink }}>최근</span>
        {' 캠페인'}
      </StyledText>
      <Box mt={{ xs: 2, md: '20px' }}>
        <CampaignAll {...props} campaigns={campaigns} loading={loading} />
        {/* <CampaignAllNew
          {...props}
          campaigns={campaigns}
          loading={loading}
          fetchMoreData={fetchMoreData}
          hasMore={hasMore}
        /> */}
      </Box>
      {/* <Box>
          {campaigns.length > 0 ? (
            <Box margin="-8px">
              <Slider {...settings} className="register-link-slider">
                {campaigns.map((item) => {
                  const {
                    AD_ID, AD_CTG, AD_CTG2, AD_SRCH_END, AD_NAME, AD_SHRT_DISC, TB_PARTICIPANTs, AD_INF_CNT, proportion, TB_PHOTO_ADs, mainImage
                  } = item;
                  return (
                    <CampaignCardHome
                      key={AD_ID}
                      image={mainImage}
                      ctg1={AD_CTG}
                      ctg2={AD_CTG2}
                      srchEnd={AD_SRCH_END}
                      name={AD_NAME}
                      shrtDisc={AD_SHRT_DISC}
                      participantsLength={TB_PARTICIPANTs.length}
                      cnt={AD_INF_CNT}
                      proportion={proportion}
                      isMD={isMD}
                      onClick={() => detailInfo(item.AD_ID)}
                    />
                  );
                })}
              </Slider>
            </Box> */}
    </React.Fragment>
  );
}

export default HomeCampaigns;
