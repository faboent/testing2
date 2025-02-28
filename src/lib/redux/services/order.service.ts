import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const orderApi = createApi({
  reducerPath: 'orderApi',
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
  tagTypes: ['ORDER'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `orders/create`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ORDER'],
    }),

    getOrders: builder.query({
      query: (id) => ({
        url: `orders/${id}`,
        method: 'GET',
      }),
      providesTags: ['ORDER'],
    }),

    updateOrder: builder.mutation({
      query: (data) => ({
        url: `orders/update`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ORDER'],
    }),

    deleteOrder: builder.mutation({
      query: (data) => ({
        url: `orders/delete/${data.userId}/${data.orderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ORDER'],
    }),

    payForOrder: builder.mutation({
      query: (data) => ({
        url: `orders/pay-for-order/${data.orderId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ORDER'],
    }),

    getShippingCost: builder.mutation({
      query: (data) => ({
        url: `shipments/shipping-cost`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ORDER'],
    }),

    createShipment: builder.mutation({
      query: (data) => ({
        url: `shipments/create-shipment`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ORDER'],
    }),

    getOrder: builder.query({
      query: ({ orderId, userId }) => ({
        url: `orders/single/${userId}/${orderId}`,
        method: 'GET',
      }),
      providesTags: ['ORDER'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  usePayForOrderMutation,
  useGetShippingCostMutation,
  useCreateShipmentMutation,
  useGetOrderQuery,
} = orderApi;
