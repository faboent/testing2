'use client';

import { Box } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import RatingCard from '~/lib/components/product/RatingCard';
import { merchantRatingData } from '~/lib/utils/constants';

const RatingSlider = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Box
      className="slider-container"
      maxW="100%"
      mx="auto"
      mt={5}
      sx={{
        '.slick-slide': {
          px: 0,
        },
        '.slick-track': {
          display: 'flex',
          alignItems: 'center',
        },
      }}
    >
      <Slider {...settings}>
        {merchantRatingData.map((item, index) => (
          <RatingCard item={item} key={index} />
        ))}
      </Slider>
    </Box>
  );
};

export default RatingSlider;
