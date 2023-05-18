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
    ADD_JOINED_CHATROOM: (state, action) => {
      state.joinedChatRooms = [...state.joinedChatRooms, action.payload];
    },
    LEAVE_JOINED_CHATROOM: (state, action) => {
      state.joinedChatRooms = state.joinedChatRooms.filter(
        (chatroom) => chatroom !== action.payload
      );
    },
    INIT_JOINED_CHATROOM: (state, _action) => {
      state.joinedChatRooms = [];
    },
  },
});

export const chatRoomActions = chatRoomSlice.actions;

export default chatRoomSlice;
