import { createSlice } from '@reduxjs/toolkit';

const initialChatroomState = {
  currentChatRoom: null,
  //로그인 성공 시  서버에서 가입되어있는 채팅방에 대한 정보를 가져와야함
  joinedChatRooms: ['-NT4hkTqGn02tAzZtFjx'],
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
  },
});

export const chatRoomActions = chatRoomSlice.actions;

export default chatRoomSlice;
