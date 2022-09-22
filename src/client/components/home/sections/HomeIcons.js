import React from 'react';
import {
  Box, Grid, useMediaQuery, useTheme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import StyledImage from '../../../containers/StyledImage';
import Icon1 from '../../../img/icons/home/home_icon_1.png';
import Icon2 from '../../../img/icons/home/home_icon_2.png';
import Icon3 from '../../../img/icons/home/home_icon_3.png';
import Icon4 from '../../../img/icons/home/home_icon_4.png';
import Icon5 from '../../../img/icons/home/home_icon_5.png';
import Icon6 from '../../../img/icons/home/home_icon_6.png';
import Icon7 from '../../../img/icons/home/home_icon_7.png';

const useStyles = makeStyles(theme => ({
  iconBox: {
    width: '120px',
    height: '120px',
    padding: '24px',
    boxSizing: 'border-box',
    backgroundColor: '#DFEFFF',
    border: '1px solid #BDCCD4',
    borderRadius: '25px',
    cursor: 'pointer',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '80px'
    }
  },
  iconText: {
    fontSize: '15px',
    lineHeight: '22px',
    letterSpacing: '-.4px',
    color: '#222',
    marginTop: '10px',
    textAlign: 'center'
  }
}));

const icons = [
  { icon: Icon4, text: '맛집', link: '/Campaign/Area/Food' },
  { icon: Icon7, text: '제품', link: '/Campaign/Product' },
  { icon: Icon2, text: '서비스', link: '/Campaign/Service' },
  { icon: Icon3, text: '기자단', link: '/Campaign/Report' },
  { icon: Icon6, text: '지역', link: '/Campaign/Report' },
  { icon: Icon1, text: '이밴트', link: '/' },
];

function HomeIcons(props) {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box m="0 auto" my={{ xs: '50px', md: '80px' }} maxWidth={1000}>
      <Grid container justify={isMD ? 'space-between' : 'center'} spacing={isMD ? 0 : 2}>
        { icons.map(item => (
          <Grid item xs={4} md="auto" key={item.text}>
            <Box classes={{ root: classes.iconBox }} onClick={() => history.push(item.link)}>
              <StyledImage cursor="pointer" height={isMD ? '50px' : '35px'} src={item.icon} />
            </Box>
            <Box classes={{ root: classes.iconText }}>{item.text}</Box>
          </Grid>
        )) }
      </Grid>
    </Box>
  );
}

export default HomeIcons;
