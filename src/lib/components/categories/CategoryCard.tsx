import { Box, VStack, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

type CategoryCardProps = {
  item: {
    name: string;
    slug: string;
    image: string;
  };
};

const CategoryCard = ({ item }: CategoryCardProps) => {
  return (
    <Link href={`/category/${item.slug}`}>
      <VStack>
        <Box
          position="relative"
          height="170px"
          width="170px"
          overflow="hidden"
          borderRadius="full"
          bg="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          _hover={{
            borderWidth: '1px',
            borderColor: 'brand.100',
            overflow: 'hidden',
            transform: 'scale(1.05)',
            transition: 'transform 0.5s',
          }}
        >
          <Image
            src={item.image}
            alt="category"
            objectFit="contain"
            w="100px"
            h="100px"
          />
        </Box>
        <Text fontSize="md" fontWeight="400" color="#000000">
          {item.name}
        </Text>
      </VStack>
    </Link>
  );
};

export default CategoryCard;
