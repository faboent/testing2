import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const warrantyApi = createApi({
  reducerPath: 'warrantyApi',
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
  tagTypes: ['WARRANTY'],
  endpoints: (builder) => ({
    checkWarranty: builder.mutation({
      query: (body) => ({
        url: 'warranty/check',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WARRANTY'],
    }),

    thirdPartyWarranty: builder.mutation({
      query: (body) => ({
        url: 'warranty/third-party',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WARRANTY'],
    }),

    applyWarranty: builder.mutation({
      query: (body) => ({
        url: 'warranty/claim',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WARRANTY'],
    }),

    getClaimedWarranty: builder.query({
      query: (userId) => ({
        url: `warranty/claimed/${userId}`,
        method: 'GET',
      }),
      providesTags: ['WARRANTY'],
    }),

    getActiveWarranty: builder.query({
      query: (userId) => ({
        url: `warranty/active/${userId}`,
        method: 'GET',
      }),
      providesTags: ['WARRANTY'],
    }),

    getExpiredWarranty: builder.query({
      query: (userId) => ({
        url: `warranty/expired/${userId}`,
        method: 'GET',
      }),
      providesTags: ['WARRANTY'],
    }),

    getWarrantyByImei: builder.query({
      query: () => ({
        url: `warranty/imei`,
        method: 'GET',
      }),
      providesTags: ['WARRANTY'],
    }),
  }),
});

export const {
  useCheckWarrantyMutation,
  useThirdPartyWarrantyMutation,
  useApplyWarrantyMutation,
  useGetClaimedWarrantyQuery,
  useGetActiveWarrantyQuery,
  useGetExpiredWarrantyQuery,
  useGetWarrantyByImeiQuery,
} = warrantyApi;
