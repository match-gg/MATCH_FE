import { createSlice } from '@reduxjs/toolkit';

const TOKEN_TIME_OUT = 600 * 1000;

const initialState = {
  authenticated: false,
  accessToken: null,
  expireTime: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_TOKEN: (state, _) => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
});

export const tokenActions = tokenSlice.actions;

export default tokenSlice;
