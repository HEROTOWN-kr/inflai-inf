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

function HomeCampaigns(props) {
  const history = useHistory();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const theme = useTheme();

  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const is1600 = useMediaQuery('(min-width:1600px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 2000,
    beforeChange: () => setDragging(true),
    afterChange: () => setDragging(false),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, slidesToScroll: 2, arrows: false, dots: true, rows: 3
        }
      },
      {
        breakpoint: 960,
        settings: { slidesToShow: 3, slidesToScroll: 3 }
      },
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4, slidesToScroll: 4 }
      },
      {
        breakpoint: 1600,
        settings: { slidesToShow: 5, slidesToScroll: 5 }
      },
      {
        breakpoint: 1920,
        settings: { slidesToShow: 6, slidesToScroll: 6 }
      },


      /* {
        breakpoint: 10000,
        settings: 'unslick'
      }, */
    ]
  };

  function getCardWidth() {
    if (isXl) {
      return '16.666%';
    } if (is1600) {
      return '20%';
    } if (isLG) {
      return '25%';
    } if (isMD) {
      return '33.333%';
    } if (isSM) {
      return '33.333%';
    }
    return '50%';
  }


  function getCampaigns() {
    setLoading(true);
    // const params = { limit: 6 };
    const params = { limit: null };

    axios.get('/api/TB_AD/list', { params }).then((res) => {
      const { data } = res.data;
      setCampaigns(data);
      setLoading(false);
    }).catch(err => alert(err.response.data.message));
  }

  function detailInfo(AD_ID) {
    if (!dragging) {
      history.push(`/Campaign/detail/${AD_ID}`);
    }
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <React.Fragment>
      <StyledText fontSize="25">
        <span style={{ color: Colors.pink }}>최근</span>
        {' 캠페인'}
      </StyledText>
      <Box mt={{ xs: 2, md: 5 }}>
        <CampaignAll {...props} campaigns={campaigns} loading={loading} />
      </Box>
      {/* {loading ? (
        <Grid container>
          <Grid item style={{ width: getCardWidth() }}>
            <Box
              border="1px solid #eaeaea"
              overflow="hidden"
              borderRadius="10px"
              css={{ cursor: 'pointer' }}
            >
              <Skeleton variant="rect" width="100%" height={186} />
              <Box p={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Skeleton variant="text" width="50%" />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="text" />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="text" />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="text" />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box>
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
            </Box>
          ) : (
            <Box mt={4} textAlign="center">조회된 캠페인이 없습니다.</Box>
          )}
        </Box>
      )} */}
    </React.Fragment>
  );
}

export default HomeCampaigns;
