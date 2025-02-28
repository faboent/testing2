import { VStack, Text, Image, HStack, Container } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import Button from '../ui/Button';

const How = () => {
  const MotionVStack = motion(VStack);
  const MotionHStack = motion(HStack);
  const MotionImage = motion(Image);
  const MotionText = motion(Text);

  return (
    <VStack bg="white" w="full" minH="80vh" justify="center">
      <Container maxW="container.lg">
        <MotionHStack
          w="full"
          align="center"
          justify="space-between"
          flexDir={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 16 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Content Section */}
          <MotionVStack
            align="flex-start"
            w="full"
            spacing={6}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MotionText
              fontSize={['2xl', '3xl']}
              fontWeight="600"
              color="#12074B"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              How it works?
            </MotionText>

            <MotionText
              fontSize={['md', 'lg']}
              fontWeight="400"
              color="#212429"
              lineHeight="1.6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Getting started as a seller is simple and quick. Follow these easy
              steps to set up your store, list your products, and start selling
              to a global audience
            </MotionText>

            <MotionHStack
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/#" passHref>
                <Button
                  text="Get started"
                  bg="brand.100"
                  color="white"
                  size="lg"
                  fontSize={16}
                  fontWeight={500}
                />
              </Link>
            </MotionHStack>
          </MotionVStack>

          {/* Right Image Section */}
          <MotionImage
            src="/images/works.svg"
            alt="How it works"
            w={{ base: '100%', md: '50%' }}
            maxW="500px"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          />
        </MotionHStack>
      </Container>
    </VStack>
  );
};

export default How;
