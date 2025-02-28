'use client';

import { Text, Heading, Stack, Image, VStack } from '@chakra-ui/react';

const AuthLeft = () => {
  return (
    <Stack
      flex={1}
      borderRadius={28}
      flexDir="column"
      align="center"
      justify="center"
      spacing={4}
      display={{
        base: 'none',
        md: 'flex',
      }}
      position="relative"
      w="full"
    >
      <Image
        alt="Login Image"
        objectFit="cover"
        src="/images/auth-side2.svg"
        borderRadius={28}
        w="full"
        h="750"
      />

      <VStack
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        zIndex={1}
        w="full"
        mb={8}
      >
        <Stack
          spacing={4}
          p={8}
          align="flex-start"
          color="white"
          bg="#00000066"
          borderRadius={20}
          w="90%"
          h="150"
        >
          <Heading
            fontSize={{
              base: 'xl',
              md: '2xl',
            }}
            color="white"
          >
            Welcome To moveIN
          </Heading>

          <Text
            fontSize={{
              base: '14',
              md: 'md',
            }}
            color="white"
          >
            Explore the easiest path to homeownership. With moveIN, gain access
            to secure and reliable property ownership options.
          </Text>
        </Stack>
      </VStack>
    </Stack>
  );
};

export default AuthLeft;
