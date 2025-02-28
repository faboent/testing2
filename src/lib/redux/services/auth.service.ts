import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '../baseUrl';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `api/auth/sign-in`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    register: builder.mutation({
      query: (body) => ({
        url: `api/auth/sign-up`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    verifyEmail: builder.mutation({
      query: (body) => ({
        url: `api/auth/verify-otp`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          email: body.email,
          otp: body.otp,
        },
      }),
      invalidatesTags: ['Auth'],
    }),

    resendVerifyCode: builder.mutation({
      query: (body) => ({
        url: `api/auth/resend-otp`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    requestResetPassword: builder.mutation({
      query: (body) => ({
        url: `api/auth/reset-password`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Auth'],
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: `users/reset-password-forgotten`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendVerifyCodeMutation,
  useRequestResetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
