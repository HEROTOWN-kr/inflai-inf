import React, { useRef, useState } from 'react';
import {
  Box, Button, Dialog, Grid, IconButton, makeStyles, useMediaQuery
} from '@material-ui/core';
import { Clear, FavoriteBorder } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { Colors } from '../../lib/Сonstants';
import StyledTextField from '../../containers/StyledTextField';
import StyledButton from '../../containers/StyledButton';
import NaverIcon from '../../img/naver-icon.png';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    // width: '100%',
    borderRadius: '2px'
  },
  button: {
    padding: 0,
    minWidth: 0
  },
  socialMediaButton: {

  }
});

function FBShareBtn(props) {
  const location = useLocation();
  const currentUrl = `https://influencer.inflai.com${location.pathname}`;

  const classes = useStyles();
  return (
    <FacebookShareButton
      url={currentUrl}
      quote=""
      hashtag=""
      className={classes.socialMediaButton}
    >
      <FacebookIcon size={34} />
    </FacebookShareButton>
  );
}

function CampaignShareDialog(props) {
  const {
    open, closeDialog, title, description, img
  } = props;

  const location = useLocation();
  const ref = useRef();
  const currentUrl = `https://influencer.inflai.com${location.pathname}`;
  const classes = useStyles();
  const { Kakao } = window;
  const imgUrl = img.indexOf('https://') > -1 ? img : `https://influencer.inflai.com${img}`;

  function sendLink() {
    const currentUrl = `https://influencer.inflai.com${location.pathname}`;

    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: imgUrl,
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      /* social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      }, */
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      ],
    });
  }

  function share() {
    const url = encodeURI(encodeURIComponent(currentUrl));
    const titleTxt = encodeURI('캠페인 공유');
    window.open(`https://share.naver.com/web/shareView.nhn?url=${url}&title=${titleTxt}`, '_blank')`https://share.naver.com/web/shareView.nhn?url=${url}&title=${titleTxt}`;
    // window.open(`http://blog.naver.com/openapi/share?url=${url}&title=${titleTxt}`, '_blank')`https://share.naver.com/web/shareView.nhn?url=${url}&title=${titleTxt}`;
  }

  function copyUrl() {
    ref.current.select();
    document.execCommand('copy');
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={closeDialog}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box p="15px" fontSize="18px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
              공유하기
        <IconButton size="medium" classes={{ root: classes.root }} onClick={closeDialog}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} width="325px" boxSizing="border-box">
        <Grid container justify="flex-end" spacing={1}>
          <Grid item>
            <Button classes={{ root: classes.button }} onClick={sendLink}>
              <img
                src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
              />
            </Button>
          </Grid>
          <Grid item>
            <Box width="34px" height="34px">
              <Button classes={{ root: classes.button }} onClick={share}>
                <img src={NaverIcon} />
              </Button>
            </Box>
          </Grid>
          {/* <Grid item>
            <Box width="34px" height="34px" borderRadius="7px" overflow="hidden">
              <FBShareBtn />
            </Box>
          </Grid> */}
        </Grid>
        <Box mt={2}>
          <Grid container justify="space-between">
            <Grid item>
              <StyledTextField
                variant="outlined"
                inputProps={{ readOnly: true }}
                value={currentUrl}
                inputRef={ref}
              />
            </Grid>
            <Grid item>
              <StyledButton
                height={39}
                padding="0 18px"
                onClick={copyUrl}
              >
복사
              </StyledButton>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Dialog>
  );
}

export default CampaignShareDialog;
