import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).app.auth;
      headers.set('authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['PRODUCT'],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params) => ({
        url: 'api/v1/shoppers/products',
        method: 'GET',
        params,
      }),
      providesTags: ['PRODUCT'],
    }),

    getProucts: builder.query({
      query: (params) => {
        const { category, ...queryParams } =
          typeof params === 'string' ? { category: params } : params || {};

        return {
          url: category
            ? `api/v1/shoppers/products/categories/${category}`
            : 'api/v1/shoppers/products/categories',
          method: 'GET',
          params: queryParams,
        };
      },
      providesTags: ['PRODUCT'],
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `api/v1/shoppers/products/${id}`,
        method: 'GET',
      }),
      providesTags: ['PRODUCT'],
    }),
    getProductsByCategory: builder.query({
      query: () => ({
        url: `products/category_limit`,
        method: 'GET',
      }),
      providesTags: ['PRODUCT'],
    }),

    addReview: builder.mutation({
      query: (data) => ({
        url: `review/add`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PRODUCT'],
    }),

    getReviews: builder.query({
      query: (id) => ({
        url: `review/item_code/${id}`,
        method: 'GET',
      }),
      providesTags: ['PRODUCT'],
    }),

    addToWishlist: builder.mutation({
      query: (data) => ({
        url: `api/shoppers/wishlist/add`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PRODUCT'],
    }),

    removeFromWishlist: builder.mutation({
      query: (data) => ({
        url: `wishlist/remove/${data.user_id}/${data.item_code}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PRODUCT'],
    }),

    getWishlist: builder.query({
      query: (id) => ({
        url: `wishlist/${id}`,
        method: 'GET',
      }),
      providesTags: ['PRODUCT'],
    }),

    getCategories: builder.query({
      query: () => ({
        url: `api/categories?sectionId=2`,
        method: 'GET',
      }),
      providesTags: ['PRODUCT'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProuctsQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useAddReviewMutation,
  useGetReviewsQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
  useGetCategoriesQuery,
} = productApi;
