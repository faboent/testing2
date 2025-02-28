import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Icon, Text, useToast } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({
    title,
    status,
  }: {
    title: string;
    status: 'info' | 'warning' | 'success' | 'error';
  }) => {
    toast({
      position: 'top',
      title,
      status,
      duration: 3000,
      isClosable: true,
      containerStyle: {
        minW: '400px',
        justifyContent: 'center',
        display: 'flex',
      },
      render: ({ onClose }) => (
        <Flex
          mt="50px"
          position="relative"
          zIndex={9999}
          mx={{ base: '20px', md: '40px', xl: '72px' }}
          alignItems="center"
          fontSize="14px"
          rounded="6px"
          bgColor={status === 'error' ? '#FEF4F4' : 'white'}
          px="16px"
          py="12px"
          width="full"
          justifyContent="space-between"
        >
          <Flex alignItems="center">
            <Icon
              mr="10px"
              color={status === 'error' ? 'error' : 'greenMain'}
              as={status === 'error' ? RiErrorWarningFill : FaCheckCircle}
            />
            <Text color={status === 'error' ? 'error' : 'customBlack'}>
              {title}
            </Text>
          </Flex>
          <Icon
            as={CloseIcon}
            boxSize="24px"
            cursor="pointer"
            onClick={() => onClose()}
          />
        </Flex>
      ),
    });
  };

  return { showToast };
};
