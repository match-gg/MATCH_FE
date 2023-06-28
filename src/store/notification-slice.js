import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNotificationPermissioned: false,
  notiToken: '',
  foregroundMessages: {},
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // 알림 허용
    SET_NOTIFICATION_PERMISSIONED: (state, action) => {
      state.isNotificationPermissioned = true;
    },
    // 알림 거부
    SET_NOTIFICATION_DENIED: (state, action) => {
      state.isNotificationPermissioned = false;
    },
    // 토큰 저장
    SET_NOTITOKEN: (state, action) => {
      state.notiToken = action.payload;
    },
    // 토큰 삭제
    DELETE_NOTITOKEN: (state, action) => {
      state.notiToken = '';
    },
    // 포그라운드 메세지 추가
    // ADD_FOREGROUND_MSG: (state, action) => {
    //   state.foregroundMessages = [...state.foregroundMessages, action.payload];
    // },
    // // 포그라운드 메세지 전체 삭제
    // CLEAR_FOREGROUND_MSG: (state, _action) => {
    //   state.foregroundMessages = [];
    // },
    HANDLE_MSG: (state, action) => {
      const { roomId } = action.payload;
      if (state.foregroundMessages[roomId]) {
        state.foregroundMessages[roomId] = [
          action.payload,
          ...state.foregroundMessages[roomId],
        ];
      } else {
        state.foregroundMessages[roomId] = [action.payload];
      }
    },
    CLEAR_MSG_WITH_ID: (state, action) => {
      const { roomId } = action.payload;
      state.foregroundMessages[roomId] = [];
    },
    CLEAR_ALL_MSG: (state, action) => {
      // for (let id in state.foregroundMessages) {
      //   console.log(id);
      //   state.foregroundMessages[id] = [];
      // }
      state.foregroundMessages = {};
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
