'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from 'next/navigation';
import { useState } from 'react';

import Layout from '~/lib/components/layout';
import CategoryProducts from '~/lib/components/product/Category';
import { useFilteredProducts } from '~/lib/hooks/useFilteredProducts';

const Search = () => {
  const { categoryId } = useParams();

  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [color, setColor] = useState('');
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const { products, isLoading } = useFilteredProducts({
    product_name: search,
    color,
    category: categoryId as string,
    min_price: minPrice,
    max_price: maxPrice,
    rating,
    discount: discountPercentage,
  });

  return (
    <Layout showNavMenu>
      <CategoryProducts
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
        categoryId={categoryId as string}
      />
    </Layout>
  );
};

export default Search;
