import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const walletApi = createApi({
  reducerPath: 'walletApi',
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
  tagTypes: ['WALLET'],
  endpoints: (builder) => ({
    startWalletTransaction: builder.mutation({
      query: (body) => ({
        url: 'wallets/start',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WALLET'],
    }),

    completeWalletTransaction: builder.mutation({
      query: ({ body, user_id }) => ({
        url: `wallets/complete/${user_id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['WALLET'],
    }),

    getWalletBalance: builder.query({
      query: (userId) => ({
        url: `wallets/get-balance/${userId}`,
        method: 'GET',
      }),
      providesTags: ['WALLET'],
    }),

    getWalletTransactions: builder.query({
      query: () => ({
        url: `transactions/me`,
        method: 'GET',
      }),
      providesTags: ['WALLET'],
    }),
  }),
});

export const {
  useStartWalletTransactionMutation,
  useCompleteWalletTransactionMutation,
  useGetWalletBalanceQuery,
  useGetWalletTransactionsQuery,
} = walletApi;
