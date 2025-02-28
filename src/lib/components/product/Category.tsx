'use client';

import { Grid, GridItem, Box, HStack, Text, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';

import EmptyState from '../EmptyState';
import Filter from '../shop/Filter';

import ProductCard from './ProductCard';

type BrandProductsProps = {
  minPrice: any;
  setMinPrice: any;
  maxPrice: any;
  setMaxPrice: any;
  discountPercentage: any;
  setDiscountPercentage: any;
  rating: any;
  setRating: any;
  color: any;
  setColor: any;
  allProducts: any;
  isLoading: boolean;
  categoryId: string;
};

const CategoryProducts = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  discountPercentage,
  setDiscountPercentage,
  rating,
  setRating,
  color,
  setColor,
  allProducts,
  isLoading,
  categoryId,
}: BrandProductsProps) => {
  const [sortBy, setSortBy] = useState('');
  return (
    <>
      {isLoading ? (
        <Grid
          templateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={6}
          h="100%"
          mb={5}
          mt={{ base: 5, md: 5 }}
        >
          <GridItem colSpan={{ sm: 0, md: 1, lg: 1 }} h="100%" w="100%">
            <Skeleton height="300px" mb={2} borderRadius="8" />
          </GridItem>

          <GridItem colSpan={{ sm: 1, md: 1, lg: 3 }} h="100%" w="100%">
            <Skeleton height="300px" w="100%" borderRadius="8" />
          </GridItem>
        </Grid>
      ) : (
        <Grid
          templateColumns={{
            sm: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={6}
          h="100%"
          mb={5}
          mt={{ base: 5, md: 5 }}
        >
          <GridItem colSpan={{ sm: 0, md: 1, lg: 1 }} h="100%" w="100%">
            <Box w="100%" h="100%" bg="white" borderRadius={8} boxShadow="5px">
              <Filter
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                discountPercentage={discountPercentage}
                setDiscountPercentage={setDiscountPercentage}
                rating={rating}
                setRating={setRating}
                color={color}
                setColor={setColor}
              />
            </Box>
          </GridItem>

          <GridItem colSpan={{ sm: 1, md: 1, lg: 3 }} h="100%" w="100%">
            <Box
              w="100%"
              h="100%"
              bg="white"
              borderRadius={8}
              boxShadow="5px"
              p={4}
            >
              <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  fontSize={['14px', 'md']}
                  fontWeight="600"
                  color="#212429"
                  textTransform="capitalize"
                >
                  {decodeURIComponent(categoryId).replace(/-/g, ' ')}
                </Text>

                <HStack display={{ base: 'none', md: 'flex' }}>
                  <Text
                    fontSize="12px"
                    color="#21242980"
                    fontWeight="400"
                    style={{
                      textWrap: 'nowrap',
                    }}
                  >
                    Sort By:
                  </Text>

                  <HStack spacing={1}>
                    {['Popularity', 'Newest', 'Price: Low to high'].map(
                      (sort, index) => (
                        <Box
                          key={index}
                          borderWidth={1}
                          borderColor="brand.100"
                          borderRadius="3px"
                          color="#212429"
                          bg={sortBy === sort ? 'brand.100' : 'transparent'}
                          fontSize="10px"
                          fontWeight="400"
                          w="auto"
                          h="auto"
                          px={2}
                          textTransform="capitalize"
                          cursor="pointer"
                          onClick={() => setSortBy(sort)}
                        >
                          {sort}
                        </Box>
                      )
                    )}
                  </HStack>
                </HStack>
              </HStack>
              {Array.isArray(allProducts) && allProducts.length > 0 ? (
                <Grid
                  templateColumns={[
                    'repeat(2, 1fr)',
                    'repeat(2, 1fr)',
                    'repeat(4, 1fr)',
                  ]}
                  gap={5}
                  w="100%"
                  mt={2}
                >
                  {allProducts.map((item: any, index: any) => (
                    <GridItem key={index}>
                      <ProductCard item={item} />
                    </GridItem>
                  ))}
                </Grid>
              ) : (
                <Box mt={20}>
                  <EmptyState type="category" filterTerm={categoryId} />
                </Box>
              )}
            </Box>
          </GridItem>
        </Grid>
      )}

      <Box />
    </>
  );
};

export default CategoryProducts;
