import React, { useState } from 'react';
import { Box, colors } from '@material-ui/core';
import Slider from 'react-slick';
import { Style } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from '../../../lib/Сonstants';
import Banner1 from '../../../img/banners/banner_main_01.png';
import Banner2 from '../../../img/banners/banner_main_02.png';
import Banner3 from '../../../img/banners/banner_main_03.png';
import arrowLeft from '../../../img/icons/ic-arrow-left-slide.svg';
import arrowLeftHover from '../../../img/icons/ic-arrow-left-slide-hover.svg';
import arrowRight from '../../../img/icons/ic-arrow-right-slide.svg';
import arrowRightHover from '../../../img/icons/ic-arrow-right-slide-hover.svg';
import Logo from '../../../img/logo_blue.png';
import StyledImage from '../../../containers/StyledImage';

const useStyles = makeStyles({
  nextArrow: {
    backgroundImage: `url(${arrowRight})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '30px !important',
    height: '30px !important',
    right: '-35px',
    '&:hover': {
      backgroundImage: `url(${arrowRightHover})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '30px !important',
      height: '30px !important',
      right: '-35px',
    },
    '&:before': {
      content: "''"
    }
  },
  prevArrow: {
    backgroundImage: `url(${arrowLeft})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '30px !important',
    height: '30px !important',
    right: '-35px',
    '&:hover': {
      backgroundImage: `url(${arrowLeftHover})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '30px !important',
      height: '30px !important',
      right: '-35px',
    },
    '&:before': {
      content: "''"
    }
  }
});

const banners = [
  {
    id: 1,
    backgroundImage: Banner1,
    link: ''
  },
  {
    id: 2,
    backgroundImage: Banner2,
    link: ''
  },
  {
    id: 3,
    backgroundImage: Banner3,
    link: 'https://blog.naver.com/msinvestment/222199864625'
  },
  {
    id: 4,
    backgroundImage: Banner1,
    link: ''
  },
  {
    id: 5,
    backgroundImage: Banner2,
    link: ''
  },
  {
    id: 6,
    backgroundImage: Banner3,
    link: 'https://blog.naver.com/msinvestment/222199864625'
  },
];

function NextArrow(props) {
  const { className, style, onClick } = props;
  const classes = useStyles();

  return (
    <Box
      className={className}
      classes={{ root: classes.nextArrow }}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  const classes = useStyles();

  return (
    <Box
      className={className}
      classes={{ root: classes.prevArrow }}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function HomeBanners() {
  const [dragging, setDragging] = useState(false);
  const history = useHistory();
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: () => setDragging(true),
    afterChange: () => setDragging(false),
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1, slidesToScroll: 1, arrows: false, dots: true
        }
      }
    ]
  };

  function openLink(item) {
    if (!dragging) {
      if (item.link) {
        window.open(item.link, '_blank');
      }
    }
  }

  return (
    <Box margin="0 -8px">
      <Slider {...settings}>
        {banners.map(item => (
          <Box key={item.id} width="100%">
            <Box margin="0 8px" onClick={() => openLink(item)}>
              <StyledImage cursor="pointer" borderRadius="10px" width="100%" src={item.backgroundImage} />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default HomeBanners;
