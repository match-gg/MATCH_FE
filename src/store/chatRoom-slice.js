import { createSlice } from '@reduxjs/toolkit';

const initialChatroomState = {
  currentChatRoom: null,
  joinedChatRoomsId: [],
};

const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState: initialChatroomState,
  reducers: {
    SET_CURRENT_CHATROOM: (state, action) => {
      state.currentChatRoom = action.payload;
    },
    REMOVE_CURRENT_CHATROOM: (state, _action) => {
      state.currentChatRoom = null;
    },
    ADD_JOINED_CHATROOMS_ID: (state, action) => {
      state.joinedChatRoomsId = [...state.joinedChatRoomsId, action.payload];
    },
    LEAVE_JOINED_CHATROOMS_ID: (state, action) => {
      state.joinedChatRoomsId = state.joinedChatRoomsId.filter(
        (chatroomId) => chatroomId !== action.payload
      );
    },
    REMOVE_ALL_JOINED_CHATROOMS_ID: (state, _action) => {
      state.joinedChatRoomsId = [];
    },
  },
});

export const chatRoomActions = chatRoomSlice.actions;

export default chatRoomSlice;
