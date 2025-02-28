'use client';

import {
  Box,
  Image,
  IconButton,
  Grid,
  GridItem,
  useBreakpointValue,
  Skeleton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ShopCategory from '../categories/ShopCategory';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: 'slick-dots custom-dots',
};

const settingsMobile = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: 'slick-dots custom-dots',
};

const ShopBanner = ({ isLoading }: any) => {
  const [slider, setSlider] = useState<Slider | null>(null);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  const cards = [
    '/images/banner.svg',
    '/images/banner.svg',
    '/images/banner.svg',
    '/images/banner.svg',
  ];
  return (
    <>
      {/* Desktop Banner */}

      {isLoading ? (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(14, 1fr)',
          }}
          gap={4}
          mt={5}
          display={{ base: 'none', md: 'grid' }}
        >
          <GridItem colSpan={3}>
            <Skeleton height="270px" borderRadius="8" />
          </GridItem>

          <GridItem colSpan={8}>
            <Skeleton height="270px" borderRadius="8" />
          </GridItem>

          <GridItem colSpan={3}>
            <Skeleton height="130px" mb={2} borderRadius="8" />
            <Skeleton height="130px" borderRadius="8" />
          </GridItem>
        </Grid>
      ) : (
        <Grid
          templateColumns={{
            base: 'repeat(1, 1fr)',
            md: 'repeat(14, 1fr)',
          }}
          gap={4}
          mt={5}
          display={{ base: 'none', md: 'grid' }}
        >
          <GridItem colSpan={3}>
            <ShopCategory />
          </GridItem>

          <GridItem colSpan={8}>
            <Box
              position="relative"
              height="270px"
              width="full"
              overflow="hidden"
            >
              {/* Left Icon */}
              <IconButton
                aria-label="left-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                left={side}
                top={top}
                transform="translate(0%, -50%)"
                zIndex={2}
                onClick={() => slider?.slickPrev()}
                bg="#F0F0F080"
                _hover={{
                  bg: '#F0F0F080',
                }}
              >
                <BiLeftArrowAlt />
              </IconButton>
              {/* Right Icon */}
              <IconButton
                aria-label="right-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                right={side}
                top={top}
                transform="translate(0%, -50%)"
                zIndex={2}
                onClick={() => slider?.slickNext()}
                bg="#F0F0F080"
                _hover={{
                  bg: '#F0F0F080',
                }}
              >
                <BiRightArrowAlt />
              </IconButton>
              {/* Slider */}
              <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {cards.map((url, index) => (
                  <Box
                    key={index}
                    height="270px"
                    position="relative"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="cover"
                    backgroundImage={`url(${url})`}
                    borderRadius="8"
                  />
                ))}
              </Slider>
            </Box>
          </GridItem>

          <GridItem colSpan={3}>
            <Box
              position="relative"
              height="140px"
              width="full"
              overflow="hidden"
              borderRadius="8"
            >
              <Image
                src="/images/banner2.svg"
                alt="banner"
                objectFit="cover"
                borderRadius="8"
              />
            </Box>
            <Box
              position="relative"
              height="140px"
              width="full"
              overflow="hidden"
              borderRadius="8"
            >
              <Image
                src="/images/banner3.svg"
                alt="banner"
                objectFit="cover"
                borderRadius="8"
              />
            </Box>
          </GridItem>
        </Grid>
      )}

      {/* Mobile Banner */}

      {isLoading ? (
        <Grid
          templateColumns="repeat(6, 1fr)"
          gap={4}
          mt={5}
          display={{ base: 'grid', md: 'none' }}
        >
          <GridItem colSpan={6}>
            <Skeleton height="160px" borderRadius="8" />
          </GridItem>
        </Grid>
      ) : (
        <Grid
          templateColumns="repeat(6, 1fr)"
          gap={4}
          mt={5}
          display={{ base: 'grid', md: 'none' }}
        >
          <GridItem colSpan={6}>
            <Box
              position="relative"
              height="160px"
              width="full"
              overflow="hidden"
            >
              <Slider {...settingsMobile} ref={(slider) => setSlider(slider)}>
                {cards.map((url, index) => (
                  <Box
                    key={index}
                    height="160px"
                    position="relative"
                    backgroundPosition="center"
                    backgroundRepeat="no-repeat"
                    backgroundSize="cover"
                    backgroundImage={`url(${url})`}
                    borderRadius="8"
                  />
                ))}
              </Slider>
            </Box>
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default ShopBanner;
