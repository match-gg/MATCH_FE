import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNotificationPermissioned: false,
  notiToken: '',
  // notifications: {},
  isBadgeShow: false,
  lastReadTimestamp: 9999999999999,
  timestamps: {},
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
    // 알림 아이콘 출력
    SET_BADGE_SHOW_TRUE: (state, action) => {
      state.isBadgeShow = true;
    },
    // 알림 아이콘 제거
    SET_BADGE_SHOW_FALSE: (state, action) => {
      state.isBadgeShow = false;
    },
    // 최근 chatRoom의 마지막 활동 timestamp
    SET_LAST_READ_TIMESTAMP: (state, action) => {
      state.lastReadTimestamp = action.payload;
    },
    // 각 채팅방 별 마지막 활동 timestamp
    SET_TIMESTAMPS: (state, action) => {
      const { chatRoomId, timestamp } = action.payload;
      state.timestamps[chatRoomId] = timestamp;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
