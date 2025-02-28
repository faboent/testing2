import { VStack, Container, SimpleGrid } from '@chakra-ui/react';

import StepCard from './StepCard';

const Steps = () => {
  const steps = [
    {
      title: 'Create an Account',
      description:
        'Sign up on the platform by providing basic information and setting up your store. This is your first step toward selling online!',
      image: '/images/steps-1.svg',
      imagePosition: 'left',
      stepNumber: '01',
      stepNumberName: 'One',
    },
    {
      title: 'upload all necessary document',
      description:
        'Upload all necessary documents, such as identification and business licenses to verify your account and comply with platform requirements.',
      image: '/images/steps-2.svg',
      imagePosition: 'right',
      stepNumber: '02',
      stepNumberName: 'Two',
    },
    {
      title: 'List your product',
      description:
        'Upload high-quality product images, write clear descriptions, and set competitive prices. Make sure your listings are optimized to attract buyers',
      image: '/images/steps-3.svg',
      imagePosition: 'right',
      stepNumber: '03',
      stepNumberName: 'Three',
    },
    {
      title: 'Start selling',
      description:
        "Once your account is set up and products are listed, you're ready to start selling and reach customers worldwide",
      image: '/images/steps-4.svg',
      imagePosition: 'left',
      stepNumber: '04',
      stepNumberName: 'Four',
    },
  ];

  return (
    <VStack bg="brand.500" w="full" py={14}>
      <Container maxW="container.lg">
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          rowGap={12}
          columnGap={0}
          px={[0, 32]}
        >
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </SimpleGrid>
      </Container>
    </VStack>
  );
};

export default Steps;
