'use client';

import {
  Box,
  IconButton,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import DealCategory from '../categories/DealCategory';

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

const BulkBanner = () => {
  const [slider, setSlider] = useState<Slider | null>(null);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '10px' });

  const cards = [
    '/images/bulk.svg',
    '/images/bulk.svg',
    '/images/bulk.svg',
    '/images/bulk.svg',
  ];
  return (
    <>
      {/* Desktop Banner */}
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
          <DealCategory />
        </GridItem>

        <GridItem colSpan={11}>
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
      </Grid>

      {/* Mobile Banner */}
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
    </>
  );
};

export default BulkBanner;
