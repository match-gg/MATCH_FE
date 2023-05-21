import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nickname: '', // 카카오톡 닉네임
  oauth2Id: '', // kakao oauth id
  profile_imageUrl: '', // 카카오톡 프로필 이미지
  representative: '', // 대표게임
  games: {
    lol: '',        // 롤 소환사명
    valorant: '',   // 발로란트 닉네임
    pubg: '',       // 배틀그라운드 유저네임
    overwatch: '',  // 오버워치 사용자이름+배틀태그
    lostark: '',    // 로스트아크 닉네임
  },
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
      state.oauth2Id = action.payload.oauth2Id
      state.isLogin = true;
    },
    SET_REPRESENTATIVE: (state, action) => {
      state.representative = action.payload.representative;
    },
    SET_GAMES: (state, action) => {
      state.games = action.payload;
    },
    SET_GAMES_WITH_ID: (state, action) => {
      state.games[action.payload.id] = action.payload.value;
    },
    DELETE_USER: (state, _action) => {
      state.nickname = '';
      state.profile_imageUrl = '';
      state.representative = '';
      state.isLogin = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
