import React, { useContext, useEffect, useState } from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { Colors } from '../../lib/Сonstants';
import StyledText from '../../containers/StyledText';
import StyledImage from '../../containers/StyledImage';
import defaultAccountImage from '../../img/default_account_image.png';
import WhiteBlock from '../../containers/WhiteBlock';
import AuthContext from '../../context/AuthContext';

const useStyles = makeStyles(() => ({
  checkButton: {
    margin: '16px auto',
    backgroundColor: '#d4eefc',
    textAlign: 'center',
    width: '100px',
    borderRadius: '10px',
    color: '#237af8',
    padding: '7px',
    cursor: 'pointer'
  }
}));

function ProfileMenu(props) {
  const [checked, setChecked] = useState(false);

  const { history, match } = props;
  const {
    userName, userPhoto, socialType, token
  } = useContext(AuthContext);
  const classes = useStyles();

  const links = [
    { text: '내정보 관리', link: '/UserInfo' },
    { text: '내 SNS', link: '/Sns' },
    { text: '캠페인 관리', link: '/CampaignInfo' },
    { text: '관심 캠페인', link: '/Favorite' },
    // { text: '랭킹', link: '/Rank' },
  ];

  function getCheck() {
    axios.get('/api/TB_CHECK/getCheck', { params: { token } }).then((res) => {
      if (res.status === 201) {
        setChecked(true);
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function handleCheck() {
    axios.post('/api/TB_CHECK/check', { token }).then((res) => {
      setChecked(true);
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  useEffect(() => {
    getCheck();
  }, []);

  return (
    <Box width={250}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WhiteBlock p={4}>
            <Box py={5} borderBottom={`1px solid ${Colors.grey4}`} textAlign="center">
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <StyledText fontWeight="500" fontSize="24px">
                          마이페이지
                  </StyledText>
                </Grid>
                <Grid item xs={12}>
                  <Box py={1}>
                    <StyledImage width="110px" height="110px" borderRadius="100%" src={userPhoto || defaultAccountImage} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <StyledText fontSize="16px" fontWeight="600">
                    {userName}
                  </StyledText>
                </Grid>
                <Grid item xs={12}>
                  <StyledText fontSize="14px">
                    {`${socialType} 로그인`}
                  </StyledText>
                </Grid>
              </Grid>
            </Box>
            { checked ? (
              <Box className={classes.checkButton}>
                  체크상황
              </Box>
            ) : (
              <Box className={classes.checkButton} onClick={handleCheck}>
                  출석체크
              </Box>
            )}

          </WhiteBlock>
        </Grid>
        <Grid item xs={12}>
          <WhiteBlock>
            {links.map((item, index) => (
              <Box
                key={item.text}
                py={2}
                px={3}
                borderTop={index !== 0 ? `1px solid ${Colors.grey4}` : null}
                onClick={event => history.push(match.path + item.link)}
                className="profile-menu-link"
              >
                <StyledText fontSize="18px">
                  {item.text}
                </StyledText>
              </Box>
            ))}
          </WhiteBlock>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileMenu;
