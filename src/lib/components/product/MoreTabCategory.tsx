import { HStack, Text } from '@chakra-ui/react';

type MoreTabProps = {
  name: string;
  //   path: string;
};

const MoreTabCategory = ({ name }: MoreTabProps) => {
  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="10"
      px="5"
      py="2"
      bg="brand.100"
    >
      <Text fontSize={['sm', 'md']} fontWeight="600" color="#666666">
        Shop from top{' '}
        <Text as="span" color="white">
          {name}
        </Text>
      </Text>
    </HStack>
  );
};

export default MoreTabCategory;
