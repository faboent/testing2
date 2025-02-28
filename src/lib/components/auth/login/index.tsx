'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Flex,
  Text,
  Heading,
  Stack,
  Image,
  VStack,
  Link as ChakraLink,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useLoginMutation } from '~/lib/redux/services/auth.service';
import { setCredentials, setData } from '~/lib/redux/slices/authSlice';
import { useAppDispatch } from '~/lib/redux/store';
import { loginSchema } from '~/lib/schemas/auth.schema';

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (values: any) => {
    await login({
      email: values.email,
      password: values.password,
      role: 'customer',
    })
      .unwrap()
      .then((res) => {
        toast({
          title: 'Login successful',
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true,
        });
        if (!res.status && res.message === 'Verify your email') {
          dispatch(setData({ email: values.email }));
          // router.push('/auth/verify');
          window.location.href = '/auth/verify';
        } else {
          Cookies.set('token', res.data.tokens.accessToken);
          dispatch(
            setCredentials({
              data: res.data,
              token: res.data.tokens.accessToken,
            })
          );
          // router.push('/');
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.log('error', error);
        toast({
          title: error?.data?.message,
          status: 'error',
          position: 'top-right',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex px={4} py={10} flex={1} align="center" justify="center" width="100%">
      <Stack
        spacing={4}
        w="full"
        maxW="lg"
        bg="white"
        boxShadow="md"
        rounded="md"
        p={8}
        borderWidth="1px"
        borderColor="border.300"
      >
        <Link href="/" style={{ alignSelf: 'center' }}>
          <Image
            alt="logo"
            src="/images/logo.svg"
            width="100px"
            height="50px"
            alignSelf="center"
          />
        </Link>
        <VStack spacing={1} align="stretch">
          <Heading
            fontSize={{
              base: 'xl',
              md: '28',
            }}
            color="headText.200"
            fontWeight="700"
          >
            Welcome back!
          </Heading>
          <Text fontSize="16" color="bodyText.200" fontWeight="400">
            Don’t have an account?{' '}
            <Link href="/auth/signup">
              <ChakraLink color="brand.100" fontWeight="700">
                Sign up
              </ChakraLink>
            </Link>
          </Text>
        </VStack>

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
              <VStack spacing={4}>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                />

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />

                <VStack my={2}>
                  <Link href="/auth/forgot-password">
                    <ChakraLink
                      color="brand.100"
                      fontSize="16"
                      fontWeight="400"
                    >
                      Forgot password?
                    </ChakraLink>
                  </Link>
                </VStack>

                <VStack align="stretch" w="100%">
                  <Button
                    text="Login"
                    bg="brand.100"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  />
                </VStack>
              </VStack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
};

export default Login;
