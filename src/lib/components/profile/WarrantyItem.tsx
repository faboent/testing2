import { VStack, Text } from '@chakra-ui/react';

import Stepper from '../ui/Stepper';

const WarrantyItem = ({ warranty }: any) => {
  return (
    <VStack alignItems="flex-start" spacing={4}>
      <Text fontSize="sm" fontWeight="500" color="#21242980">
        IMEI: {warranty?.imei}
      </Text>
      <Stepper warranty={warranty} />
    </VStack>
  );
};

export default WarrantyItem;
