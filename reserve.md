'use client';

/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Flex,
  Box,
  Stack,
  Image,
  Text,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '../ui/Button';
import Input from '../ui/Input';
import { setCredentials } from '~/lib/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '~/lib/redux/store';
import { loginSchema } from '~/lib/schemas/auth.schema';

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { token, userInfo } = useAppSelector((state) => state.app.auth);

  const handleLogin = (values: any) => {
    const data = {
      email: values.email,
      password: values.password,
      role: 'admin',
      name: 'John Doe',
    };
    const tokenData =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU2MmI0YTk4YzAxMjM3ZDliYTNlZTkiLCJpYXQiOjE3MDk4ODc3MjZ9.hQqgcvKmw3QOjgbzW4SqKz5epaUoFdzCrMqGvi8q_oc';
    const payload = { data, token: tokenData };
    Cookies.set('token', token);
    dispatch(setCredentials(payload));
    token && userInfo && Cookies.get('token') && router.push('/dashboard');
  };

  return (
    <Flex minH="100vh" justify="center" bg="white" h="100vh" p={6} w="100%">
      <Stack spacing={8} w="100%" position="relative">
        <Stack
          align="center"
          bg="brand.200"
          w="100%"
          rounded="lg"
          minH="40vh"
          p={8}
          bgImage={`url('/images/auth-bg.svg')`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        >
          <Image src="/images/logo-white.svg" alt="logo" />
          <Text fontSize="md" color="bodyText.200" textAlign="center">
            A comprehensive solution designed to streamline the <br /> academic
            management.
          </Text>
        </Stack>

        <Stack
          rounded="lg"
          bg="white"
          boxShadow="lg"
          p={8}
          maxW="md"
          mx="auto"
          w="100%"
          position="absolute"
          top="65%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Text fontSize="lg" fontWeight="bold" color="headText.500">
            Log in to access your account
          </Text>
          <Stack spacing={4}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={(values, actions) => {
                handleLogin(values);
              }}
              validationSchema={loginSchema}
            >
              {(props) => (
                <Form style={{ width: '100%' }}>
                  <VStack>
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                    />

                    <Input
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Your password"
                    />

                    <VStack align="stretch" w="100%" mt={8}>
                      <Button text="Log in" />
                      <Link href="/forgot-password">
                        <ChakraLink
                          color="brand.300"
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          Forgot password?
                        </ChakraLink>
                      </Link>
                    </VStack>
                  </VStack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;





              // title
              '& .chakra-step__title': {
                fontSize: '14px',
                fontWeight: '600',
                color: 'red.900',
              },
              '& .chakra-step__description': {
                fontSize: '12px',
                fontWeight: '400',
                color: '#21242961',
              },









              <!-- profile -->
              'use client';

import {
  VStack,
  Grid,
  GridItem,
  Box,
  Image,
  Text,
  HStack,
} from '@chakra-ui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Layout from '~/lib/components/layout';
import Coupon from '~/lib/components/profile/Coupon';
import Order from '~/lib/components/profile/Order';
import PersonalInfo from '~/lib/components/profile/PersonalInfo';
import SingleOrder from '~/lib/components/profile/SingleOrder';
import Wallet from '~/lib/components/profile/Wallet';
import Warranty from '~/lib/components/profile/Warranty';
import { logOut } from '~/lib/redux/slices/authSlice';
import { useAppDispatch } from '~/lib/redux/store';

const Profile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const updateQueryParams = (params: Record<string, string>) => {
    if (params.activeMenu !== 'orders') {
      const newParams = new URLSearchParams(searchParams as any);
      newParams.delete('orderId');
      router.replace(`${pathname}?${newParams.toString()}`);
    } else {
      const newParams = new URLSearchParams(searchParams as any);
      Object.keys(params).forEach((key) => {
        newParams.set(key, params[key]);
      });
      router.replace(`${pathname}?${newParams.toString()}`);
    }
  };

  const [activeMenu, setActiveMenu] = useState('profile');

  const handleActiveMenu = (type: string) => {
    if (type === 'logout') {
      //  ask for confirmation
      window.confirm('Are you sure you want to logout?');
      dispatch(logOut());
      return;
    }
    setActiveMenu(type);
    updateQueryParams({ activeMenu: type });
  };

  useEffect(() => {
    const activeMenu = searchParams.get('activeMenu');
    if (activeMenu) setActiveMenu(activeMenu);
  }, [searchParams]);

  const profileMenu = [
    {
      icon: '/images/profile-user.svg',
      title: 'Profile',
      type: 'profile',
      active: activeMenu === 'profile',
    },
    {
      icon: '/images/profile-wallet.svg',
      title: 'Wallet',
      type: 'wallet',
      active: activeMenu === 'wallet',
    },
    {
      icon: '/images/orders.svg',
      title: 'Orders',
      type: 'orders',
      active: activeMenu === 'orders',
    },
    {
      icon: '/images/warranty.svg',
      title: 'Warranty Portal',
      type: 'warranty',
      active: activeMenu === 'warranty',
    },
    {
      icon: '/images/coupon-2.svg',
      title: 'Coupon',
      type: 'coupon',
      active: activeMenu === 'coupon',
    },
    {
      icon: '/images/logout.svg',
      title: 'Logout',
      type: 'logout',
      active: activeMenu === 'logout',
    },
  ];

  return (
    <Layout>
      <Grid
        templateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(1, 1fr)',
          lg: 'repeat(6, 1fr)',
        }}
        gap={6}
        h="100%"
        mb={5}
        mt={{ base: 5, md: 5 }}
      >
        <GridItem colSpan={{ sm: 0, md: 1, lg: 2 }} h="100%" w="100%">
          <Box w="100%" bg="white" borderRadius={6} boxShadow="5px">
            <VStack alignItems="stretch" spacing={0}>
              {profileMenu.map((item, index) => (
                <HStack
                  key={index}
                  spacing={6}
                  py={4}
                  px={6}
                  _hover={{ bg: '#21242933' }}
                  cursor="pointer"
                  borderRadius={6}
                  transition="all 0.3s ease"
                  bg={item.active ? '#21242933' : 'transparent'}
                  onClick={() => handleActiveMenu(item.type)}
                >
                  <Image src={item.icon} alt="account" boxSize="20px" />
                  <Text
                    color={item.type === 'logout' ? 'brand.100' : '#212429'}
                    fontSize="md"
                    fontWeight="500"
                  >
                    {item.title}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </GridItem>

        <GridItem colSpan={{ sm: 1, md: 1, lg: 4 }} h="100%" w="100%">
          <Box w="100%" bg="white" borderRadius={6} boxShadow="5px" p={4}>
            {activeMenu === 'profile' && <PersonalInfo />}
            {activeMenu === 'wallet' && <Wallet />}
            {activeMenu === 'orders' && !orderId && <Order />}
            {activeMenu === 'coupon' && <Coupon />}
            {activeMenu === 'warranty' && <Warranty />}
            {activeMenu === 'orders' && orderId && (
              <SingleOrder orderId={orderId} />
            )}
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Profile;

