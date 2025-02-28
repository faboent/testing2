'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  VStack,
  HStack,
  Text,
  Image,
  Grid,
  Card,
  CardBody,
  Box,
  IconButton,
  Flex,
  SimpleGrid,
  Avatar,
  useBreakpointValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Layout from '~/lib/components/layout';
import {
  aboutData,
  goals,
  teamMembers,
  testimonials,
} from '~/lib/utils/constants';

const About = () => {
  const sliderRef = useRef<Slider | null>(null);

  const MotionVStack = motion(VStack);
  const MotionHStack = motion(HStack);
  const MotionGrid = motion(Grid);
  const MotionCard = motion(Card);

  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const itemsPerPage = isMobile ? 1 : 2;

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerPage >= testimonials.length ? 0 : prev + itemsPerPage
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(testimonials.length - itemsPerPage, 0)
        : prev - itemsPerPage
    );
  };

  // Get current visible testimonials
  const visibleTestimonials = isMobile
    ? [testimonials[currentIndex]]
    : [
        testimonials[currentIndex],
        testimonials[(currentIndex + 1) % testimonials.length],
      ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
        },
      },
    ],
  };

  return (
    <Layout>
      <VStack
        align="stretch"
        w="full"
        mb={5}
        mt={{ base: 5, md: 5 }}
        spacing={20}
      >
        {aboutData.map((item, index) => (
          <MotionHStack
            key={item.title}
            w="full"
            align="flex-start"
            justify="space-between"
            flexDirection={{
              base: 'column',
              md: index === 1 ? 'row-reverse' : 'row',
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <MotionVStack
              alignItems="stretch"
              spacing={4}
              w="full"
              initial={{ opacity: 0, x: index === 1 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
            >
              <Text fontSize={['xl', '2xl']} fontWeight="700" color="#101010">
                {item.title}
              </Text>
              <Text fontSize="md" color="black" fontWeight="400">
                {item.description}
              </Text>
            </MotionVStack>

            <MotionHStack
              w="full"
              alignItems="center"
              justifyContent="center"
              initial={{ opacity: 0, x: index === 1 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            >
              <Image src={item.image} alt={item.title.toLowerCase()} w="auto" />
            </MotionHStack>
          </MotionHStack>
        ))}

        <MotionVStack
          w="full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text fontSize={['xl', '2xl']} fontWeight="700" color="#101010">
            Our Goals
          </Text>

          <MotionGrid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={4}
            mt={4}
          >
            {goals.map((goal, index) => (
              <MotionCard
                key={index}
                w="full"
                px={4}
                py={6}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.15, // Staggered delay for each card
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <CardBody>
                  <VStack align="center" spacing={6}>
                    <Image src={goal.imaage} alt={goal.title} w="auto" />
                    <Text
                      fontSize="md"
                      fontWeight="600"
                      color="#212429"
                      textAlign="center"
                    >
                      {goal.title}
                    </Text>
                    <Text
                      fontSize="13px"
                      color="#212429"
                      textAlign="center"
                      fontWeight="400"
                    >
                      {goal.description}
                    </Text>
                  </VStack>
                </CardBody>
              </MotionCard>
            ))}
          </MotionGrid>
        </MotionVStack>

        <Box mx={{ base: 0, md: 10 }} className="team-slider-container">
          <Slider ref={sliderRef} {...settings}>
            {teamMembers.map((member, index) => (
              <MotionVStack
                key={member.name}
                position="relative"
                px={4}
                className="slider-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Box
                  position="relative"
                  w="full"
                  h={{ base: '300px', md: '400px' }}
                  overflow="hidden"
                  transition="all 0.3s ease"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    w="full"
                    h="full"
                    objectFit="contain"
                    transition="all 0.3s ease"
                  />
                </Box>

                <Box
                  position="absolute"
                  bottom="0px"
                  left="50%"
                  transform="translateX(-50%)"
                  bg="#E88D67"
                  p={4}
                  minW="300px"
                  textAlign="center"
                  clipPath="polygon(0 0, 100% 0, 95% 100%, 10% 90%)"
                >
                  <VStack spacing={1}>
                    <Text color="black" fontSize="lg" fontWeight="600">
                      {member.name}
                    </Text>
                    <Text color="black" fontSize="sm">
                      {member.position}
                    </Text>
                  </VStack>
                </Box>
              </MotionVStack>
            ))}
          </Slider>
        </Box>

        <VStack w="full" spacing={8} position="relative">
          <Text fontSize={['xl', '2xl']} fontWeight="700" color="#101010">
            Happy Customers Says
          </Text>

          <Box
            w="full"
            // maxW="1400px"
            // px={{ base: 4, md: 10 }}
            position="relative"
          >
            <Flex justify="space-between" align="center" w="full">
              <IconButton
                aria-label="Previous testimonial"
                icon={<ChevronLeftIcon w={6} h={6} />}
                onClick={handlePrevious}
                rounded="full"
                bg="white"
                shadow="lg"
                size="lg"
                _hover={{
                  bg: 'gray.100',
                  transform: 'scale(1.1)',
                }}
                transition="all 0.2s"
              />

              <Box
                w="full"
                // maxW={{ base: '500px', md: '1000px' }}
                mx={{ base: 2, md: 8 }}
                // overflow="hidden"
              >
                <AnimatePresence mode="wait">
                  <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={8}
                    key={currentIndex}
                  >
                    {visibleTestimonials.map((testimonial, index) => (
                      <MotionCard
                        key={`${currentIndex}-${index}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        bg="white"
                        shadow="lg"
                        borderRadius="xl"
                        overflow="hidden"
                      >
                        <CardBody>
                          <VStack spacing={2} align="center">
                            <VStack spacing={0} align="center">
                              <Avatar
                                size="lg"
                                name={testimonial.name}
                                src={testimonial.image}
                                bg="brand.100"
                                color="white"
                              />

                              <Text
                                fontSize={{ base: 'md', md: '18px' }}
                                fontWeight="400"
                                color="#333333"
                              >
                                {testimonial.name}
                              </Text>
                            </VStack>

                            <Box position="relative" px={{ base: 4, md: 8 }}>
                              <Text
                                position="absolute"
                                top={-4}
                                left={0}
                                fontSize={{ base: '4xl', md: '6xl' }}
                                color="#FA8B02"
                                opacity={0.3}
                                className="quote-mark"
                              >
                                &ldquo;
                              </Text>
                              <Text
                                fontSize={{ base: 'sm', md: 'md' }}
                                textAlign="center"
                                color="#333333"
                                lineHeight="30px"
                                fontWeight="400"
                              >
                                {testimonial.text}
                              </Text>
                              <Text
                                position="absolute"
                                bottom={-8}
                                right={0}
                                fontSize={{ base: '4xl', md: '6xl' }}
                                color="#E7906B"
                                className="quote-mark"
                              >
                                &rdquo;
                              </Text>
                            </Box>
                          </VStack>
                        </CardBody>
                      </MotionCard>
                    ))}
                  </SimpleGrid>
                </AnimatePresence>
              </Box>

              <IconButton
                aria-label="Next testimonial"
                icon={<ChevronRightIcon w={6} h={6} />}
                onClick={handleNext}
                rounded="full"
                bg="white"
                shadow="lg"
                size="lg"
                _hover={{
                  bg: 'gray.100',
                  transform: 'scale(1.1)',
                }}
                transition="all 0.2s"
              />
            </Flex>

            <Flex justify="center" gap={2} mt={8}>
              {Array.from({
                length: Math.ceil(testimonials.length / itemsPerPage),
              }).map((_, index) => (
                <Box
                  key={index}
                  w={2}
                  h={2}
                  rounded="full"
                  bg={
                    Math.floor(currentIndex / itemsPerPage) === index
                      ? '#E88D67'
                      : 'gray.300'
                  }
                  cursor="pointer"
                  onClick={() => setCurrentIndex(index * itemsPerPage)}
                  transition="all 0.2s"
                  _hover={{
                    transform: 'scale(1.2)',
                  }}
                />
              ))}
            </Flex>
          </Box>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default About;
