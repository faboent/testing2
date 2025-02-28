'use client';

import {
  Image,
  Heading,
  VStack,
  SimpleGrid,
  UnorderedList,
  ListItem,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Container,
  HStack,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import Link from 'next/link';

const support = [
  {
    name: '3XGsupport@gmail.com',
  },
  {
    name: '+2348192003981',
  },
];

const companyLinks = [
  {
    name: 'My Account',
    link: '/profile/user',
  },
  {
    name: 'Login / Register',
    link: '/auth/login',
  },
  {
    name: 'My Order',
    link: '/profile/orders',
  },
  {
    name: 'Warranty Portal',
    link: '/profile/warranty',
  },
  {
    name: 'Coupon',
    link: '/profile/coupon',
  },
];

const links = [
  {
    name: 'About Us',
    link: '/about-us',
  },
  {
    name: 'Contact Us',
    link: '/contact-us',
  },
  {
    name: 'FAQ',
    link: '/faq',
  },
  {
    name: 'Warranty Policy',
    link: '/warranty-policy',
  },
  {
    name: 'Privacy Policy',
    link: '/#',
  },
  {
    name: 'Terms Of Use',
    link: '/#',
  },
];

const makeMoney = [
  {
    name: 'Become a seller',
    link: '/become-a-seller',
  },
];

const Footer = () => {
  return (
    <VStack mt={50} as="footer" bg="#000000" pt={10} w="100%">
      <Container maxW="container.lg">
        <SimpleGrid columns={{ base: 2, md: 2, lg: 6 }} spacing={8}>
          <VStack align="flex-start" spacing={5}>
            <Image
              src="/images/logo-dark.svg"
              alt="logo"
              width="100px"
              height="40px"
            />

            <Text
              color="#FAFAFA"
              fontSize={['md', 'lg']}
              fontWeight="500"
              fontFamily="body"
            >
              Subscribe
            </Text>

            <VStack align="flex-start">
              <Text
                color="#FAFAFA"
                fontSize={['12px', 'md']}
                fontWeight="400"
                fontFamily="body"
              >
                Get 10% off your first order
              </Text>
              <InputGroup>
                <Input
                  placeholder="Enter your email"
                  borderColor="#FAFAFA"
                  bg="#000000"
                  color="#FAFAFA"
                  focusBorderColor="brand.100"
                  _placeholder={{ color: '#FAFAFA' }}
                />
                <InputRightElement>
                  <Image src="/images/send.svg" alt="arrow" />
                </InputRightElement>
              </InputGroup>
            </VStack>
          </VStack>

          <VStack align="flex-start">
            <Heading
              as="h3"
              fontSize={['14px', '18px']}
              mb={4}
              fontFamily="heading"
              fontWeight="500"
              color="#FAFAFA"
            >
              Support
            </Heading>
            <UnorderedList
              styleType="none"
              p={0}
              m={0}
              color="#FAFAFA"
              fontSize={['12px', 'md']}
              fontWeight="400"
              fontFamily="body"
              spacing={4}
            >
              {support.map((item) => (
                <ListItem>
                  <Text>{item.name}</Text>
                </ListItem>
              ))}
            </UnorderedList>
          </VStack>

          <VStack align="flex-start">
            <Heading
              as="h3"
              fontSize={['14px', '18px']}
              mb={4}
              fontFamily="heading"
              fontWeight="500"
              color="#FAFAFA"
            >
              Account
            </Heading>
            <UnorderedList
              styleType="none"
              p={0}
              m={0}
              color="#FAFAFA"
              fontSize={['12px', 'md']}
              fontWeight="400"
              fontFamily="body"
              spacing={4}
            >
              {companyLinks.map((link) => (
                <ListItem>
                  <Link href={link.link}>{link.name}</Link>
                </ListItem>
              ))}
            </UnorderedList>
          </VStack>

          <VStack align="flex-start">
            <Heading
              as="h3"
              fontSize={['14px', '18px']}
              mb={4}
              fontFamily="heading"
              fontWeight="500"
              color="#FAFAFA"
            >
              About 3XG
            </Heading>
            <UnorderedList
              styleType="none"
              p={0}
              m={0}
              color="#FAFAFA"
              fontSize={['12px', 'md']}
              fontWeight="400"
              fontFamily="body"
              spacing={4}
            >
              {links.map((link) => (
                <ListItem>
                  <Link href={link.link}>{link.name}</Link>
                </ListItem>
              ))}
            </UnorderedList>
          </VStack>

          <VStack align="flex-start">
            <Heading
              as="h3"
              fontSize={['14px', '16px']}
              mb={4}
              fontFamily="heading"
              fontWeight="500"
              color="#FAFAFA"
            >
              Make money on 3XG
            </Heading>
            <UnorderedList
              styleType="none"
              p={0}
              m={0}
              color="#FAFAFA"
              fontSize={['12px', 'md']}
              fontWeight="400"
              fontFamily="body"
              spacing={4}
            >
              {makeMoney.map((link) => (
                <ListItem>
                  <Link href={link.link}>{link.name}</Link>
                </ListItem>
              ))}
            </UnorderedList>
          </VStack>

          <VStack align="flex-start">
            <Heading
              as="h3"
              fontSize="18px"
              mb={4}
              fontFamily="heading"
              fontWeight="500"
              color="#FAFAFA"
            >
              Download App
            </Heading>

            <VStack alignItems="flex-start">
              <Text
                color="#FAFAFA"
                fontSize="14px"
                fontWeight="500"
                fontFamily="body"
              >
                Get access to exclusive offers!
              </Text>
              <HStack alignItems="flex-start">
                <Image src="/images/barcode.svg" />

                <VStack alignItems="flex-start" spacing={0}>
                  <IconButton
                    aria-label="Download on App Store"
                    icon={<Image src="/images/appstore.svg" />}
                    variant="unstyled"
                  />

                  <IconButton
                    aria-label="Download on Google Play"
                    icon={<Image src="/images/google-play.svg" />}
                    variant="unstyled"
                  />
                </VStack>
              </HStack>
            </VStack>

            <UnorderedList
              styleType="none"
              p={0}
              m={0}
              color="bodyText.600"
              fontSize="md"
              fontWeight="400"
              fontFamily="body"
              spacing={4}
            >
              <ListItem>
                <HStack spacing={6} mt={2}>
                  <Link href="/#">
                    <Image src="/images/facebook.svg" alt="facebook" />
                  </Link>
                  <Link href="/#">
                    <Image src="/images/linkedin.svg" alt="facebook" />
                  </Link>
                  <Link href="/#">
                    <Image src="/images/twitter.svg" alt="twitter" />
                  </Link>
                  <Link href="/#">
                    <Image src="/images/instagram.svg" alt="instagram" />
                  </Link>
                </HStack>
              </ListItem>
            </UnorderedList>
          </VStack>
        </SimpleGrid>
      </Container>

      <Divider borderColor="#FFFFFF" mt={4} mb={-2} />

      <VStack
        align="center"
        justify="center"
        bgImage="url(/images/footer.svg)"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="contain"
        w="100%"
        h="100px"
      >
        <Text color="#FFFFFF" fontSize="md" fontWeight="400">
          © Copyright 3XG africa 2022. All right reserved
        </Text>
      </VStack>
    </VStack>
  );
};

export default Footer;
