import { Box, VStack, Text, Image, HStack, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Button from '../ui/Button';

const Hero = () => {
  const MotionVStack = motion(VStack);
  const MotionHStack = motion(HStack);
  const MotionImage = motion(Image);
  const MotionText = motion(Text);

  return (
    <VStack
      bg="brand.500"
      w="full"
      pt={{
        base: '100px',
        md: '160px',
      }}
      h="100vh"
    >
      <Container maxW="container.lg">
        <MotionVStack
          w="full"
          spacing={4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          position="relative"
        >
          <MotionHStack
            alignItems="center"
            spacing={4}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MotionImage
              src="/images/people.svg"
              alt="Become a seller"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
            <MotionText
              color="#12074B"
              fontSize={['md', '18px']}
              fontWeight="400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              0ver 1,000 merchants
            </MotionText>
          </MotionHStack>

          <Box
            position="absolute"
            top="40px"
            left="100px"
            display={{ base: 'none', md: 'block' }}
          >
            <Image src="/images/star-2.svg" alt="Hero" />
          </Box>

          <MotionVStack
            spacing={2}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <MotionText
              color="#12074B"
              fontSize={['2xl', '3xl', '4xl']}
              fontWeight="600"
              textAlign="center"
              lineHeight="1.2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              display={{ base: 'none', md: 'block' }}
            >
              Become a Merchant: Grow Your <br /> Business on Our True
              Omni-Channel
              <br /> Marketplace
            </MotionText>

            <MotionText
              color="#12074B"
              fontSize={['2xl', '3xl', '4xl']}
              fontWeight="600"
              textAlign="center"
              lineHeight="1.2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              display={{ base: 'block', md: 'none' }}
            >
              Become a Merchant: Grow Your Business on Our True Omni-Channel
              Marketplace
            </MotionText>

            <MotionText
              color="#212429CC"
              fontSize="14px"
              fontWeight="400"
              textAlign="center"
              lineHeight="16.9px"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              display={{ base: 'none', md: 'block' }}
            >
              Ready to expand your customer base and boost your sales? Becoming
              a merchant on our platform opens the door to endless <br />{' '}
              opportunities. Whether you&apos;re offering the latest tech
              gadgets or unique electronic accessories, we provide the tools to
              turn your <br /> business into a profitable success with ease
            </MotionText>

            <MotionText
              color="#212429CC"
              fontSize="14px"
              fontWeight="400"
              textAlign="center"
              lineHeight="16.9px"
              display={{ base: 'block', md: 'none' }}
              mt={2}
            >
              Ready to expand your customer base and boost your sales? Becoming
              a merchant on our platform opens the door to endless
              opportunities. Whether you&apos;re offering the latest tech
              gadgets or unique electronic accessories, we provide the tools to
              turn your business into a profitable success with ease
            </MotionText>

            <MotionHStack
              spacing={4}
              mt={6}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link href="/#" passHref>
                <Button
                  text="Get Started"
                  size="lg"
                  bg="brand.100"
                  fontSize={14}
                  fontWeight={500}
                  width="full"
                />
              </Link>

              <Link href="/#" passHref>
                <Button
                  text="How it works"
                  size="lg"
                  bg="transparent"
                  variant="outline"
                  border="brand.100"
                  color="brand.100"
                  fontSize={14}
                  fontWeight={500}
                  width="full"
                />
              </Link>
            </MotionHStack>
          </MotionVStack>
          <Box
            position="absolute"
            bottom="140px"
            right="100px"
            display={{ base: 'none', md: 'block' }}
          >
            <Image src="/images/arrow-3.svg" alt="Hero" />
          </Box>
        </MotionVStack>
      </Container>
    </VStack>
  );
};

export default Hero;
