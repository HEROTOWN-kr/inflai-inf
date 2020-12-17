import React, { useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../lib/Сonstants';

const links = [
  { text: '내정보 관리', link: '/UserInfo', tab: 1 },
  { text: '캠페인 관리', link: '/CampaignInfo', tab: 2 },
  { text: '랭킹 정보', link: '/Rank', tab: 3 }
];

function MobileProfileMenu(props) {
  const { currentMenu, setCurrentMenu } = props;
  const history = useHistory();

  function clickOnTab(tabIndex, link) {
    setCurrentMenu(tabIndex);
    history.push(`/Profile${link}`);
  }

  return (
    <Box css={{ background: Colors.white }}>
      <Grid container>
        {links.map(item => (
          <Grid key={item.text} item xs={4}>
            <Box
              textAlign="center"
              py={1}
              borderBottom={`2px solid ${currentMenu === item.tab ? Colors.pink3 : '#ffffff'}`}
              color={currentMenu === item.tab ? Colors.pink3 : '#666'}
              onClick={() => clickOnTab(item.tab, item.link)}
            >
              {item.text}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default MobileProfileMenu;
