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
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useRegisterMutation } from '~/lib/redux/services/auth.service';
import { setData } from '~/lib/redux/slices/authSlice';
import { useAppDispatch } from '~/lib/redux/store';
import { signupSchema } from '~/lib/schemas/auth.schema';

const SignUp = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

  const handleLogin = async (values: any) => {
    await register({
      username: values.username,
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      role: 'customer',
    })
      .unwrap()
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Account created successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        dispatch(setData(values));
        router.push('/auth/verify');
      })
      .catch((error) => {
        toast({
          title: 'Error',
          description: error.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
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
            Sign up to get started
          </Heading>
        </VStack>

        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
          }}
          onSubmit={(values, actions) => {
            handleLogin(values);
          }}
          validationSchema={signupSchema}
        >
          {(props) => (
            <Form style={{ width: '100%' }}>
              <VStack spacing={4}>
                <Input
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                />

                <Input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                />

                <Input
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Username"
                />

                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                />

                {/* <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  leftAddOnContent={
                    <HStack spacing={2}>
                      <Image
                        src="/images/flag.svg"
                        alt="Ghana Flag"
                        boxSize="22px"
                      />
                      <Text>+234</Text>
                    </HStack>
                  }
                /> */}

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />

                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />

                <VStack align="stretch" w="100%" mt={4}>
                  <Button
                    text="Sign up"
                    bg="brand.100"
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    type="submit"
                  />
                </VStack>

                <Text
                  fontSize="16"
                  color="bodyText.200"
                  fontWeight="400"
                  mt={2}
                >
                  Already have an account?{' '}
                  <Link href="/auth/login">
                    <ChakraLink color="brand.100" fontWeight="700">
                      Login
                    </ChakraLink>
                  </Link>
                </Text>
              </VStack>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
};

export default SignUp;
