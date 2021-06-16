import React, {
  useContext, useEffect, useRef, useState
} from 'react';
import {
  Box, Grid, makeStyles, Typography, useMediaQuery, useTheme
} from '@material-ui/core';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import LabelComponent from '../UserInfo/LabelComponent';
import AuthContext from '../../../../context/AuthContext';
import StyledText from '../../../../containers/StyledText';
import StyledImage from '../../../../containers/StyledImage';
import youtubeIcon from '../../../../img/youtube.png';
import YoutubeDialog from '../../../login/YoutubeDialog';

const useStyles = makeStyles({
  root: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#000000a6'
  }
});

function CardComponent(props) {
  const { title, data } = props;
  const classes = useStyles();

  return (
    <Box width={{ xs: 'auto', sm: '170px' }} p="12px" fontSize="14px" border="1px solid #e8e8e8" color="#aeaeae">
      {title}
      <Box mt="12px">
        <Typography classes={classes} noWrap>{data}</Typography>
      </Box>
    </Box>
  );
}

function Youtube(props) {
  const { changeTab } = props;
  const { token } = useContext(AuthContext);
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false);
  const [youtubeInfo, setYoutubeInfo] = useState({
    id: null,
    channelId: null,
    channelName: null,
    subs: null,
    views: null,
    updated: null
  });
  const GoogleButtonRef = useRef(null);

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  function toggleYoutubeDialog() {
    setYoutubeDialogOpen(!youtubeDialogOpen);
  }

  function getChannelInfo() {
    axios.get('/api/TB_YOUTUBE/channelInfo', { params: { token } }).then((res) => {
      if (res.status === 200) {
        const {
          YOU_ID, YOU_ACCOUNT_ID, YOU_NAME, YOU_SUBS, YOU_VIEWS, YOU_UPD_DATE
        } = res.data.data;
        setYoutubeInfo({
          ...youtubeInfo,
          channelId: YOU_ACCOUNT_ID,
          channelName: YOU_NAME,
          subs: YOU_SUBS,
          views: YOU_VIEWS,
          updated: YOU_UPD_DATE,
          id: YOU_ID,
        });
      } else if (res.status === 201) {
        setYoutubeInfo({
          ...youtubeInfo,
          channelId: '',
          channelName: '',
          subs: '',
          views: '',
          id: '',
          updated: null,
        });
      }
    }).catch(err => alert(err.response.data.message));
  }

  function youtubeButtonClick() {
    if (!youtubeInfo.id) {
      setYoutubeDialogOpen(!youtubeDialogOpen);
    } else {
      axios.post('/api/TB_YOUTUBE/delete', {
        id: youtubeInfo.id
      }).then((res) => {
        getChannelInfo();
      }).catch(err => alert(err.message));
    }
  }

  useEffect(() => {
    if (token) {
      changeTab(3);
      getChannelInfo();
    }
  }, [token]);

  const responseGoogle = async (response) => {
    if (!response.error) {
      axios.post('/api/TB_YOUTUBE/add', {
        code: response.code,
        host: window.location.host,
        token
      }).then((res) => {
        getChannelInfo();
      }).catch(error => alert(error.response.data.message));
    } else {
      alert('google auth error');
    }
  };

  return (
    <Box py={{ xs: 1, md: 4 }} px={{ xs: 1, md: 6 }}>

      <Box mb={2} py={2} px={2} width={{ xs: 'inherit', md: '250px' }} border="1px solid #e9ecef" css={{ cursor: 'pointer' }} onClick={() => youtubeButtonClick()}>
        <Grid container justify="center" spacing={1}>
          <Grid item>
            <StyledImage width="24px" height="18px" src={youtubeIcon} />
          </Grid>
          <Grid item>
            <StyledText>{youtubeInfo.id ? '유튜브 연결 해제' : '유튜브 연결하기'}</StyledText>
          </Grid>
        </Grid>
      </Box>
      <Box mb={2}>
        <LabelComponent fontWeight="700" color="#000000" fontSize="15px" labelName="연동된 유튜브체널 정보" />
      </Box>
      <Grid container spacing={isSM ? 2 : 1}>
        <Grid item xs={6} sm="auto">
          <CardComponent title="체널이름" data={youtubeInfo.channelName || '-'} />
        </Grid>
        <Grid item xs={6} sm="auto">
          <CardComponent title="조회수" data={youtubeInfo.views || '-'} />
        </Grid>
        <Grid item xs={6} sm="auto">
          <CardComponent title="구독자수" data={youtubeInfo.subs || '-'} />
        </Grid>
      </Grid>
      {youtubeInfo.updated ? (
        <Box mt={4} fontSize="15px">
            업데이트 날짜
          {' '}
          <span style={{ fontWeight: 'bold' }}>
            {youtubeInfo.updated}
          </span>
        </Box>
      ) : null}
      <YoutubeDialog open={youtubeDialogOpen} closeDialog={toggleYoutubeDialog} googleLogin={() => GoogleButtonRef.current.click()} />
      <GoogleLogin
        clientId="997274422725-gb40o5tv579csr09ch7q8an63tfmjgfo.apps.googleusercontent.com" // CLIENTID                buttonText="LOGIN WITH GOOGLE"
        scope="profile email https://www.googleapis.com/auth/youtube.readonly"
        responseType="code"
        accessType="offline"
        prompt="consent"
        render={renderProps => (
          <button ref={GoogleButtonRef} onClick={renderProps.onClick} disabled={renderProps.disabled} style={{ display: 'none' }}>This is my custom Google button</button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </Box>
  );
}

export default Youtube;
