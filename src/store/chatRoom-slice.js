import { createSlice } from '@reduxjs/toolkit';

const initialChatroomState = {
  currentChatroom: null,
  // createdBy: {
  //   id: '',
  //   name: '',
  // },
  // roomId: '',
  // timestamp: null,
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState: initialChatroomState,
  reducers: {
    SET_CURRENT_CHATROOM: (state, action) => {
      state.currentChatroom = action.payload;
    },
  },
});

export const chatRoomActions = chatRoomSlice.actions;

export default chatRoomSlice;
