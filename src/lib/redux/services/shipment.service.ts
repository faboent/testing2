import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';
import type { RootState } from '../store';

export const shipmentApi = createApi({
  reducerPath: 'shipmentApi',
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
  tagTypes: ['SHIPMENT'],
  endpoints: (builder) => ({
    getShippingCost: builder.mutation({
      query: (data) => ({
        url: `shipments/shipping-cost`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SHIPMENT'],
    }),

    createShipment: builder.mutation({
      query: (data) => ({
        url: `shipments/create-shipment`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SHIPMENT'],
    }),

    updateShipmentStatus: builder.mutation({
      query: (data) => ({
        url: `shipments/update-status/${data.order_id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['SHIPMENT'],
    }),

    trackShipment: builder.query({
      query: (order_id) => ({
        url: `shipments/track/${order_id}`,
        method: 'GET',
      }),
      providesTags: ['SHIPMENT'],
    }),
  }),
});

export const {
  useGetShippingCostMutation,
  useCreateShipmentMutation,
  useUpdateShipmentStatusMutation,
  useTrackShipmentQuery,
} = shipmentApi;
