import React from 'react';
import { Box } from '@material-ui/core';
import StyledImage from '../../containers/StyledImage';
import Process1 from '../../img/process/process1.png';
import Process2 from '../../img/process/process2.png';
import Process3 from '../../img/process/process3.png';
import Process4 from '../../img/process/process4.png';
import Process5 from '../../img/process/process5.png';
import Process6 from '../../img/process/process6.png';
import Process7 from '../../img/process/process7.png';
import Process8 from '../../img/process/process8.png';
import Process9 from '../../img/process/process9.png';
import Process10 from '../../img/process/process10.png';

function Process() {
  return (
    <Box my={2}>
      <Box mb={2} textAlign="center" fontSize="44px">인플라이 이용방법</Box>
      <StyledImage height="auto" width="275px" src={Process1} />
      <StyledImage height="auto" width="275px" src={Process2} />
      <StyledImage height="auto" width="275px" src={Process3} />
      <StyledImage height="auto" width="275px" src={Process4} />
      <StyledImage height="auto" width="275px" src={Process5} />
      <StyledImage height="auto" width="275px" src={Process6} />
      <StyledImage height="auto" width="275px" src={Process7} />
      <StyledImage height="auto" width="275px" src={Process8} />
      <StyledImage height="auto" width="275px" src={Process9} />
      <StyledImage height="auto" width="275px" src={Process10} />
    </Box>
  );
}

export default Process;
