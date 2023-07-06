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
