import { createSlice } from '@reduxjs/toolkit';

const initialChatroomState = {
  currentChatRoom: null,
  joinedChatRooms: [''],
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
    ADD_JOINED_CHATROOM: (state, action) => {
      state.joinedChatRooms = [...state.joinedChatRooms, action.payload];
    },
    LEAVE_JOINED_CHATROOM: (state, action) => {
      state.joinedChatRooms = state.joinedChatRooms.filter(
        (chatroom) => chatroom !== action.payload
      );
    },
    REMOVE_ALL_JOINED_CHATROOM: (state, _action) => {
      state.joinedChatRooms = [];
    },
  },
});

export const chatRoomActions = chatRoomSlice.actions;

export default chatRoomSlice;
