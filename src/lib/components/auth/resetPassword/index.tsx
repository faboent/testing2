'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Flex,
  Text,
  Heading,
  Stack,
  Image,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '../../ui/Button';
import Input from '../../ui/Input';
import AuthLeft from '../AuthLeft';
import { useResetPasswordMutation } from '~/lib/redux/services/auth.service';
import { setCredentials } from '~/lib/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '~/lib/redux/store';
import { resetSchema } from '~/lib/schemas/auth.schema';

const ResetPassword = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.app.auth);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleLogin = async (values: any) => {
    await resetPassword({
      otp: values.otp,
      newPassword: values.newPassword,
      email: data.email,
    })
      .unwrap()
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Password reset successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        dispatch(setCredentials({ data: null, token: null }));
        router.push('/auth/login');
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
            Reset password?
          </Heading>
          <Text fontSize="16" color="bodyText.200" fontWeight="400">
            Enter the Code sent to your email to reset your password
          </Text>
        </VStack>

        <Formik
          initialValues={{
            otp: '',
            password: '',
            password_confirmation: '',
          }}
          onSubmit={(values, actions) => {
            handleLogin(values);
          }}
          validationSchema={resetSchema}
        >
          {(props) => (
            <Form style={{ width: '100%' }}>
              <VStack spacing={4} align="stretch">
                <Input
                  label="OTP"
                  name="otp"
                  type="number"
                  placeholder="Enter the OTP sent to your email"
                />

                <Input
                  label="Password"
                  name="newPassword"
                  type="password"
                  placeholder="Enter your password"
                />

                <Input
                  label="Confirm Password"
                  name="password_confirmation"
                  type="password"
                  placeholder="Confirm your password"
                />

                <VStack align="stretch" w="100%" mt={10}>
                  <Button
                    text="Continue"
                    bg="brand.100"
                    isDisabled={isLoading}
                    isLoading={isLoading}
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

export default ResetPassword;
