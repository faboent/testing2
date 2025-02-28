import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).app.auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['CART'],
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: `api/v1/cart/add`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CART'],
    }),

    getCart: builder.query({
      query: (id) => ({
        url: `cart/${id}`,
        method: 'GET',
      }),
      providesTags: ['CART'],
    }),

    updateCart: builder.mutation({
      query: (data) => ({
        url: `cart/update`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['CART'],
    }),

    removeFromCart: builder.mutation({
      query: (data) => ({
        url: `cart/delete/${data.userId}/${data.itemCode}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CART'],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
