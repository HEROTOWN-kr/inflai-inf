import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  common: ({
    width, margin, height, borderRadius, border, cursor
  }) => ({
    display: 'block',
    margin: margin || '0 auto',
    width: `${width}` || 'auto',
    height: `${height}` || 'auto',
    borderRadius: borderRadius || 0,
    border: border || 'medium none color',
    cursor: cursor || 'default'
  }),
});

function StyledImage(props) {
  const {
    className, width, margin, height, borderRadius, border, cursor, ...rest
  } = props;
  const classes = useStyles(props);

  return (
    <img
      className={`${classes.common} ${className}`}
      alt="noImage"
      {...rest}
    />
  );
}

export default StyledImage;
