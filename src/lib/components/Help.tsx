'use client';

import { HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

import { help } from '~/lib/utils/constants';

const ShopCategory = () => {
  return (
    <VStack
      spacing={0}
      align="stretch"
      bg="white"
      borderRadius="8"
      boxShadow="md"
      py={2}
      w="100%"
    >
      {help.map((category, index) => (
        <Link href={category.link}>
          <HStack
            key={index}
            borderBottomWidth={index === help.length - 1 ? '0px' : '1px'}
            borderBottomColor="#3434341A"
            borderTopColor="#3434341A"
            borderTopWidth={0}
            py={2}
            px={4}
            cursor="pointer"
            _hover={{
              bg: '#F0F0F0',
              transition: '0.3s',
            }}
          >
            <Text fontSize="14" fontWeight="400" color="#212429">
              {category.name}
            </Text>
          </HStack>
        </Link>
      ))}
    </VStack>
  );
};

export default ShopCategory;
