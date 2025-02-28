/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

type AuthState = {
  userInfo: any | null;
  token: string | null;
  data: any;
};

const initialState: AuthState = {
  userInfo: null,
  token: null,
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { data, token } }: PayloadAction<{ data: any; token: any }>
    ) => {
      state.token = token;
      state.userInfo = data;
    },

    setUser: (state, { payload }: PayloadAction<any>) => {
      state.userInfo = payload;
    },

    updateUser: (state, { payload }: PayloadAction<any>) => {
      state.userInfo = { ...state.userInfo, ...payload };
    },

    setData: (state, { payload }: PayloadAction<any>) => {
      state.data = payload;
    },

    logOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem('persist:root');
      Cookies.remove('token');
      window.location.href = '/';
      return initialState;
    },
  },
});

export const { setCredentials, logOut, setUser, updateUser, setData } =
  authSlice.actions;

export default authSlice.reducer;
