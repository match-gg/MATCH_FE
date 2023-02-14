import { configureStore } from '@reduxjs/toolkit';

import userSlice from './user-slice';
import tokenSlice from './token-slice';

const store = configureStore({
  reducer: { user: userSlice.reducer, token: tokenSlice.reducer },
});

export default store;
