import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const brandApi = createApi({
  reducerPath: 'brandApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).app.auth;
      headers.set('authorization', `Bearer ${token}`);
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['BRAND'],
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: `api/banners/web/all`,
        method: 'GET',
      }),
      providesTags: ['BRAND'],
    }),

    getBrand: builder.query({
      query: (brandId) => ({
        url: `brand/single/${brandId}`,
        method: 'GET',
      }),
      providesTags: ['BRAND'],
    }),
  }),
});

export const { useGetBrandsQuery, useGetBrandQuery } = brandApi;
