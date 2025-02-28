import { VStack, Text, Image, HStack, Container } from '@chakra-ui/react';
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
      h="80vh"
    >
      <Container maxW="container.lg">
        <MotionVStack
          w="full"
          spacing={4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
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
            >
              Become a Merchant: Grow Your <br /> Business on Our True
              Omni-Channel
              <br /> Marketplace
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
            >
              Ready to expand your customer base and boost your sales? Becoming
              a merchant on our platform opens the door to endless <br />{' '}
              opportunities. Whether you&apos;re offering the latest tech
              gadgets or unique electronic accessories, we provide the tools to
              turn your <br /> business into a profitable success with ease
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
                  size="sm"
                  bg="brand.100"
                  fontSize={14}
                  fontWeight={500}
                />
              </Link>

              <Link href="/#" passHref>
                <Button
                  text="How it works"
                  size="sm"
                  bg="transparent"
                  variant="outline"
                  border="brand.100"
                  color="brand.100"
                  fontSize={14}
                  fontWeight={500}
                />
              </Link>
            </MotionHStack>
          </MotionVStack>
        </MotionVStack>
      </Container>
    </VStack>
  );
};

export default Hero;
