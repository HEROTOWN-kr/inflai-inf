import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Divider, Grid } from '@material-ui/core';
import LogOutButton from '../login/LogOutButton';
import AuthContext from '../../context/AuthContext';
import StyledText from '../../containers/StyledText';

function UserMenuItems(props) {
  const { userName } = useContext(AuthContext);

  const userMenu = [
    {
      text: '계정정보',
      link: '/Profile'
    },
    {
      text: '캠페인 관리',
      link: '/Profile/CampaignInfo'
    },
    {
      text: '랭킹 정보',
      link: '/Profile/Rank'
    }
  ];

  return (
    <div className="user-popmenu">
      <Box py={2} px={4} css={{ width: '150px' }}>
        <StyledText overflowHidden fontWeight="bold" fontSize="20" textAlign="center">{userName}</StyledText>
      </Box>
      {userMenu.map(item => (
        <React.Fragment key={item.text}>
          <Box py={2} px={4}>
            <Link
              to={item.link}
            >
              <StyledText fontSize="16" textAlign="center" className="pop-item">{item.text}</StyledText>
            </Link>
          </Box>
          <Divider />
        </React.Fragment>
      ))}
      <Grid container justify="center" className="logout">
        <Grid item>
          <Box my={2}>
            <LogOutButton {...props} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserMenuItems;
