import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickname: '',
  profile_imageUrl: '',
  representative: '',
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, action) => {
      state.nickname = action.payload.nickname;
      state.profile_imageUrl = action.payload.profile_imageUrl;
      state.representative = action.payload.representative;
      state.isLogin = true;
    },
    SET_REPRESENTATIVE: (state, action) => {
      state.representative = action.payload.representative;
    },
    DELETE_USER: (state, action) => {
      state.nickname = '';
      state.profile_imageUrl = '';
      state.representative = '';
      state.isLogin = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
