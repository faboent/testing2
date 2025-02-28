import { VStack, Text, Image, HStack, Container, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Grow = () => {
  const MotionBox = motion(Box);
  const MotionHStack = motion(HStack);
  const MotionImage = motion(Image);
  const MotionText = motion(Text);

  const growSteps = [
    {
      id: 1,
      title: 'Optimize Your Listings',
      description:
        'Use high-quality images, detailed descriptions, and relevant keywords to make your products stand out and improve search visibility.',
      icon: '/images/step-1.svg',
    },
    {
      id: 2,
      title: 'Provide Excellent Customer Service',
      description:
        'Respond promptly to customer inquiries, address issues professionally, and deliver great after-sales support to encourage repeat business and positive reviews',
      icon: '/images/step-2.svg',
    },
    {
      id: 3,
      title: 'Leverage Marketing Tools',
      description:
        'Use platform ads, social media, and email campaigns to promote your products, drive traffic to your store, and engage with potential customers.',
      icon: '/images/step-3.svg',
    },
    {
      id: 4,
      title: 'Analyze and Adjust',
      description:
        'Regularly review your sales data, customer feedback, and performance metrics to refine your pricing, marketing strategies, and product offerings for continuous growth.',
      icon: '/images/step-4.svg',
    },
  ];

  return (
    <MotionBox
      bg="brand.500"
      w="full"
      mt={10}
      py={10}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.lg">
        <MotionHStack
          w="full"
          align="flex-start"
          flexDir={{
            base: 'column',
            md: 'row',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MotionImage
            src="/images/grow.svg"
            alt="Grow"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <VStack>
            <MotionText
              color="#12074B"
              fontSize={['lg', 'xl']}
              fontWeight="600"
              textAlign="center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              MAJOR STEPS ON HOW TO GROW YOUR BUSINESS ON 3XG
            </MotionText>

            <MotionBox
              bg="white"
              w="full"
              rounded="md"
              p={4}
              boxShadow="#00000040 0px 0px 10px 0px"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <VStack align="flex-start" spacing={4}>
                {growSteps.map((step, index) => (
                  <MotionHStack
                    key={step.id}
                    w="full"
                    spacing={4}
                    align="flex-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.15 }}
                    whileHover={{
                      x: 10,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <MotionImage
                      src={step.icon}
                      alt={step.title}
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.15 }}
                    />
                    <VStack align="flex-start" spacing={0}>
                      <Text
                        color="#212429"
                        fontSize={['md', 'lg']}
                        fontWeight="500"
                      >
                        {step.title}
                      </Text>
                      <Text color="#808080" fontSize="sm">
                        {step.description}
                      </Text>
                    </VStack>
                  </MotionHStack>
                ))}
              </VStack>
            </MotionBox>
          </VStack>
        </MotionHStack>
      </Container>
    </MotionBox>
  );
};

export default Grow;
