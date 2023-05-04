import React from 'react';

import { Button } from '@mui/material';
import { getDatabase, ref, push, update, child } from 'firebase/database';
// import fdb from '../firebase';

import { useDispatch, useSelector } from 'react-redux';
import { chatRoomActions } from '../store/chatRoom-slice';

//테스트용 컴포넌트임
//기능 구현 끝나면 삭제해야함
const CreateChatroomBtn = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const createChatroom = async () => {
    const chatroomRef = ref(getDatabase(), 'chatrooms');
    const key = push(chatroomRef).key;
    const newChatroom = {
      roomId: key,
      createdBy: user.nickname,
      timestamp: new Date(),
      //해당 게임으로 수정해야함
      game: 'lol',
    };
    try {
      await update(child(chatroomRef, key), newChatroom);
    } catch (error) {
      console.log(error);
    }
  };

  const joinChatRoom = () => {
    //카드 상세보기 컴포넌트에서 채팅방에 대한 아이디값을 가져와서 dispatch 함수의 ADD_JOINED_CHATROOM에 string 형식으로 전달해야함
    dispatch(chatRoomActions.ADD_JOINED_CHATROOM('-NT9iLlCfHtYX6VnE3MR'));
  };

  return (
    <Button variant='outlined' onClick={joinChatRoom}>
      채팅방 입장
    </Button>
  );
};

export default CreateChatroomBtn;
