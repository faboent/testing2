/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useMemo } from 'react';

import { useGetProuctsQuery } from '~/lib/redux/services/product.service';

interface FilterParams {
  product_name?: string;
  color?: string;
  min_price?: string | number;
  max_price?: string | number;
  category?: string;
  brand?: string;
  rating?: string | number;
  discount?: string | number;
}

export const useFilteredProducts = (params: FilterParams) => {
  const { category, ...otherParams } = params;

  const queryString = useMemo(() => {
    const validParams = Object.entries(otherParams).filter(
      ([_, value]) => value !== '' && value !== undefined
    );
    return validParams
      .map(([key, value]) => {
        const encodedValue = value.toString().includes('%')
          ? value
          : encodeURIComponent(value);
        return `${key}=${encodedValue}`;
      })
      .join('&');
  }, [otherParams]);

  console.log(queryString, 'queryString');

  // Use category as path parameter instead of query parameter
  const { data, isLoading, error } = useGetProuctsQuery(
    category
      ? {
          category,
          ...(queryString
            ? Object.fromEntries(new URLSearchParams(queryString))
            : {}),
        }
      : ''
  );

  console.log('APIs Response:', {
    data,
    isLoading,
    error,
  });

  const products = useMemo(() => {
    console.log('Raw data structure:', data);

    // Handle the case when products are found
    if (Array.isArray(data?.data)) {
      return data.data;
    }
    // Default to empty array if no products
    return [];
  }, [data]);

  console.log('Products:', products);

  return {
    products,
    isLoading,
    error,
  };
};
