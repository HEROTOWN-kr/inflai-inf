import React, {createRef, useEffect, useState} from 'react';
import {Box, Grid, makeStyles} from '@material-ui/core';
import {Close} from '@material-ui/icons';
import {SnackbarProvider} from 'notistack';
import Main from './main/Main';
import CustomNavBar from './navbar/Navbar';
import Footer from './footer/Footer';
import useAuth from '../hooks/auth.hook';
import AuthContext from '../context/AuthContext';
import MobileIcon from '../img/mobileIcon.png';
import MainDialog from '../img/banners/mainDialog.png';

const useStyles = makeStyles(theme => ({
  AppLink: {
    position: 'fixed',
    bottom: '120px',
    left: '50%',
    zIndex: 1000,
    width: 180,
    // marginLeft: '-90px',
    transform: 'translateX(-50%)',
    height: '50px',
    animation: 'GradientAnimation 40s ease infinite',
    background: 'linear-gradient(        270deg    ,#fff,#fff)',
    backgroundSize: '300% 300%',
    borderRadius: '80px',
    boxShadow: '0 2px 8px 0 rgb(0 0 0 / 20%)',
    margin: '0 auto',
    boxSizing: 'border-box',
    padding: '5px',
  },
  LinkText: {
    color: '#000',
    fontWeight: '300',
    minWidth: '90px',
    fontSize: '17px',
    letterSpacing: '0.01em',
    marginLeft: '8px'
  },
  closeIcon: {
    position: 'absolute',
    right: '8px',
    top: '14px'
  },
  snackbarCloseIcon: {
    cursor: 'pointer'
  },

  popMain: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100%',
    zIndex: 999
  },
  dialogContainer: {
    position: 'absolute',
    top: '110px',
    left: '700px',
    [theme.breakpoints.down('md')]: {
      top: '78px !important',
      left: '50% !important',
      transform: 'translateX(-50%)',
    }
  },
  dialogImage: {
    /* width: '400px',
    height: '500px', */
  },
  dialogFooter: {
    padding: '7px 10px',
    background: '#222',
    textAlign: 'right'
  },
  imgFileMedia: {
    width: '400px',
    height: '500px',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    [theme.breakpoints.down('md')]: {
      width: '96% !important',
      minWidth: '275px',
      minHeight: '300px',
      height: 'auto !important',
    }
  },
}));

function MobileAppLink(props) {
  const { close, mobileLink } = props;
  const classes = useStyles();

  return (
    <Box className={classes.AppLink}>
      <Grid container alignItems="center">
        <Grid item>
          <img src={MobileIcon} width={40} height={40} alt="noImg" />
        </Grid>
        <Grid item>
          <Box className={classes.LinkText} onClick={() => window.open(mobileLink.url, '_blank')}>
                  앱에서 열기
          </Box>
        </Grid>
      </Grid>
      <Close className={classes.closeIcon} onClick={close} />
    </Box>
  );
}

function StartDialog() {
  const [visible, setVisible] = useState(true);
  const classes = useStyles();

  return (
    <Box className={classes.popMain} style={{ display: visible ? 'block' : 'none' }}>
      <Box className={classes.dialogContainer}>
        <Box className={classes.dialogImage}>
          <img className={classes.imgFileMedia} src={MainDialog} alt="nofoto" />
        </Box>
        <Box className={classes.dialogFooter}>
          <button onClick={() => setVisible(false)}>닫기</button>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  const {
    token, login, logout, userDataUpdate, userPhoto, socialType, userName, ready
  } = useAuth();
  const [mobileLink, setMobileLink] = useState({
    show: false,
    url: 'https://www.inflai.com'
  });
  const classes = useStyles();
  const isAuthenticated = !!token;
  const showFooter = window.location.pathname !== '/search_addr';

  const snackbarRef = createRef();
  const onClickDismiss = key => () => {
    snackbarRef.current.closeSnackbar(key);
  };

  function closeShowLink() {
    setMobileLink({ ...mobileLink, show: false });
  }

  function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }

    if (/android/i.test(userAgent)) {
      return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    }

    return 'unknown';
  }

  const mobileOperator = getMobileOperatingSystem();

  useEffect(() => {
    if (mobileOperator === 'Android') {
      setMobileLink({ show: true, url: 'https://play.google.com/store/apps/details?id=com.kyad.inflai' });
    }
    if (mobileOperator === 'iOS') {
      setMobileLink({ show: true, url: 'https://apps.apple.com/us/app/%EC%9D%B8%ED%94%8C%EB%9D%BC%EC%9D%B4-inflai/id1596312957' });
    }
  }, []);

  return (
    <React.Fragment>
      <AuthContext.Provider value={{
        token, login, logout, userDataUpdate, userPhoto, socialType, userName, isAuthenticated
      }}
      >
        <SnackbarProvider
          ref={snackbarRef}
          action={key => (
            <Close className={classes.snackbarCloseIcon} onClick={onClickDismiss(key)} />
          )}
        >
          {/*<StartDialog />*/}

          <div className="app-block">
            <div className="app-header">
              <CustomNavBar />
            </div>
            <div className="app-body">
              <Main />
            </div>
            {showFooter ? (
              <div className="app-footer">
                <Footer />
              </div>
            ) : null}
            {mobileLink.show ? <MobileAppLink close={closeShowLink} mobileLink={mobileLink} /> : null}
          </div>
        </SnackbarProvider>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
