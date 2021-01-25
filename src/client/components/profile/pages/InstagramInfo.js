import React, { useContext, useEffect, useState } from 'react';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import {
  ChatBubble, Room, Favorite, Image, Details, ChangeHistory, ImportExportOutlined, CalendarToday
} from '@material-ui/icons';
import WhiteBlock from '../../../containers/WhiteBlock';
import StyledImage from '../../../containers/StyledImage';
import Common from '../../../lib/common';
import defaultAccountImage from '../../../img/default_account_image.png';
import StyledText from '../../../containers/StyledText';
import StyledSvg from '../../../containers/StyledSvg';
import GoogleVisionGraph from './Graphs/GoogleVisionGraph';
import LikeCommentBarGraph from './Graphs/LikeCommentBarGraph';
import { Colors } from '../../../lib/Сonstants';
import AgeGraph from './Graphs/AgeGraph';
import GenderGraph from './Graphs/GenderGraph';
import MapGraph from './Graphs/MapGraph';
import AuthContext from '../../../context/AuthContext';
import MapGraph2 from './Graphs/MapGraph2';

function InstagramInfo(props) {
  const { isMD, isSM } = props;
  const [instaData, setInstaData] = useState({});
  const { token } = useContext(AuthContext);

  async function getInstaInfo() {
    try {
      const InstaData = await axios.get('/api/TB_INSTA/rankingInfo', {
        params: {
          token
        }
      });
      const { data } = InstaData.data;
      setInstaData(data);
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  useEffect(() => {
    if (token) getInstaInfo();
  }, [token]);

  return (
    <Box>
      {instaData.INS_ID ? (
        <Grid container spacing={isMD ? 3 : 0}>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={isMD ? 3 : 0}>
              <Grid item xs={12}>
                <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
                  <Box p={{ xs: 2, md: 3 }}>
                    <Grid container alignItems="center" spacing={3}>
                      <Grid item xs={12} sm="auto">
                        <StyledImage width={isSM ? '125px' : '100px'} height={isSM ? '125px' : '100px'} borderRadius="100%" src={instaData.INS_PROFILE_IMG || defaultAccountImage} />
                      </Grid>
                      <Grid item xs>
                        <Grid container direction="column" spacing={2}>
                          <Grid item>
                            <StyledText textAlign={isSM ? 'inherit' : 'center'} fontSize="20px" fontWeight="bold">{instaData.INS_NAME || instaData.INS_USERNAME}</StyledText>
                          </Grid>
                          <Grid item>
                            <Grid container justify="space-between">
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={1}>
                                  <Grid item><StyledText fontWeight="bold">{instaData.INS_MEDIA_CNT}</StyledText></Grid>
                                  <Grid item>
                                    <StyledText fontSize="14px">개시물 수</StyledText>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={1}>
                                  <Grid item><StyledText fontWeight="bold">{instaData.INS_FLWR}</StyledText></Grid>
                                  <Grid item>
                                    <StyledText fontSize="14px">팔로워 수</StyledText>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid container direction="column" alignItems="center" spacing={1}>
                                  <Grid item><StyledText fontWeight="bold">{instaData.INS_FLW}</StyledText></Grid>
                                  <Grid item>
                                    <StyledText fontSize="14px">팔로잉 수</StyledText>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <StyledText fontSize="14px" fontWeight="bold">{instaData.INS_USERNAME}</StyledText>
                          </Grid>
                          <Grid item>
                            <StyledText fontSize="14px">{instaData.biography}</StyledText>
                          </Grid>
                          <Grid item>
                            <StyledText fontSize="14px" color="#409CFF" fontWeight="bold">{instaData.website}</StyledText>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </WhiteBlock>
              </Grid>
              <Grid item xs={6}>
                <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
                  <Box px={2} pt={2} pb={{ xs: 3, md: 5 }}>
                    <Grid container direction="column" spacing={2} alignItems="center">
                      <Grid item container justify="space-between" alignItems="center">
                        <Grid item><StyledText fontSize="14px">좋아요 수</StyledText></Grid>
                        <StyledSvg
                          component={Favorite}
                          color={Colors.orange}
                          fontSize="14px"
                          padding="8px"
                          background={Colors.orangeBack}
                          borderRadius="100%"
                        />
                      </Grid>
                      <Grid item><StyledText fontSize={isMD ? '30px' : '24px'} fontWeight="900">{instaData.INS_LIKES || instaData.INS_LIKES2}</StyledText></Grid>
                    </Grid>
                  </Box>
                </WhiteBlock>
              </Grid>
              <Grid item xs={6}>
                <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
                  <Box px={2} pt={2} pb={{ xs: 3, md: 5 }}>
                    <Grid container direction="column" spacing={2} alignItems="center">
                      <Grid item container justify="space-between" alignItems="center">
                        <Grid item><StyledText fontSize="14px">댓글 수</StyledText></Grid>
                        <StyledSvg
                          component={ChatBubble}
                          color={Colors.blue2}
                          fontSize="14px"
                          padding="8px"
                          background={Colors.blue2Back}
                          borderRadius="100%"
                        />
                      </Grid>
                      <Grid item><StyledText fontSize={isMD ? '30px' : '24px'} fontWeight="900">{instaData.INS_CMNT || instaData.INS_CMNT2}</StyledText></Grid>
                    </Grid>
                  </Box>
                </WhiteBlock>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WhiteBlock borderRadius={isMD ? '25px' : '0'} height="100%">
              <Box px={2} py={2}>
                <Grid container justify="space-between" spacing={4}>
                  <Grid item xs={12} container justify="space-between" alignItems="center">
                    <Grid item><StyledText fontSize="14px">콘텐츠 카테고리</StyledText></Grid>
                    <StyledSvg
                      component={Image}
                      color={Colors.orange}
                      fontSize="14px"
                      padding="8px"
                      background={Colors.orangeBack}
                      borderRadius="100%"
                    />
                  </Grid>
                  <Grid item xs={12} style={{ width: '100%' }}>
                    <GoogleVisionGraph INS_ID={instaData.INS_ID} />
                  </Grid>
                </Grid>
              </Box>
            </WhiteBlock>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
              <Box p={2}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs><StyledText fontSize="14px">인플루언서 계정의 각 게시물마다 (좋아요, 댓글) 수 비교</StyledText></Grid>
                      <Grid item>
                        <StyledSvg
                          component={ImportExportOutlined}
                          color={Colors.orange}
                          fontSize="14px"
                          padding="8px"
                          background={Colors.orangeBack}
                          borderRadius="100%"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <LikeCommentBarGraph INS_ID={instaData.INS_ID} />
                  </Grid>
                </Grid>
              </Box>
            </WhiteBlock>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WhiteBlock borderRadius={isMD ? '25px' : '0'} height="100%">
              <Box p={2}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs><StyledText fontSize="14px">팔로워의 나이</StyledText></Grid>
                      <Grid item>
                        <StyledSvg
                          component={CalendarToday}
                          color={Colors.blue2}
                          fontSize="14px"
                          padding="8px"
                          background={Colors.blue2Back}
                          borderRadius="100%"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AgeGraph INS_ID={instaData.INS_ID} />
                  </Grid>
                </Grid>
              </Box>
            </WhiteBlock>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
              <Box px={2} py={2}>
                <Grid container spacing={4}>
                  <Grid item xs={12} container justify="space-between" alignItems="center">
                    <StyledSvg
                      component={Details}
                      color={Colors.orange}
                      fontSize="14px"
                      padding="8px"
                      background={Colors.orangeBack}
                      borderRadius="100%"
                    />
                    <Grid item><StyledText fontSize="14px">성비</StyledText></Grid>
                    <StyledSvg
                      component={ChangeHistory}
                      color={Colors.blue2}
                      fontSize="14px"
                      padding="8px"
                      background={Colors.blue2Back}
                      borderRadius="100%"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <GenderGraph INS_ID={instaData.INS_ID} />
                  </Grid>
                </Grid>
              </Box>
            </WhiteBlock>
          </Grid>
          <Grid item xs={12} sm={6}>
            <WhiteBlock borderRadius={isMD ? '25px' : '0'}>
              <Box px={2} py={2}>
                <Grid container spacing={4}>
                  <Grid item xs={12} container justify="space-between" alignItems="center">
                    <Grid item><StyledText fontSize="14px">팔로워의 지도</StyledText></Grid>
                    <StyledSvg
                      component={Room}
                      color={Colors.orange}
                      fontSize="14px"
                      padding="8px"
                      background={Colors.orangeBack}
                      borderRadius="100%"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MapGraph2 INS_ID={instaData.INS_ID} />
                    {/* <MapGraph INS_ID={instaData.INS_ID} /> */}
                  </Grid>
                </Grid>
              </Box>
            </WhiteBlock>
          </Grid>
        </Grid>
      ) : (
        <Grid container justify="center">
          <Grid item>
            <StyledText>인스타 계정을 연결해주세요</StyledText>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default InstagramInfo;
