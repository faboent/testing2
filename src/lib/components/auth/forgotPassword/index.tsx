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
import { useRequestResetPasswordMutation } from '~/lib/redux/services/auth.service';
import { setData } from '~/lib/redux/slices/authSlice';
import { useAppDispatch } from '~/lib/redux/store';
import { forgotSchema } from '~/lib/schemas/auth.schema';

const ForgotPassword = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const [requestResetPassword, { isLoading }] =
    useRequestResetPasswordMutation();

  const handleLogin = async (values: any) => {
    await requestResetPassword(values)
      .unwrap()
      .then((res) => {
        toast({
          title: 'Success',
          description: 'Reset password link sent to your email',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
        dispatch(setData(values));
        router.push('/auth/reset-password');
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
            Forgot password?
          </Heading>
          <Text fontSize="16" color="bodyText.200" fontWeight="400">
            Enter you Email Address to reset your password
          </Text>
        </VStack>

        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={(values, actions) => {
            handleLogin(values);
          }}
          validationSchema={forgotSchema}
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

                <VStack align="stretch" w="100%" mt={6}>
                  <Button
                    text="Continue "
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

export default ForgotPassword;
