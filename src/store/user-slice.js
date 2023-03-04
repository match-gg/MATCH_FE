import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickname: '',
  thumbnail_url: '',
  isLoggedIn: false,
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      state.nickname = action.payload.nickname;
      state.thumbnail_url = action.payload.thumbnail_url;
      state.isLoggedIn = true;
      state.isAdmin = action.payload.isAdmin;
    },
    DELETE_USER: (state, _action) => {
      state.nickname = '';
      state.thumbnail_url = '';
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
