import {
  Stack,
  HStack,
  Select as ChakraSelect,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';

const Pagination = () => {
  return (
    <HStack justify="space-between" w="100%" mt={4} alignItems="center">
      <Stack direction="row" spacing={4} alignItems="center">
        <Text color="brand.600" fontSize="14px" fontWeight={400}>
          Rows per page:
        </Text>
        <ChakraSelect
          placeholder="10"
          size="sm"
          w="60px"
          bg="transparent"
          color="brand.600"
          fontSize="14px"
          fontWeight={400}
          variant="ghost"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </ChakraSelect>
      </Stack>
      <Stack direction="row" spacing={4} alignItems="center">
        <Text color="bodyText.900" fontSize="14px" fontWeight={400}>
          1-10 of 100
        </Text>
        <IconButton
          aria-label="Previous"
          icon={<Image src="/images/arrow-right.svg" alt="Previous" />}
          variant="outline"
          borderColor="brand.600"
        />
        <IconButton
          aria-label="Next"
          icon={<Image src="/images/arrow-left.svg" alt="Next" />}
          variant="outline"
          borderColor="brand.600"
        />
      </Stack>
    </HStack>
  );
};

export default Pagination;
