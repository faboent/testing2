/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  filter: any;
  pagination: any;
};

const initialState: AuthState = {
  filter: {
    type: null,
    location: null,
    priceRange: null,
    bedrooms: null,
    bathrooms: null,
    isFurnished: null,
    isServiced: null,
  },
  pagination: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<any>) => {
      state.filter = payload;
    },
    setPagination: (state, { payload }: PayloadAction<any>) => {
      state.pagination = payload;
    },
  },
});

export const { setFilter, setPagination } = filterSlice.actions;

export default filterSlice.reducer;
