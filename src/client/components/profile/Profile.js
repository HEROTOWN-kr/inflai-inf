import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Grid, Hidden, useMediaQuery, useTheme
} from '@material-ui/core';
import axios from 'axios';
import { Colors } from '../../lib/Сonstants';
import ProfileMenu from './ProfileMenu';
import ProfileContent from './ProfileContent';
import AuthContext from '../../context/AuthContext';
import MobileProfileMenu from './MobileProfileMenu';

function Profile(props) {
  const { token } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [currentMenu, setCurrentMenu] = useState(1);
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const is1600 = useMediaQuery('(min-width:1600px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));
  const isXS = useMediaQuery(theme.breakpoints.up('xs'));


  async function getUserInfo() {
    try {
      const response = await axios.get('/api/TB_INFLUENCER/', { params: { token } });
      const { data } = response.data;
      if (data) {
        setUserInfo(data);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  return (
    <Box py={isMD ? 6 : 0} px={isMD ? 1 : 0} css={{ background: Colors.grey3 }} className="profile">
      <Box maxWidth={{ xs: 1500 }} css={{ margin: '0 auto' }}>
        <Grid container spacing={isLG ? 2 : 0}>
          <Hidden mdDown>
            <Grid item>
              <ProfileMenu {...props} userInfo={userInfo} />
            </Grid>
          </Hidden>
          <Hidden lgUp>
            <Grid item xs={12}>
              <MobileProfileMenu currentMenu={currentMenu} setCurrentMenu={setCurrentMenu} />
            </Grid>
          </Hidden>
          <Grid item xs>
            <ProfileContent
              {...props}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              getUserInfo={getUserInfo}
              isMD={isMD}
              isSM={isSM}
              currentMenu={currentMenu}
              setCurrentMenu={setCurrentMenu}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Profile;
