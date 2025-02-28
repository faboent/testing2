import { VStack, Text, Image, Container, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const WhySell = () => {
  const whySell = [
    {
      id: 1,
      title: 'Access to a Large Audience',
      description:
        'Gives you immediate access to a large and diverse customer base. This significantly increases your chances of reaching potential buyers without having to build your own audience from scratch',
      icon: '/images/why-1.png',
    },
    {
      id: 2,
      title: 'Secure Payment Transaction',
      description:
        'Offer users with secure, reliable payment methods that protect both the seller and the customer with fraud detection systems that help minimize risks for both parties.',
      icon: '/images/why-2.png',
    },
    {
      id: 3,
      title: 'Lower Operating Cost',
      description:
        'As an online seller, you won’t need to worry about renting physical space, covering utility bills, or hiring extensive staff, which helps significantly lower your operating expenses.',
      icon: '/images/why-3.png',
    },
    {
      id: 4,
      title: 'Convenience and Efficiency',
      description:
        'Automated tools for inventory tracking, order processing, and shipping streamline operations, while detailed analytics provide valuable customer insights to help you understand trends, improve offerings, and make informed business decisions.',
      icon: '/images/why-4.png',
    },
    {
      id: 5,
      title: 'Customer Reviews and Feedback',
      description:
        'Product reviews and ratings build trust, boost sales, and allow sellers to engage with customers, fostering stronger relationships and improving satisfaction.',
      icon: '/images/why-5.png',
    },
    {
      id: 6,
      title: 'Online & Offline Sales',
      description:
        'On the 3XG merchant platform, you can sell both online and offline, reaching customers 24/7 while also offering personal interactions in-store. It’s the perfect way to grow your business!',
      icon: '/images/why-6.png',
    },
    {
      id: 7,
      title: 'Inventory Management',
      description:
        'You can easily track stock levels in real-time, manage inventory across both online and offline sales, and streamline stock updates. This helps prevent overstocking, stockouts, and ensures efficient order fulfillment.',
      icon: '/images/why-7.png',
    },
    {
      id: 8,
      title: 'Reburst Finance & Account Module',
      description:
        ' We helps you manage your financial transactions efficiently. It offers tools for tracking sales, expenses, and profits, generating reports, and maintaining accurate financial records. This simplifies accounting, ensures transparency that will helps you make informed business decisions.',
      icon: '/images/why-8.png',
    },
    {
      id: 9,
      title: 'Live Order Tracking',
      description:
        'We provides real-time updates on order status, from purchase to delivery. This feature enhances transparency, improves customer satisfaction, and streamlines order management.',
      icon: '/images/why-9.png',
    },
  ];

  const MotionVStack = motion(VStack);
  const MotionSimpleGrid = motion(SimpleGrid);

  return (
    <VStack bg="white" w="full" pt={10}>
      <Container maxW="container.lg">
        <MotionVStack
          w="full"
          spacing={4}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text
            color="#12074B"
            fontSize={['lg', 'xl']}
            fontWeight="600"
            textAlign="center"
          >
            WHY SELL ON 3XG?
          </Text>

          <MotionSimpleGrid columns={[1, 2, 3]} spacing={6}>
            {whySell.map((item, index) => (
              <MotionVStack
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  w="195px"
                  h="190px"
                  rounded="full"
                  objectFit="contain"
                />
                <Text
                  color="#212429"
                  fontSize={['md', 'lg']}
                  fontWeight="600"
                  textAlign="center"
                >
                  {item.title}
                </Text>
                <Text
                  color="#212429"
                  fontSize="14px"
                  textAlign="center"
                  fontWeight="400"
                >
                  {item.description}
                </Text>
              </MotionVStack>
            ))}
          </MotionSimpleGrid>
        </MotionVStack>
      </Container>
    </VStack>
  );
};

export default WhySell;
