'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import Layout from '~/lib/components/layout';
import SearchProducts from '~/lib/components/product/Search';
import { useFilteredProducts } from '~/lib/hooks/useFilteredProducts';

const Search = () => {
  const params = useParams();
  const { search } = params as any;

  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [color, setColor] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');

  const { products, isLoading } = useFilteredProducts({
    product_name: search,
    color,
    category,
    min_price: minPrice,
    max_price: maxPrice,
    rating,
    discount: discountPercentage,
  });

  return (
    <Layout showNavMenu>
      <SearchProducts
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
        search={search}
      />
    </Layout>
  );
};

export default Search;
