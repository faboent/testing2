'use client';

import { Box, Divider, HStack, Text, VStack, Image } from '@chakra-ui/react';

import { formatCurrency, formatValidUntil } from '~/lib/utils/formatter';

interface CouponProps {
  amount: number;
  code: string;
  validUntil?: string;
  isUnused?: boolean;
}

const CouponItem = ({
  amount,
  code,
  validUntil,
  isUnused = true,
}: CouponProps) => {
  return (
    <Box
      position="relative"
      w="full"
      maxW="3xl"
      p={4}
      bg="white"
      borderRadius="xl"
      border="1px solid"
      borderColor="#E7906B"
      boxShadow="0 4px 6px -1px rgba(231, 144, 107, 0.1)"
      overflow="hidden"
    >
      {/* Left notch */}
      <Box
        position="absolute"
        left="-10px"
        top="50%"
        transform="translateY(-50%)"
        w="20px"
        h="40px"
        bg="white"
        borderRightRadius="full"
        boxShadow="0 0 0 1px #E7906B"
      />

      {/* Right notch */}
      <Box
        position="absolute"
        right="-10px"
        top="50%"
        transform="translateY(-50%)"
        w="20px"
        h="40px"
        bg="white"
        borderLeftRadius="full"
        boxShadow="0 0 0 1px #E7906B"
      />

      <HStack mb={4} justifyContent="space-between" alignItems="flex-start">
        <Text fontSize={['md', '18px']} color="#E7906B" fontWeight="700">
          Favour Blessing
        </Text>
        <Box bg="#E92F2F1A" px={4} py={1} borderRadius="md">
          <Text fontSize="sm" color="#000000" fontWeight="500">
            Valid Until {formatValidUntil(validUntil)}
          </Text>
        </Box>
      </HStack>

      <Divider
        orientation="horizontal"
        borderStyle="dashed"
        borderColor="#E7906B"
      />

      <HStack
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mt={4}
        px={4}
      >
        <HStack spacing={4} alignItems="flex-start">
          <Image src="/images/coupon-3.svg" alt="coupon" mt={1} />

          <VStack align="flex-start" spacing={0}>
            <Text fontSize="lg" fontWeight="500" color="#202020">
              {formatCurrency(amount)}
            </Text>
            <Text color="#000000" fontSize="sm" fontWeight="400" mt={-1}>
              Code: {code}
            </Text>
            <Text color="#E7906B" fontSize="sm" fontWeight="400">
              Voucher
            </Text>
          </VStack>
        </HStack>

        <Text
          color={isUnused ? '#34A853' : '#E7906B'}
          fontWeight="500"
          fontSize="14px"
        >
          {isUnused ? 'Unused' : 'Used'}
        </Text>
      </HStack>
    </Box>
  );
};

export default CouponItem;
