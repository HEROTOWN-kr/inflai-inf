import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import StyledImage from '../../../../containers/StyledImage';
import StyledText from '../../../../containers/StyledText';
import { Colors } from '../../../../lib/Сonstants';
import noFound from '../../../../img/notFound400_316.png';
import StyledButton from '../../../../containers/StyledButton';

function CampaignSelectedCard(props) {
  const {
    writeReview, image, type, srchEnd,
    name, shrtDisc, onClick, review, adId
  } = props;

  const history = useHistory();

  function calculateDates(date) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const lastDate = new Date(date);
    if (lastDate < currentDate) {
      return '마감';
    }
    const daysLag = Math.ceil(Math.abs(lastDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    return daysLag;
  }

  function getQuestions() {
    history.push({
      pathname: '/Question',
      state: {
        adId,
        campaignName: name,
        shortDiscription: shrtDisc,
        photo: image,
        type,
      }
    });
  }

  return (
    <Box width={{ xs: 'inherit', md: '550px', lg: '800px' }} p="10px" border="1px solid #eaeaea" overflow="hidden">
      <Grid container spacing={1}>
        <Grid item xs="auto">
          <StyledImage width="90px" height="90px" src={image || noFound} onError={event => event.target.setAttribute('src', noFound)} />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Box>
            <StyledText>
              {type === '1' ? (
                <span style={{ color: Colors.pink, fontWeight: '600' }}>Instagram</span>
              ) : null}
              {type === '2' ? (
                <span style={{ color: Colors.red, fontWeight: '600' }}>Youtube</span>
              ) : null}
              {type === '3' ? (
                <span style={{ color: Colors.green, fontWeight: '600' }}>Blog</span>
              ) : null}
              {` D-${calculateDates(srchEnd)}`}
            </StyledText>
            <StyledText lineHeight="1.2em" my="8px" fontWeight="bold" fontSize="16px">{name}</StyledText>
            <StyledText overflowHidden lineHeight="1.2em" fontSize="13px">{shrtDisc}</StyledText>
          </Box>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Box width={{ xs: '100%', sm: '200px' }}>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <StyledButton height="30px" padding="0 10px" onClick={onClick}>가이드보기</StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton
                    height="30px"
                    padding="0 10px"
                    background={Colors.green}
                    hoverBackground={Colors.greenHover}
                    onClick={writeReview}
                  >
                    {review ? '리뷰 수정' : '리뷰 등록'}
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>
            <Box mt={1}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <StyledButton
                    height="30px"
                    padding="0 10px"
                    background={Colors.green}
                    hoverBackground={Colors.greenHover}
                    onClick={getQuestions}
                  >
                    문의
                  </StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton
                    disabled
                    height="30px"
                    padding="0 10px"
                    background={Colors.green}
                    hoverBackground={Colors.greenHover}
                    onClick={getQuestions}
                  >
                    판매링크
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

    </Box>
  );
}

export default CampaignSelectedCard;
