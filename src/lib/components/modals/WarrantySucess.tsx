import { VStack, Text, HStack } from '@chakra-ui/react';

import Button from '../ui/Button';

const WarrantySucess = ({ onClose, type }: any) => {
  return (
    <VStack spacing={4} w="full" my={8}>
      {type === 'thirdParty' && (
        <>
          <Text
            fontSize="md"
            color="#212429"
            fontWeight="600"
            textAlign="center"
          >
            Success!
          </Text>
          <Text
            fontSize="14px"
            color="#212429"
            fontWeight="400"
            textAlign="center"
          >
            Warranty data has been transfered, The 3rd party owner will receive
            an sms for further information!
          </Text>
          <HStack
            spacing={4}
            w="full"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              text="Done"
              bg="brand.100"
              size="sm"
              fontSize={16}
              fontWeight={600}
              onClick={onClose}
              width="100px"
            />
          </HStack>
        </>
      )}

      {type === 'personal' && (
        <>
          <Text
            fontSize="md"
            color="#212429"
            fontWeight="600"
            textAlign="center"
          >
            Success!
          </Text>
          <Text
            fontSize="14px"
            color="#212429"
            fontWeight="400"
            textAlign="center"
          >
            Your warranty claim has been successfully received. Our team will
            reveiw your submission and claim then get back to you if possible
          </Text>

          <Text
            fontSize="md"
            color="#212429"
            fontWeight="600"
            textAlign="center"
          >
            Important Note:
          </Text>
          <Text
            fontSize="14px"
            color="#212429"
            fontWeight="400"
            textAlign="center"
          >
            If you’re unavailable at the scheduled date and time for your device
            delivery or pick up, a delivery fee will apply for rescheduling.
          </Text>
          <HStack
            spacing={4}
            w="full"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              text="Done"
              bg="brand.100"
              size="sm"
              fontSize={16}
              fontWeight={600}
              onClick={onClose}
              width="100px"
            />
          </HStack>
        </>
      )}
    </VStack>
  );
};

export default WarrantySucess;
