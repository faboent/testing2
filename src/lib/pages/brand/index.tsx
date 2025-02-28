'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */

import { VStack, Image, Skeleton, Box } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import BrandBanners from '~/lib/components/brand/BrandBanners';
import BrandProducts from '~/lib/components/brand/BrandProducts';
import Layout from '~/lib/components/layout';
import { useFilteredProducts } from '~/lib/hooks/useFilteredProducts';
import { useGetBrandQuery } from '~/lib/redux/services/brand.service';

const Deal = () => {
  const { brandId } = useParams();

  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [color, setColor] = useState('');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');

  const { data: brandData, isLoading: isBrandLoading } =
    useGetBrandQuery(brandId);
  const brand = useMemo(() => brandData?.message?.body[0] ?? {}, [brandData]);
  const brandName = brand?.brand_name;

  const { products, isLoading } = useFilteredProducts({
    product_name: search,
    color,
    category,
    min_price: minPrice,
    max_price: maxPrice,
    rating,
    discount: discountPercentage,
    brand: brandName,
  });

  return (
    <Layout showNavMenu>
      {isLoading ? (
        <Box mt={10} w="100%" h="100%">
          <Skeleton height="300px" borderRadius="8" />
        </Box>
      ) : (
        <VStack mt={10} w="100%">
          <Image
            src="/images/banner8.svg"
            alt="banner7"
            width="100%"
            height="auto"
            borderRadius={16}
          />
        </VStack>
      )}
      <VStack mt={0} w="100%">
        <BrandBanners />
      </VStack>

      <BrandProducts
        discountPercentage={discountPercentage}
        setDiscountPercentage={setDiscountPercentage}
        rating={rating}
        setRating={setRating}
        color={color}
        setColor={setColor}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        allProducts={products}
        isLoading={isLoading}
        brandName={brandName}
      />
    </Layout>
  );
};

export default Deal;
