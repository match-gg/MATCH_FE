import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  nickname: '',
  isLogin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER :(state, action) => {
      state.username = action.payload.username;
      state.nickname = action.payload.nickname;
      state.isLogin = true;
    },
    DELETE_USER : (state, action) => {
      state.username = '';
      state.nickname = '';
      state.isLogin = false;
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice;
