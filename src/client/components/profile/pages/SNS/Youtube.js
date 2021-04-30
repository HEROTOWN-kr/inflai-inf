import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';

function Youtube(props) {
  const { changeTab } = props;

  useEffect(() => {
    changeTab(3);
  }, []);

  return (
    <Box p={2} textAlign="center">
    개발 중입니다...
    </Box>
  );
}

export default Youtube;
