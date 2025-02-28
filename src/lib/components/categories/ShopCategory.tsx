'use client';

import { HStack, Text, VStack, Skeleton, Box } from '@chakra-ui/react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { useGetCategoriesQuery } from '~/lib/redux/services/product.service';

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  commision: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  children: CategoryItem[];
}

const ShopCategory = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery('');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    console.log('All Categories Data:', categories?.data);
    return (categories?.data as CategoryItem[]) || [];
  }, [categories]);

  return (
    <Box position="relative">
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
        {isLoading ? (
          <>
            {[...Array(6)].map((_, index) => (
              <HStack
                key={`skeleton-${index}`}
                borderBottomWidth="1px"
                borderBottomColor="#3434341A"
                py={1}
                px={4}
              >
                <Skeleton height="20px" width="100%" />
              </HStack>
            ))}
          </>
        ) : (
          allCategories.map((category, index) => (
            <Box
              key={category.id}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link href={`/category/${category.slug}`}>
                <HStack
                  borderBottomWidth={
                    index === allCategories.length - 1 ? '0px' : '1px'
                  }
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
              </Link>

              {hoveredCategory === category.name && (
                <Box
                  position="absolute"
                  left="100%"
                  top="0"
                  w="800px"
                  minH="270px"
                  maxH="270px"
                  bg="white"
                  boxShadow="lg"
                  zIndex={999}
                  p={4}
                  ml={2}
                  overflowY="auto"
                >
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(4, 1fr)"
                    gap={2}
                  >
                    {category.children.map((subCategory) => (
                      <Box key={subCategory.id}>
                        <Link href={`/category/${subCategory.slug}`}>
                          <Text
                            fontSize="14"
                            fontWeight="600"
                            p={2}
                            color="#212429"
                            borderBottom="1px"
                            borderColor="gray.200"
                            style={{
                              textWrap: 'nowrap',
                            }}
                          >
                            {subCategory.name}
                          </Text>
                        </Link>
                        <VStack align="stretch" spacing={0}>
                          {subCategory.children.map((subSubCategory) => (
                            <Link
                              key={subSubCategory.id}
                              href={`/category/${subSubCategory.slug}`}
                            >
                              <Text
                                fontSize="12"
                                p={1}
                                pl={2}
                                color="#212429"
                                _hover={{
                                  color: 'brand.100',
                                }}
                              >
                                {subSubCategory.name}
                              </Text>
                            </Link>
                          ))}
                        </VStack>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default ShopCategory;
