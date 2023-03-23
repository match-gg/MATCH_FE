import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import userSlice from './user-slice';
import tokenSlice from './token-slice';
import registerSlice from './register-slice';

const reducers = combineReducers({
  user: userSlice.reducer,
  token: tokenSlice.reducer,
  register: registerSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'token','register'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
