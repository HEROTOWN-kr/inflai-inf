import React, { useCallback, useEffect, useState } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';
import {
  AppBar,
  Grid,
  Box, Hidden, useTheme, useMediaQuery
} from '@material-ui/core';

import NavbarLinks from './NavbarLinks';
import NavbarLogo from './NavbarLogo';
import NavbarUserMenu from './NavbarUserMenu';
import NavbarMobileMenu from './MobileView/NavbarMobileMenu';
// import NavbarUserMenu from './NavbarUserMenu';
// import NavbarMobileMenu from './MobileView/NavbarMobileMenu';

function CustomNavbar(props) {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box px={{ xs: 2, sm: 4, md: 8 }} className="navbar">
      <AppBar position="static" color="transparent" className="navbar-content">
        <Grid container alignItems="center" justify="space-between" className="bar">
          <Grid item className="left-side">
            <Grid container alignItems="center" spacing={isMD ? 8 : 0}>
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
          {/* <NavbarMobileMenu {...props} /> */}
        </Grid>
      </AppBar>
    </Box>
  );
}

export default withRouter(CustomNavbar);
