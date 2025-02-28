'use client';

import { HStack, Text, Button, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

type MoreTabProps = {
  name: string;
  //   path: string;
};

const MoreTab = ({ name }: MoreTabProps) => {
  const router = useRouter();
  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      borderRadius="10"
      px="5"
      py="2"
    >
      <Text fontSize={['sm', 'md']} fontWeight="600" color="#666666">
        {name}{' '}
        <Text as="span" color="brand.100">
          Deals
        </Text>
      </Text>

      <Button
        rightIcon={<Image src="/images/arrow-right.svg" w="15px" h="15px" />}
        variant="ghost"
        _hover={{ bg: 'transparent' }}
        color="#343434"
        fontSize="13px"
        fontWeight="400"
        size="xs"
        p={0}
        onClick={() => router.push(`/deal/${name.toLowerCase()}`)}
      >
        View All
      </Button>
    </HStack>
  );
};

export default MoreTab;
