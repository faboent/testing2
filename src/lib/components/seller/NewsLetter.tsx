import {
  VStack,
  Container,
  Text,
  Input,
  Button,
  HStack,
} from '@chakra-ui/react';
import Link from 'next/link';

const NewsLetter = () => {
  return (
    <VStack bg="white" w="full" pt={10}>
      <Container maxW="container.lg">
        <VStack align="flex-start" w="fit-content">
          <VStack align="flex-start" spacing={0}>
            <Text fontSize={['xl', '2xl']} fontWeight="600" color="#101010">
              Subscribe to our newsletter
            </Text>
            <Text fontSize={['14px', 'md']} color="#121212" fontWeight="400">
              Stay updated with the latest offer and news from 3XG
            </Text>
          </VStack>
          <HStack w="full">
            <Input
              placeholder="Email address"
              w="full"
              border="1px solid #000000"
              borderRadius="5px"
              focusBorderColor="brand.100"
              _placeholder={{ color: '#121212' }}
            />
            <Button
              bg="brand.100"
              color="white"
              fontSize="md"
              fontWeight="500"
              borderRadius="5px"
              px={6}
              py={4}
              _hover={{ bg: 'brand.100' }}
            >
              Subscribe
            </Button>
          </HStack>
          <Text fontSize="sm" color="#121212" fontWeight="300">
            By joining, you agree to our{' '}
            <Link href="/#" color="brand.100">
              <Text as="span" color="brand.100">
                terms and conditions.
              </Text>
            </Link>
          </Text>
        </VStack>
      </Container>
    </VStack>
  );
};

export default NewsLetter;
