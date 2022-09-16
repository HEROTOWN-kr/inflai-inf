import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  banner: {
    width: '100%',
    height: '32vw',
    maxHeight: '450px',
    marginBottom: '15px',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    backgroundImage: 'linear-gradient(rgba(17, 17, 17, 0.85), rgba(17, 17, 17, 0.85)), url(https://inflai-aws-bucket.s3.ap-northeast-2.amazonaws.com/campaign/483/j1pj4vbykz81q4te_820_648.jpg)',
    display: 'flex',
    alignItems: 'center'
  },
  mainImage: {
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
  imageHolder: {
    position: 'absolute',
    left: '55%',
    top: '150px',
    maxWidth: '570px',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  textHolder: {
    width: '100%',
    maxWidth: '1250px',
    margin: '0 auto',
    color: '#fff'
  },
  title: {
    fontWeight: 500,
    fontSize: '45px',
    lineHeight: '72px',
    letterSpacing: '-.4px',
    marginBottom: '16px',
  },
  description: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '30px',
    letterSpacing: '-.4px',
    wordBreak: 'keep-all',
  }
}));

function Brand(props) {
  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.banner}>
        <Box className={classes.textHolder}>
          <Box className={classes.title}>포크빌</Box>
          <Box className={classes.description}>갈비의 쫄깃한 식감과 뼈에 붙은 고기의 고소한 감칠맛</Box>
        </Box>
      </Box>
      <Box className={classes.imageHolder}>
        <img className={classes.mainImage} src="https://inflai-aws-bucket.s3.ap-northeast-2.amazonaws.com/campaign/483/j1pj4vbykz81q4te_820_648.jpg" alt="noImage" />
      </Box>
      <Box mt="120px" component="h2">
        포크빌의 캠페인
      </Box>


    </Box>
  );
}

export default Brand;
