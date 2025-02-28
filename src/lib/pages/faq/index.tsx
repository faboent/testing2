'use client';

import {
  VStack,
  HStack,
  Grid,
  GridItem,
  Box,
  Text,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import Layout from '~/lib/components/layout';
import Button from '~/lib/components/ui/Button';

const Faq = () => {
  const router = useRouter();
  const leftFaq = [
    {
      title: 'How do I change my account email?',
      content:
        'You can log in to your account and change it from your Profile > Edit Profile. Then go to the general tab to change your email.',
    },
    {
      title: 'What is your cancellation policy?',
      content:
        'Order can only be canceled when an order email has not be sent and shipment has not been made. Any amount paid will be credited into the same payment mode using which the payment was made',
    },
    {
      title: 'What is return policy?',
      content:
        'Returns are subject to the merchant’s policies. You can initiate a return through the app/Web within the eligible period ',
    },
    {
      title: 'How do I get started as a merchant ?',
      content:
        'To get started kindly click on the link www.3xgmerchant.com complete your store setup and start listing your products',
    },
    {
      title:
        'if i create an account do i need to create another in the 3XG app?',
      content:
        'No, you do not need to create a separate account. You can use the same account for both the website and the app',
    },
    {
      title: 'How can i track my order?',
      content:
        'To track your order, simply go to the "My Orders" section under your account on the 3XG App/Website, then click "Track" on your current order.',
    },
  ];

  const rightFaq = [
    {
      title: 'What should I do if my payment fails?',
      content:
        'If your payment fails, you can use the wallet or (COD) payment option, if available on that order. If your payment is debited from your account after a payment failure, it will be credited back within 7-10 days.',
    },
    {
      title: 'How do I check order delivery status ?',
      content:
        'Please tap on “My Orders” section under my account of the 3XG App/Website to check your order status.',
    },
    {
      title: 'How do I apply a coupon on my order?',
      content:
        'You can apply a coupon on cart page before order placement. The complete list of your unused and valid coupons will be available under “My Coupons” tab of App/Website/M-site.',
    },
    {
      title:
        'After creating an account can i use all the mini app in 3XG super app?',
      content:
        'Yes you can access all mini apps in the super app. However, access to the luxury platform may require meeting specific criteria',
    },
    {
      title: 'What is 3XG warranty policy',
      content:
        'Our Product comes with a 1 year warranty against defects in materials and workmanship. Damage from misuse or accidents is not covered. For warranty claims log onto our warranty portal or contact customer support Click Here for more Info',
    },
  ];

  return (
    <Layout>
      <VStack w="100%" align="flex-start" spacing={5}>
        <HStack
          justify="space-between"
          flexDirection={['column', 'row']}
          align="center"
          w="100%"
          bg="white"
          borderRadius={6}
          boxShadow="5px"
          // mb={5}
          mt={{ base: 5, md: 5 }}
          px={['4', '14']}
          py="4"
        >
          <VStack
            align={{ base: 'center', md: 'flex-start' }}
            spacing={0}
            w="100%"
          >
            <Text
              color="brand.100"
              fontWeight="600"
              fontSize={['lg', '2xl']}
              textAlign={{ base: 'center', md: 'left' }}
            >
              Hi, What question do you have?
            </Text>
            <Text
              color="#111111"
              fontWeight="400"
              fontSize={['sm', 'md']}
              textAlign={{ base: 'center', md: 'left' }}
            >
              Get answers. We&apos;re here to assist you.
            </Text>
          </VStack>

          <HStack>
            <Image src="/images/faq.svg" alt="logo" />
          </HStack>
        </HStack>

        <VStack
          w="100%"
          bg="white"
          borderRadius={6}
          boxShadow="5px"
          py={4}
          px={['4', '14']}
          spacing={8}
        >
          <Text color="#212429" fontWeight="600" fontSize={['lg', 'xl']}>
            Frequently Asked Questions (FAQ)
          </Text>

          <Grid
            templateColumns={{
              sm: 'repeat(1, 1fr)',
              md: 'repeat(1, 1fr)',
              lg: 'repeat(2, 1fr)',
            }}
            gap={6}
            w="100%"
          >
            <GridItem colSpan={{ sm: 1, md: 1, lg: 1 }} w="100%">
              <Accordion allowToggle>
                {leftFaq.map((faq, index) => (
                  <AccordionItem
                    borderWidth={1}
                    borderColor="brand.100"
                    borderRadius={5}
                    key={index}
                    mb={4}
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize={['md', 'lg']}
                          fontWeight="600"
                          color="brand.100"
                        >
                          {faq.title}
                        </Box>
                        <AccordionIcon color="brand.100" />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      pb={4}
                      fontSize="md"
                      fontWeight="400"
                      color="#212429"
                    >
                      {faq.content}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </GridItem>

            <GridItem colSpan={{ sm: 1, md: 1, lg: 1 }} w="100%">
              <Accordion allowToggle>
                {rightFaq.map((faq, index) => (
                  <AccordionItem
                    borderWidth={1}
                    borderColor="brand.100"
                    borderRadius={5}
                    key={index}
                    mb={4}
                  >
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          textAlign="left"
                          fontSize={['md', 'lg']}
                          fontWeight="600"
                          color="brand.100"
                        >
                          {faq.title}
                        </Box>
                        <AccordionIcon color="brand.100" />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      pb={4}
                      fontSize="md"
                      fontWeight="400"
                      color="#212429"
                    >
                      {faq.content}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </GridItem>
          </Grid>
        </VStack>

        <HStack
          w={['100%', '80%']}
          justify="space-between"
          align="center"
          alignSelf="center"
          bg="#212429"
          borderRadius={6}
          boxShadow="5px"
          py={4}
          px={['4', '14']}
        >
          <VStack align="flex-start" spacing={0}>
            <Text color="brand.100" fontWeight="600" fontSize="md">
              Still have questions?
            </Text>
            <Text color="white" fontWeight="400" fontSize={['sm', '14px']}>
              Can’t find the answer you’re looking for? Please chat to our
              friendly team.
            </Text>
          </VStack>

          <HStack>
            <Button
              text="Get in touch"
              bg="brand.100"
              color="white"
              size="sm"
              width="auto"
              fontSize={14}
              fontWeight={600}
              onClick={() => router.push('/contact-us')}
            />
          </HStack>
        </HStack>
      </VStack>
    </Layout>
  );
};

export default Faq;
