import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNotificationPermissioned: false,
  notiToken: '',
  notifications: {},
  isBadgeShow: false,
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
    SET_NOTIFICATIONS: (state, action) => {
      const {
        chatRoomId,
        message: notification,
        currentChatRoom,
      } = action.payload;

      // currentChatRoom에는 noti가 저장 안되도록
      // if (chatRoomId === currentChatRoom) {
      //   console.log('같음');
      //   return;
      // }

      if (state.notifications[chatRoomId]) {
        state.notifications[chatRoomId] = [
          notification,
          ...state.notifications[chatRoomId],
        ];
      } else {
        state.notifications[chatRoomId] = [notification];
      }
    },
    REMOVE_NOTIFICATIONS: (state, action) => {
      state.notifications[action.payload] = [];
    },
    REMOVE_ALL_NOTIFICATIONS: (state, action) => {
      state.notifications = {};
    },
    SET_BADGE_SHOW_TRUE: (state, action) => {
      state.isBadgeShow = true;
    },
    SET_BADGE_SHOW_FALSE: (state, action) => {
      state.isBadgeShow = false;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
