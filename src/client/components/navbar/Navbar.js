import React, { useCallback, useEffect, useState } from 'react';
import {
  useLocation, withRouter, matchPath, match, useParams
} from 'react-router-dom';
import {
  AppBar,
  Grid,
  Box, Hidden, useTheme, useMediaQuery
} from '@material-ui/core';

import NavbarLinks from './NavbarLinks';
import NavbarLogo from './NavbarLogo';
import NavbarUserMenu from './NavbarUserMenu';
import MobileNavBar from './MobileView/MobileNavBar';
import BottomMenu from './MobileView/BottomMenu';

function NavbarComponent(props) {
  return (
    <Box px={{ xs: 2, md: 8 }} className="navbar">
      <AppBar position="static" color="transparent" className="navbar-content">
        <Grid container alignItems="center" justify="space-between" className="bar">
          <Grid item className="left-side">
            <Grid container alignItems="center">
              <Grid item>
                <NavbarLogo />
              </Grid>
              <Grid item>
                <NavbarLinks {...props} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="flex-end" alignItems="center">
              <Grid item>
                <NavbarUserMenu {...props} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}

function CustomNavbar(props) {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  const urlParams = window.location.search;
  const searchParams = new URLSearchParams(urlParams);
  const isWebView = searchParams.has('m');

  const location = useLocation();
  const [visible, setVisible] = useState({ top: true, bottom: true });

  function checkPath(pathname) {
    const matchBottomMenu = matchPath(pathname, {
      path: ['/Campaign/detail/:id', '/Campaign/apply/:id'],
      exact: true,
      strict: false
    });

    const matchMobileNav = matchPath(pathname, {
      path: ['/Campaign/detail/:id', '/Campaign/apply/:id'],
      exact: true,
      strict: false
    });

    const matchMobileWebView = matchPath(pathname, {
      path: ['/Profile/Sns/Instagram', '/Profile/Sns/NaverBlog', '/Profile/Sns/Youtube', '/Policy/Service', '/Policy/Privacy'],
      exact: true,
      strict: true
    });

    const matchSearchAddr = matchPath(pathname, {
      path: ['/search_addr'],
      exact: true,
      strict: true
    });

    if (matchBottomMenu) {
      setVisible({ ...visible, bottom: false });
    } else {
      setVisible({ ...visible, bottom: true });
    }

    if (matchMobileNav) {
      setVisible({ ...visible, top: false });
    } else {
      setVisible({ ...visible, top: true });
    }

    if (matchMobileWebView && isWebView) {
      setVisible({ bottom: false, top: false });
    }

    if (matchSearchAddr) {
      setVisible({ bottom: false, top: false });
    }
  }

  useEffect(() => {
    checkPath(location.pathname);
  }, [location]);

  useEffect(() => {
    checkPath(location.pathname);
  }, []);

  return (
    <React.Fragment>
      {isMD ? (
        <NavbarComponent {...props} isMD={isMD} />
      ) : (
        <React.Fragment>
          { visible.top ? <MobileNavBar /> : null }
          { visible.bottom ? <BottomMenu /> : null }
        </React.Fragment>
      )}

    </React.Fragment>
  );
}

export default withRouter(CustomNavbar);
