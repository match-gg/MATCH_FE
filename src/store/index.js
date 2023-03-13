import { configureStore } from '@reduxjs/toolkit';

import userSlice from './user-slice';
import tokenSlice from './token-slice';
import registerSlice from './register-slice';

const store = configureStore({
  reducer: { user: userSlice.reducer, token: tokenSlice.reducer, register: registerSlice.reducer },
});

export default store;
