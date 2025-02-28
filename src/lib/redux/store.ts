import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { accountApi } from './services/account.service';
import { authApi } from './services/auth.service';
import { brandApi } from './services/brand.service';
import { cartApi } from './services/cart.service';
import { orderApi } from './services/order.service';
import { productApi } from './services/product.service';
import { shipmentApi } from './services/shipment.service';
import { walletApi } from './services/wallet.service';
import { warrantyApi } from './services/warranty.service';
import authReducer from './slices/authSlice';
import filterReducer from './slices/filterSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'filter'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  [authApi.reducerPath]: authApi.reducer,
  [accountApi.reducerPath]: accountApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [shipmentApi.reducerPath]: shipmentApi.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [warrantyApi.reducerPath]: warrantyApi.reducer,
  [brandApi.reducerPath]: brandApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
  reducer: {
    app: persistedReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [shipmentApi.reducerPath]: shipmentApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [warrantyApi.reducerPath]: warrantyApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      authApi.middleware,
      accountApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
      productApi.middleware,
      shipmentApi.middleware,
      walletApi.middleware,
      warrantyApi.middleware,
      brandApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
