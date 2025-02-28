'use client';

import { Box, Image, Skeleton, Grid, GridItem } from '@chakra-ui/react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Brands = ({ isLoading }: any) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
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
          slidesToShow: 1,
        },
      },
    ],
  };

  const bannerImages = [
    {
      id: 1,
      image: '/images/banner2.svg',
    },
    {
      id: 2,
      image: '/images/banner3.svg',
    },
    {
      id: 3,
      image: '/images/banner2.svg',
    },
    {
      id: 4,
      image: '/images/banner3.svg',
    },
    {
      id: 5,
      image: '/images/banner2.svg',
    },
  ];

  return (
    <>
      {isLoading ? (
        <Grid
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
          ]}
          gap={5}
          w="100%"
          mt={2}
        >
          {[1, 2, 3].map((item, index) => (
            <GridItem key={index}>
              <Skeleton height={['200px', '220px']} borderRadius="16" />
            </GridItem>
          ))}
        </Grid>
      ) : (
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
            {bannerImages.map((item) => (
              <Box
                width="100%"
                px={2}
                key={item.id}
                as={Link}
                href={`/brand/${item.id}`}
              >
                <Image
                  src={item.image}
                  alt="brand1"
                  width="100%"
                  height="auto"
                  objectFit="contain"
                  display="block"
                  borderRadius={16}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      )}

      <Box />
    </>
  );
};

export default Brands;
