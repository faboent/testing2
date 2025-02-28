'use client';

import { HStack, Text, VStack } from '@chakra-ui/react';

import { categories2 } from '~/lib/utils/constants';

const DealCategory = () => {
  return (
    <VStack
      spacing={0}
      align="stretch"
      bg="white"
      borderRadius="8"
      boxShadow="md"
      py={1}
      w="100%"
    >
      <Text
        fontSize="14"
        fontWeight="700"
        color="#212429"
        textAlign="center"
        pb="1"
      >
        Categories
      </Text>
      {categories2.map((category, index) => (
        <HStack
          key={index}
          borderBottomWidth={index === categories2.length - 1 ? '0px' : '1px'}
          borderBottomColor="#3434341A"
          borderTopColor="#3434341A"
          borderTopWidth={index === 0 ? '1px' : '0px'}
          py={1}
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
      ))}
    </VStack>
  );
};

export default DealCategory;
