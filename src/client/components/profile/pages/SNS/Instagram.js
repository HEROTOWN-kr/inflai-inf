import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import InstagramInfo from '../Rank/InstagramInfo';

function Instagram(props) {
  const { changeTab } = props;

  useEffect(() => {
    changeTab(1);
  }, []);

  return (
    <Box p={{ xs: 0, md: 2 }} bgcolor="#f5f6f7">
      <InstagramInfo />
    </Box>
  );
}

export default Instagram;
