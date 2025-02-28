import { HStack, Text, Button, Image } from '@chakra-ui/react';

type MoreTabProps = {
  name: string;
  //   path: string;
};

const MoreTabBulk = ({ name }: MoreTabProps) => {
  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      bg="#E7906B80"
      borderRadius="10"
      px="5"
      py="2"
    >
      <Text fontSize={['sm', 'md']} fontWeight="600" color="#666666">
        <Text as="span" color="brand.100">
          {name}
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
      >
        View All
      </Button>
    </HStack>
  );
};

export default MoreTabBulk;
