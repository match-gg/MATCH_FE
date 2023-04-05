import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authenticated: false,
  accessToken: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
    },
    DELETE_TOKEN: (state, _) => {
      state.authenticated = false;
      state.accessToken = null;
    },
  },
});

export const tokenActions = tokenSlice.actions;

export default tokenSlice;
