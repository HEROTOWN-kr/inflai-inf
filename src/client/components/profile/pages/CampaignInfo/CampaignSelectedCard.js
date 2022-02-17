import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { SupervisorAccount } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import StyledImage from '../../../../containers/StyledImage';
import StyledText from '../../../../containers/StyledText';
import { AdvertiseTypes, Colors } from '../../../../lib/Сonstants';
import StyledSvg from '../../../../containers/StyledSvg';
import noImage from '../../../../img/noImage.png';
import noFound from '../../../../img/notFound400_316.png';
import StyledButton from '../../../../containers/StyledButton';
import ReviewInfoDialog from './ReviewInfoDialog';

function CampaignSelectedCard(props) {
  const {
    writeReview, image, type, ctg1, ctg2, srchEnd, name, shrtDisc, participantsLength, cnt, proportion, onClick, isMD, review
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
        <Grid item xs>
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
              {/* <span style={{ color: Colors.pink }}>{`${AdvertiseTypes.mainType[ctg1]}/${AdvertiseTypes.subType[ctg1][ctg2]}`}</span> */}
              {` D-${calculateDates(srchEnd)}`}
            </StyledText>
            <StyledText lineHeight="1.2em" my="8px" fontWeight="bold" fontSize="16px">{name}</StyledText>
            <StyledText lineHeight="1.2em" fontSize="13px">{shrtDisc}</StyledText>
          </Box>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Box width={{ xs: '100%', sm: '100px' }}>
            <Grid container spacing={1}>
              <Grid item xs={4} sm={12}>
                <StyledButton height="30px" padding="0 10px" onClick={onClick}>가이드보기</StyledButton>
              </Grid>
              <Grid item xs={4} sm={12}>
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
              <Grid item xs={4} sm={12}>
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
            </Grid>
          </Box>
        </Grid>
      </Grid>

    </Box>
  );
}

export default CampaignSelectedCard;
