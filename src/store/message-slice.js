import { createSlice } from '@reduxjs/toolkit';

const initialMessagesState = {
  messages: {},
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initialMessagesState,
  reducers: {
    SET_MESSAGES: (state, action) => {
      const { chatRoomId, message } = action.payload;
      // 각 채팅방의 메세지 저장
      if (state.messages[chatRoomId]) {
        state.messages[chatRoomId] = [...state.messages[chatRoomId], message];
      } else {
        state.messages[chatRoomId] = [message];
      }
    },
  },
});

export const messagesActions = messagesSlice.actions;

export default messagesSlice;
