import React from 'react';
import {
  Box, ClickAwayListener, Grid, Hidden, Popper
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as Scroll from 'react-scroll';

const Scroller = Scroll.scroller;

function NavbarLinks() {
  const history = useHistory();

  const menuLinks = [
    {
      text: '지역',
      link: '/Campaign/Area'
    },
    {
      text: '제품',
      link: '/Campaign/Product'
    },
    {
      text: '서비스',
      link: '/Campaign/Service'
    },

    {
      text: 'LoginNew',
      link: '/LoginNew'
    },
    {
      text: 'SignUpNew',
      link: '/SignUpNew'
    },
    {
      text: 'Join',
      link: '/Join'
    },
    {
      text: 'Activate',
      link: '/Activate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMxMTIsImlhdCI6MTYxMzM3NzAyMX0.4F8knvjqTNP3xoSxQhcIFoYzgxr1gOEr28MN2vzDTS0'
    },
  ];

  function scrollTo() {
    history.push('/');
    setTimeout(() => {
      Scroller.scrollTo('target', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        ignoreCancelEvents: true
      });
    }, 1);
  }


  return (
    <Hidden smDown>
      <Box pl={8}>
        <Grid container spacing={6}>
          {menuLinks.map(link => (
            <Grid item key={link.text}>
              <Link
                className="link"
                to={link.link}
              >
                {link.text}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Hidden>
  );
}

export default NavbarLinks;
