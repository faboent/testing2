'use client';

/* eslint-disable consistent-return */

import {
  Center,
  Heading,
  FormControl,
  Flex,
  Stack,
  HStack,
  PinInput,
  PinInputField,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import Button from '../../ui/Button';
import {
  useVerifyEmailMutation,
  useResendVerifyCodeMutation,
} from '~/lib/redux/services/auth.service';
import { setCredentials } from '~/lib/redux/slices/authSlice';
import { useAppSelector, useAppDispatch } from '~/lib/redux/store';

const Verify = () => {
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((state) => state.app.auth);
  console.log('data', data);

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendVerifyCode] = useResendVerifyCodeMutation();

  const [timer, setTimer] = useState(59);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
    setIsResendEnabled(true);
  }, [timer]);

  const handleVerify = async () => {
    await verifyEmail({
      email: data?.email,
      otp,
    })
      .unwrap()
      .then(() => {
        toast({
          title: 'Success',
          description: 'Email verified successfully',
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

  const handleResend = async () => {
    if (isResendEnabled) {
      setTimer(59);
      setIsResendEnabled(false);
      await resendVerifyCode({
        email: data?.email,
      })
        .unwrap()
        .then(() => {
          toast({
            title: 'Success',
            description: 'OTP sent successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
          setTimer(59);
          setIsResendEnabled(false);
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
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="#ebe8e8">
      <Stack
        spacing={4}
        w="full"
        maxW="lg"
        bg="white"
        rounded="xl"
        boxShadow="lg"
        px={8}
        py={14}
        my={10}
      >
        <Center>
          <Link href="/" style={{ alignSelf: 'center' }}>
            <Image
              alt="logo"
              src="/images/logo.svg"
              width="100px"
              height="50px"
              alignSelf="center"
            />
          </Link>
        </Center>
        <Stack spacing={2}>
          <Center>
            <Heading
              fontSize={{ base: 'xl', md: '28px' }}
              color="headText.200"
              fontWeight="700"
              fontFamily="body"
            >
              Enter OTP
            </Heading>
          </Center>
          <Center
            fontSize={{ base: 'md', sm: '18px' }}
            color="bodyText.200"
            fontWeight="500"
            fontFamily="body"
          >
            Please check your messages.
          </Center>
          <Center
            fontSize={{ base: 'sm', sm: 'md' }}
            fontWeight="400"
            fontFamily="body"
            color="bodyText.200"
          >
            We have sent an OTP to
            <Text as="span" color="brand.100" fontWeight="600" ml={1}>
              {data?.email}
            </Text>
          </Center>
        </Stack>
        <FormControl>
          <HStack ml={16}>
            <Text
              fontSize="14"
              color="brand.100"
              fontWeight="700"
              cursor="pointer"
            >
              00:{timer < 10 ? `0${timer}` : timer}
            </Text>
          </HStack>
          <Center flexDir="column">
            <HStack>
              <PinInput
                size="lg"
                variant="outline"
                onChange={(value) => setOtp(value)}
              >
                <PinInputField borderRadius={8} borderColor="border.300" />
                <PinInputField borderRadius={8} borderColor="border.300" />
                <PinInputField borderRadius={8} borderColor="border.300" />
                <PinInputField borderRadius={8} borderColor="border.300" />
                <PinInputField borderRadius={8} borderColor="border.300" />
                <PinInputField borderRadius={8} borderColor="border.300" />
              </PinInput>
            </HStack>

            <Text fontSize="14" color="bodyText.200" fontWeight="500" mt={2}>
              Didn’t get a code?{' '}
              <Text
                color={isResendEnabled ? 'brand.100' : 'grey'}
                as="span"
                cursor={isResendEnabled ? 'pointer' : 'default'}
                onClick={handleResend}
              >
                Click to resend.
              </Text>
            </Text>
          </Center>
        </FormControl>
        <HStack spacing={6}>
          <Button
            text="Cancel"
            borderRadius={8}
            variant="outline"
            border="brand.100"
            color="brand.100"
            onClick={() => router.back()}
          />
          <Button
            text="Verify"
            bg="brand.100"
            isDisabled={otp.length !== 6 || isLoading}
            isLoading={isLoading}
            onClick={handleVerify}
          />
        </HStack>
      </Stack>
    </Flex>
  );
};

export default Verify;
