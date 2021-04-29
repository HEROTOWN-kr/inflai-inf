import { Box } from '@material-ui/core';
import React from 'react';
import { fontSize } from '@material-ui/system';
import StyledText from '../../../../containers/StyledText';

function LabelComponent(props) {
  const { labelName, ...rest } = props;
  return (
    <Box width="175px" {...rest}>{labelName}</Box>
  );
}

export default LabelComponent;
