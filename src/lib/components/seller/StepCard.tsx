import { Box, VStack, Text, HStack, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionText = motion(Text);

type StepCardProps = {
  title: string;
  description: string;
  image: string;
  stepNumber: string;
  stepNumberName: string;
};

const StepCard = ({
  title,
  description,
  image,
  stepNumber,
  stepNumberName,
}: StepCardProps) => {
  return (
    <MotionBox
      bg="white"
      borderRadius="xl"
      boxShadow="2xl"
      maxW="400px"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'xl',
        transition: 'all 0.2s',
      }}
    >
      <HStack align="flex-start" justify="space-between">
        <VStack
          bg="#E88D67"
          color="white"
          borderRadius="lg"
          px={6}
          py={3}
          w="198px"
          h="163px"
        >
          <VStack spacing={0}>
            <Text
              fontSize={['5xl', '6xl']}
              fontWeight="600"
              color="white"
              textAlign="center"
            >
              {stepNumber}
            </Text>
            <Text
              fontSize="md"
              fontWeight="500"
              color="white"
              textAlign="center"
              mt={-3}
            >
              {title}
            </Text>
          </VStack>
        </VStack>

        <Box p={8}>
          <Image src={image} alt="Step 1" />
        </Box>
      </HStack>

      <MotionVStack
        spacing={4}
        align="flex-start"
        mt={12}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        p={6}
      >
        <HStack spacing={2}>
          <Image src="/images/plus-2.svg" alt="Plus" />
          <Text
            fontSize="md"
            fontWeight="600"
            color="brand.100"
            textTransform="uppercase"
          >
            STEP {stepNumberName}
          </Text>
        </HStack>

        <MotionText
          fontSize="md"
          color="#212429"
          fontWeight="400"
          lineHeight="19.36px"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </MotionText>
      </MotionVStack>
    </MotionBox>
  );
};

export default StepCard;
