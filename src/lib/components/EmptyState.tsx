import { Center, VStack, Text, Image, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import Button from './ui/Button';

interface EmptyStateProps {
  type: string;
  filterTerm: string;
}

const EmptyState = ({ type, filterTerm }: EmptyStateProps) => {
  const router = useRouter();
  return (
    <Center w="100%" h="200px">
      <VStack spacing={4}>
        <Image
          src="/images/search-empty.svg"
          alt="No products found"
          boxSize={78}
        />
        <VStack spacing={0}>
          <Text
            color="#212429"
            fontSize="md"
            textAlign="center"
            fontWeight="600"
          >
            We couldn’t find any result for {decodeURIComponent(filterTerm)}
          </Text>
          <Text color="black" fontSize="md" textAlign="center" opacity={0.5}>
            {type === 'search' &&
              'Please try different keyword or check your spelling'}
            {type === 'category' &&
              'Please check a different category or filter'}
          </Text>
        </VStack>

        <HStack>
          <Button
            text="Go To Homepae"
            bg="brand.100"
            size="md"
            onClick={() => router.push('/')}
          />
        </HStack>
      </VStack>
    </Center>
  );
};

export default EmptyState;
