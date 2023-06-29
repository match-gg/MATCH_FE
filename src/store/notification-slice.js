import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNotificationPermissioned: false,
  notiToken: '',
  inChatRoom: false,
  messagesForNoti: {},
  lastIndex: {},
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
    SET_IN_CHAT_ROOM_TRUE: (state, action) => {
      state.inChatRoom = true;
    },
    SET_IN_CHAT_ROOM_FALSE: (state, action) => {
      state.inChatRoom = false;
    },
    ADD_MESSAGE: (state, action) => {
      if (state.messagesForNoti[action.payload.chatRoomId]) {
        state.messagesForNoti[action.payload.chatRoomId] = [
          ...new Set([
            ...state.messagesForNoti[action.payload.chatRoomId],
            action.payload.message,
          ]),
        ];
      } else {
        state.messagesForNoti[action.payload.chatRoomId] = [
          action.payload.message,
        ];
      }
      state.lastIndex[action.payload.chatRoomId] = 0;
    },
    REMOVE_MESSAGES: (state, action) => {
      state.messagesForNoti[action.payload.chatRoomId] = [];
      // state.lastIndex[action.payload.chatRoomId] = action.payload.lastIndex;
    },
    REMOVE_ALL_MESSAGES: (state, action) => {
      state.messagesForNoti = {};
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
