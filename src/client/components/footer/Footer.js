import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import Logo from '../../img/logo_color.png';
import StyledImage from '../../containers/StyledImage';
import InstaIcon from '../../img/instagram-icon.png';
import KakaoIcon from '../../img/kakao-logo.png';
import BlogIcon from '../../img/icon_blog_url.png';

const snsButtons = [
  {
    src: InstaIcon,
    url: 'https://www.instagram.com/inflai_com/'
  },
  {
    src: KakaoIcon,
    url: 'http://pf.kakao.com/_AYxeUxb'
  },
  {
    src: BlogIcon,
    url: 'https://blog.naver.com/inflai'
  },
];


function Footer() {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box py={isMD ? 6 : 2} className="footer">
      <Box px={2} maxWidth="1100px" fontSize={{ xs: '13px', md: '16px' }} textAlign={{ xs: 'center', md: 'left' }} margin="0 auto" className="footer-container">
        <Grid container>
          <Grid item xs={12} md="auto">
            <Box mr={{ xs: '0', md: '82px' }}>
              <StyledImage width={isMD ? '80px' : '65px'} src={Logo} />
            </Box>
          </Grid>
          <Grid item xs>
            <Box className="rules" mt={{ xs: 2, md: 0 }}>
              <Grid container justify={isMD ? 'flex-start' : 'center'}>
                <Grid item>
                  <Link
                    className="footer-link"
                    to="/Policy/Service"
                  >
                    이용약관
                  </Link>
                  {' | '}
                  <Link
                    className="footer-link"
                    to="/Policy/Privacy"
                  >
                    개인정보 처리방침
                  </Link>
                </Grid>
                <Grid item xs={12} md>
                  <Box mt={{ xs: 2, md: 0 }}>
                    <Grid container justify={isMD ? 'flex-end' : 'center'} spacing={1}>
                      {snsButtons.map(item => (
                        <Grid item key={item.url}>
                          <StyledImage
                            cursor="pointer"
                            width="30px"
                            height="30px"
                            src={item.src}
                            onClick={() => window.open(item.url, '_blank')}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>

            </Box>
            <Box my="24px" className="info">
              <div>대표 : 김무성 | 주소 : 경기도 고양시 덕양구 삼원로 83 광양프런티어밸리 6차 801-812호</div>
              <div>대표전화 : 1522-7947  | Mail : inflai@naver.com</div>
              <div>사업자번호 : 695-81-00452</div>
            </Box>
            <Box>
              Copyright © INFLAi. All Rights Reserved.
            </Box>
          </Grid>
        </Grid>
      </Box>


      {/* <Box px={2} className="footer-container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} className="footer-logo">
            <StyledImage width={isMD ? '80px' : '65px'} src={Logo} />
          </Grid>
          <Grid item xs={12} sm={9} className="footer-text">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="rules">
                  <Link
                    className="footer-link"
                    to="/Policy/Service"
                  >
                    이용약관
                  </Link>
                  {' | '}
                  <Link
                    className="footer-link"
                    to="/Policy/Privacy"
                  >
                    개인정보 처리방침
                  </Link>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="info">
                  <div>대표 : 김무성 | 주소 : 경기도 고양시 일산동구 백마로 195 엠시티 섹션동 4층 4003호</div>
                  <div>대표전화 : 1522-7947  | Mail : myfna@naver.com</div>
                  <div>사업자번호 : 695-81-00452</div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>Copyright © INFLAi. All Rights Reserved.</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
}

export default Footer;
