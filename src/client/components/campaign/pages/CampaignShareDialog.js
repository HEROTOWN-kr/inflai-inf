import React from 'react';
import {
  Box, Button, Dialog, IconButton, makeStyles, useMediaQuery
} from '@material-ui/core';
import { Clear, FavoriteBorder } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { Colors } from '../../../lib/Сonstants';

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
  }
});

function CampaignShareDialog(props) {
  const { open, closeDialog } = props;
  const history = useHistory();
  const classes = useStyles();
  const { Kakao } = window;

  function sendLink() {
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '[배송형] 패브릭/인조가죽 누빔 스툴 16종',
        description: '코지모빌리 배송형 누빔 스툴 체험해보세요!',
        imageUrl:
            'https://influencer.inflai.com/attach/campaign/71/aui92rd5kih2q9uv_400_316.jpg',
        link: {
          mobileWebUrl: 'https://influencer.inflai.com/Campaign/detail/71',
          webUrl: 'https://influencer.inflai.com/Campaign/detail/71',
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
            mobileWebUrl: 'https://influencer.inflai.com/Campaign/detail/71',
            webUrl: 'https://influencer.inflai.com/Campaign/detail/71',
          },
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: 'https://influencer.inflai.com/Campaign/detail/71',
            webUrl: 'https://influencer.inflai.com/Campaign/detail/71',
          },
        },
      ],
    });
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
      <Box px={2} py={2} width="300px" boxSizing="border-box">
        <Button classes={{ root: classes.button }} onClick={sendLink}>
          <img
            src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
          />
        </Button>
      </Box>
    </Dialog>
  );
}

export default CampaignShareDialog;
