import {
  VStack,
  Container,
  Text,
  Box,
  HStack,
  Skeleton,
  Center,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaExclamationCircle, FaPlay } from 'react-icons/fa';
import YouTube from 'react-youtube';
import type { YouTubeProps } from 'react-youtube';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionText = motion(Text);
const MotionContainer = motion(Container);
const MotionCenter = motion(Center);

const Video = () => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    setIsVideoReady(true);
    event.target.pauseVideo();
  };

  const onPlayerError: YouTubeProps['onError'] = () => {
    setHasError(true);
  };

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Box bg="white" w="full" py={14} overflow="hidden">
      <MotionContainer
        maxW="container.lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <MotionVStack
          w="full"
          align="center"
          mb={10}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MotionText
            color="#212429"
            fontSize={['xl', '2xl']}
            fontWeight="600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Video Guide
          </MotionText>
        </MotionVStack>

        <HStack
          w="full"
          align="center"
          flexDir={{
            base: 'column',
            md: 'row',
          }}
          spacing={8}
        >
          <MotionBox
            position="relative"
            w={{ base: 'full', md: '640px' }}
            h={{ base: '220px', md: '390px' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            {!isVideoReady && !hasError && (
              <Center
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="gray.100"
                borderRadius="md"
                overflow="hidden"
              >
                <MotionVStack
                  spacing={4}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.98, 1, 0.98],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                >
                  <Icon as={FaPlay} boxSize={12} color="gray.400" />
                  <Skeleton height="20px" width="200px" />
                  <Skeleton height="20px" width="160px" />
                </MotionVStack>

                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bgGradient="linear(to-r, transparent, rgba(255,255,255,0.3), transparent)"
                  animation="shimmer 2s infinite"
                />
              </Center>
            )}

            {hasError && (
              <MotionCenter
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="gray.100"
                borderRadius="md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <VStack spacing={4}>
                  <Icon
                    as={FaExclamationCircle}
                    boxSize={12}
                    color="gray.400"
                  />
                  <Text color="gray.600">
                    Unable to load video. Please try again later.
                  </Text>
                </VStack>
              </MotionCenter>
            )}

            <Box
              position={isVideoReady ? 'relative' : 'absolute'}
              top={0}
              left={0}
              right={0}
              bottom={0}
              opacity={isVideoReady ? 1 : 0}
              transition="opacity 0.3s"
            >
              <YouTube
                videoId="tbtuG8vWFQs"
                opts={opts}
                onReady={onPlayerReady}
                onError={onPlayerError}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          </MotionBox>

          <MotionVStack
            w="full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <MotionText
              color="#212429"
              fontSize="lg"
              fontWeight="300"
              fontStyle="italic"
              textAlign="center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Easy guide on how to sign up, list <br /> your product and sell on
              3XG <br />
              Merchant platform...
            </MotionText>
          </MotionVStack>
        </HStack>
      </MotionContainer>
    </Box>
  );
};

const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = shimmerKeyframes;
  document.head.appendChild(style);
}

export default Video;
