import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notiToken: '',
  foregroundMessages: [],
  backgroundMessages: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // 토큰 저장
    SET_NOTITOKEN: (state, action) => {
      state.notiToken = action.payload;
    },
    // 토큰 삭제
    DELETE_NOTITOKEN: (state, action) => {
      state.notiToken = '';
    },
    // 포그라운드 메세지 추가
    ADD_FOREGROUND_MSG: (state, action) => {
      state.foregroundMessages = [...state.foregroundMessages, action.payload];
    },
    // 포그라운드 메세지 삭제
    // 메세지 별로 id가 있다는 가정 하에 id로 삭제
    DELETE_FOREGROUND_MSG: (state, action) => {
      state.foregroundMessages = [
        ...state.foregroundMessages.filter(
          (msg) => msg.id !== action.payload.id
        ),
      ];
    },
    // 포그라운드 메세지 전체 삭제
    CLEAR_FOREGROUND_MSG: (state, _action) => {
      state.foregroundMessages = [];
    },
    // 백그라운드 메세지 추가
    ADD_BACKGROUND_MSG: (state, action) => {
      state.backgroundMessages = [...state.backgroundMessages, action.payload];
    },
    // 백그라운드 메세지 삭제
    // 메세지별로 id가 있다는 가정 하에 id로 삭제
    DELETE_BACKGROUND_MSG: (state, action) => {
      state.backgroundMessages = [
        ...state.backgroundMessages.filter(
          (msg) => msg.id !== action.payload.id
        ),
      ];
    },
    // 백그라운드 메세지 전체 삭제
    CLEAR_BACKGROUND_MSG: (state, action) => {
      state.backgroundMessages = [];
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
