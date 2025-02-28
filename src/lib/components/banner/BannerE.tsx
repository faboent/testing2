'use client';

import { Box, Image, Skeleton, Grid, GridItem } from '@chakra-ui/react';
import Link from 'next/link';
import { useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useGetBrandsQuery } from '~/lib/redux/services/brand.service';

const BannerE = () => {
  const { data: brandsData, isLoading } = useGetBrandsQuery('');
  const brands = useMemo(
    () => brandsData?.data.filter((brand: any) => brand.name === 'banner-d') ?? [],
    [brandsData]
  );

  console.log('Filtered brands:', brands);
  console.log('Images from banner-d:', brands[0]?.images);

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
            {brands[0]?.images.map((image: any, imageIndex: number) => (
              <Box
                width="100%"
                px={2}
                key={imageIndex}
                as={Link}
                href={`/brand/${brands[0]?.name}`}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.altText || `banner-d-image-${imageIndex + 1}`}
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

export default BannerE;
