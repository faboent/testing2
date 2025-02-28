import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const accountApi = createApi({
  reducerPath: 'accountApi',
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
  tagTypes: ['PROFILE'],
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `api/v1/users/me`,
        method: 'GET',
      }),
      providesTags: ['PROFILE'],
    }),

    updateprofile: builder.mutation({
      query: (data) => ({
        url: `users/updateUser`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PROFILE'],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `users/change-password`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PROFILE'],
    }),

    getShippingAddress: builder.query({
      query: (userId) => ({
        url: `shipping-address/${userId}`,
        method: 'GET',
      }),
      providesTags: ['PROFILE'],
    }),

    createShippingAddress: builder.mutation({
      query: (data) => ({
        url: `shipping-address/create`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PROFILE'],
    }),

    deleteShippingAddress: builder.mutation({
      query: ({ userId, shippingId }) => ({
        url: `shipping-address/delete/${userId}/${shippingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PROFILE'],
    }),

    updateShippingAddress: builder.mutation({
      query: ({ userId, shippingId, data }) => ({
        url: `shipping-address/update/${userId}/${shippingId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PROFILE'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateprofileMutation,
  useChangePasswordMutation,
  useGetShippingAddressQuery,
  useCreateShippingAddressMutation,
  useDeleteShippingAddressMutation,
  useUpdateShippingAddressMutation,
} = accountApi;
