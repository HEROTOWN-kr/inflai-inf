import React from 'react';
import { Box } from '@material-ui/core';
import StyledText from '../../../containers/StyledText';
import { Colors } from '../../../lib/Сonstants';

function Seller() {
  return (
    <Box px={{ xs: 2, md: 6 }} py={{ xs: 4, md: 8 }} maxWidth="1920px" margin="0 auto">
      <StyledText fontSize="25px">
        <span style={{ color: Colors.pink }}>셀러 캠페인</span>
      </StyledText>
    </Box>
  );
}

export default Seller;
