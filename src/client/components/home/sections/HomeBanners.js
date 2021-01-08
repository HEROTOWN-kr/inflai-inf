import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import Slider from 'react-slick';
import { Style } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { Colors } from '../../../lib/Сonstants';
import Banner1 from '../../../img/banners/banner1.jpg';
import Banner2 from '../../../img/banners/banner2.jpg';
import Logo from '../../../img/logo_blue.png';
import StyledImage from '../../../containers/StyledImage';

const banners = [
  {
    id: 1,
    backgroundImage: Banner1,
    link: 'https://blog.naver.com/msinvestment/222199864625'
  },
  {
    id: 2,
    backgroundImage: Banner2,
    link: '/Profile/Rank'
  }
];

function HomeBanners() {
  const [dragging, setDragging] = useState(false);
  const history = useHistory();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 2000,
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
      if (item.id === 1) {
        window.open(item.link, '_blank');
      } else {
        history.push(item.link);
      }
    }
  }

  return (
    <Box padding="50px 0" margin="0 -8px">
      <Slider {...settings}>
        {banners.map(item => (
          <Box key={item.id} width="100%">
            <Box margin="0 8px" onClick={() => openLink(item)}>
              <StyledImage width="100%" src={item.backgroundImage} />
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>

  );
}

export default HomeBanners;
