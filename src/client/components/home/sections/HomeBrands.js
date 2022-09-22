import React from 'react';
import {
  Box, Grid, makeStyles, Typography, useMediaQuery, useTheme
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../../lib/Сonstants';
import StyledImage from '../../../containers/StyledImage';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    height: '470px',
    borderRadius: '10px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    }
  },
  imgFile: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    transition: 'all,.4s',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.05)'
    }
  },
  cover: {
    pointerEvents: 'none',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'linear-gradient(0deg,rgba(0,0,0,.5) 4.37%,rgba(0,0,0,.1))',
    display: 'flex',
    alignItems: 'center',
  },
  cardItem: {
    width: '100%',
    color: '#fff',
  },
  cardText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '28px',
    lineHeight: '43px',
    letterSpacing: '-.4px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px'
    }
  },
  cardButton: {
    width: '100px',
    margin: '0 auto',
    padding: '8px',
    marginTop: '8px',
    border: '1px solid #fff',
    fontSize: '13px',
    textAlign: 'center'
  },
}));


const brands = [
  {
    id: '1',
    img: 'https://inflai-aws-bucket.s3.ap-northeast-2.amazonaws.com/campaign/483/j1pj4vbykz81q4te_820_648.jpg',
    text: '포크빌',
  },
  {
    id: '2',
    img: 'https://inflai-aws-bucket.s3.ap-northeast-2.amazonaws.com/campaign/485/j1pj4xlykw0iese1_820_648.jpg',
    text: '다도참주가 ',
  },
  {
    id: '3',
    img: 'https://inflai-aws-bucket.s3.ap-northeast-2.amazonaws.com/campaign/374/j1pj1lj7ky9e6j46_820_648.jpg',
    text: '박미선',
  },
  {
    id: '4',
    img: '\thttps://inflai-aws-bucket.s3.ap-northeast-2.amazonaws.com/campaign/281/j1pj1qs7kr1n7x61_820_648.PNG',
    text: '이미르',
  },
];


function HomeBrands(props) {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));


  return (
    <Box mt={8}>
      <Box fontSize="25px" color="#222" mb={2}>
        <span style={{ color: Colors.pink }}>파트너</span>
        {' 브랜드'}
      </Box>

      <Box>
        <Grid container spacing={isMD ? 4 : 1}>
          { brands.map(item => (
            <Grid item xs={6} md={3} key={item.id}>
              <Box className={classes.card} onClick={() => history.push(`/Brand/${item.id}`)}>
                <img className={classes.imgFile} src={item.img} alt="noImage" />
                <Box className={classes.cover}>
                  <Box className={classes.cardItem}>
                    <Box className={classes.cardText}>{item.text}</Box>
                    <Box className={classes.cardButton}>캠페인 체크</Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default HomeBrands;
