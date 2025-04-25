import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/crypto/cryptoSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {crypto: CryptoState}
export type AppDispatch = typeof store.dispatch; 