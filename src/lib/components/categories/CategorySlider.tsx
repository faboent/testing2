'use client';

import { Box } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CategoryCard from '~/lib/components/categories/CategoryCard';
import { categories } from '~/lib/utils/constants';

const CategorySlider = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
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
        {categories.map((item, index) => (
          <CategoryCard item={item} key={index} />
        ))}
      </Slider>
    </Box>
  );
};

export default CategorySlider;
