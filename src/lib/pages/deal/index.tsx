'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  VStack,
  Grid,
  GridItem,
  Image,
  Box,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import Brands from '~/lib/components/banner/Brands';
import CategoryCard from '~/lib/components/categories/CategoryCard';
import CategorySlider from '~/lib/components/categories/CategorySlider';
import Layout from '~/lib/components/layout';
import MoreTabCategory from '~/lib/components/product/MoreTabCategory';
import ProductCard2 from '~/lib/components/product/ProductCard2';
import Filter from '~/lib/components/shop/Filter';
import { categories, products } from '~/lib/utils/constants';

const Brand = () => {
  const [priceRange, setPriceRange] = useState('');
  const [category, setCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [serviceRating, setServiceRating] = useState('');
  const [color, setColor] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [rating, setRating] = useState('');

  return (
    <Layout showNavMenu>
      <VStack mt={10} w="100%">
        <Image
          src="/images/banner9.svg"
          alt="banner7"
          width="100%"
          height="auto"
          borderRadius={16}
        />
      </VStack>

      <VStack mt={5} w="100%">
        <CategorySlider />
      </VStack>

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
              // setPriceRange={setPriceRange}
              // setProductType={setProductType}
              // // productType={productType}
              // discountPercentage={discountPercentage}
              // setDiscountPercentage={setDiscountPercentage}
              // serviceRating={serviceRating}
              // setServiceRating={setServiceRating}
              // color={color}
              // setColor={setColor}

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
            <HStack w="full" justifyContent="space-between" alignItems="center">
              <Text fontSize={['14px', 'md']} fontWeight="600" color="#666666">
                Samsung Store{' '}
                <Text
                  as="span"
                  color="#21242980"
                  fontSize="sm"
                  fontWeight="400"
                >
                  (199 Products)
                </Text>
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
                    (color, index) => (
                      <Box
                        key={index}
                        borderWidth={1}
                        borderColor="brand.100"
                        borderRadius="3px"
                        color="#212429"
                        bg={
                          selectedColor === color ? 'brand.100' : 'transparent'
                        }
                        fontSize="10px"
                        fontWeight="400"
                        w="auto"
                        h="auto"
                        px={2}
                        textTransform="capitalize"
                        cursor="pointer"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Box>
                    )
                  )}
                </HStack>
              </HStack>
            </HStack>
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
              {products.map((item, index) => (
                <GridItem key={index}>
                  <ProductCard2 item={item} />
                </GridItem>
              ))}
            </Grid>
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Brand;
