import React from 'react';
import {
  Dialog, Divider, Grid, Button, Box, makeStyles, useTheme, useMediaQuery
} from '@material-ui/core';
import { Clear, WarningRounded, Close } from '@material-ui/icons';
import StyledText from '../../containers/StyledText';
import { Colors } from '../../lib/Сonstants';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '15px',
    right: '14px',
    fontSize: '28px',
    color: '#b9b9b9de',
    cursor: 'pointer'
  },
  paper: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px'
  }
});

function InstagramDialog(props) {
  const {
    closeDialog, open, facebookLogin, userPage
  } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  const data = {
    instagram: {
      title: '인스타그램 계정 연결 안내',
      title2: '연결 주의사항',
      rule1: '1. 인스타그램 정책에 의해 인스타그램 계정은 프로페셔널 계정이며, 페이스북 페이지와 연결되어',
      rule2: '야 연결이 가능합니다. 계정 전환 방법과 연결 방법은 아래 버튼을 눌러 확인해 주세요.',
      rule3: '2. 기존 레뷰에 연결했던 인스타그램 계정이 있다면, 기존 계정을 1개를 연결해 주세요.',
      rule4: '3. 권한 설정 시, 인스타그램 계정과 페이지를 반드시 1개 선택해주세요.',
      rule5: '인스타그램에 연결한 페이지를 선택해주셔야 합니다.',
      rule6: '또한 모든 권한을 허용해주셔야 정상적으로 서비스를 이용하실 수 있습니다.'
    },
    facebook: {
      title: '페이스북 아이디 연결 안내',
      title2: '페이스북 아이디를 사용할 경우, 인스타그램 계정을 함께 연결합니다.',
      rule1: '인스타그램 정책에 따라 인스타그램 계정이',
      rule2: '프로페셔널 계정이며, 인스타그램 계정과 페이지가 연결되어 있을 때 연결하실 수 있습니다.',
      rule3: '또한 권한 허용 시 인스타그램과 연결된 페이지를 선택하셔야 합니다.',
    }
  };

  const text = userPage ? data.instagram : data.facebook;

  function loginFacebook() {
    facebookLogin();
    closeDialog();
  }

  return (
    <Dialog
      // fullScreen={fullScreen}
      maxWidth="md"
      onClose={closeDialog}
      aria-labelledby="simple-dialog-title"
      open={open}
      className="instagram-dialog"
    >
      <Box>
        <Box padding="20px" fontSize="18px" fontWeight="400" lineHeight="18px" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
          {text.title}
          <Clear onClick={closeDialog} classes={{ root: classes.root }} />
        </Box>
      </Box>
      <Divider />
      <Box padding="20px">
        <StyledText fontSize="16" fontWeight="500">{text.title2}</StyledText>
        <Box mt={2}>
          <StyledText fontSize="14" fontWeight="400" lineHeight="1.6em">{text.rule1}</StyledText>
          <StyledText fontSize="14" fontWeight="400" lineHeight="1.6em">{text.rule2}</StyledText>
          <StyledText fontSize="14" fontWeight="400" lineHeight="1.6em">{text.rule3}</StyledText>
          <StyledText fontSize="14" fontWeight="400" lineHeight="1.6em">{text.title2}</StyledText>
          {text.rule4 ? (<StyledText fontSize="14" fontWeight="400" lineHeight="1.6em">{text.rule4}</StyledText>) : null}
          {text.rule5 ? (<StyledText fontSize="14" fontWeight="400" lineHeight="1.6em">{text.rule5}</StyledText>) : null}
          {text.rule6 ? (<StyledText fontSize="14" fontWeight="400" lineHeight="1.6em">{text.rule6}</StyledText>) : null}
        </Box>
        <Grid container spacing={1}>
          <Grid item>
            <Box my={2} p={2} width="120px" border="1px solid #e9ecef" boxSizing="border-box" css={{ cursor: 'pointer' }} onClick={() => window.open('http://pf.kakao.com/_AYxeUxb/62492911', '_blank')}>
              <StyledText>연결방법 (필독)</StyledText>
            </Box>
          </Grid>
          <Grid item>
            <Box my={2} p={2} width="120px" border="1px solid #e9ecef" boxSizing="border-box" css={{ cursor: 'pointer' }} onClick={() => window.open('http://pf.kakao.com/_AYxeUxb', '_blank')}>
              <StyledText textAlign="center">1:1문의</StyledText>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Box mt={1}>
          <Grid container justify="center">
            <Grid item>
              <Button
                className="facebook-button"
                onClick={loginFacebook}
              >
                Login with Facebook
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <DialogTitle id="simple-dialog-title">
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            {text.title}
          </Grid>
          <Grid item>
            <CloseIcon className="close-icon" onClick={closeDialog} />
          </Grid>
        </Grid>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} className="dialog-text">
            <Box pt={1}><StyledText fontSize="16" fontWeight="700">{text.title2}</StyledText></Box>
          </Grid>
          <Grid item xs={12} className="dialog-text">
            <Grid container spacing={1}>
              <Grid item>{text.rule1}</Grid>
              <Grid item>{text.rule2}</Grid>
              <Grid item>{text.rule3}</Grid>
              {text.rule4 ? (<Grid item>{text.rule4}</Grid>) : null}
              {text.rule5 ? (<Grid item>{text.rule5}</Grid>) : null}
              {text.rule6 ? (<Grid item>{text.rule6}</Grid>) : null}
            </Grid>
          </Grid>
          <Grid item xs={12} className="dialog-text">단, 기존에 레뷰 서비스에 연결한 인스타그램 계정이 있는 경우, 동일한 계정을 선택해 연결해주셔야 정상적으로 서비스를 이용하실 수 있습니다. 계정 전환 방법과 연결 방법은 아래 버튼을 눌러 확인해주세요.</Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className="facebook-button"
              onClick={loginFacebook}
            >
                Login with Facebook
            </Button>
          </Grid>
        </Grid>
      </DialogContent> */}
    </Dialog>
  );
}

export default InstagramDialog;
