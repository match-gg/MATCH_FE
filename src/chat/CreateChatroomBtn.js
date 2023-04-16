import React from 'react';

import { Button } from '@mui/material';
import { getDatabase, ref, push, update, child } from 'firebase/database';
// import fdb from '../firebase';

import { useDispatch } from 'react-redux';
import { chatRoomActions } from '../store/chatRoom-slice';

const CreateChatroomBtn = () => {
  const dispatch = useDispatch();

  const createChatroom = async () => {
    const chatroomRef = ref(getDatabase(), 'chatrooms');
    const key = push(chatroomRef).key;
    const newChatroom = {
      roomId: key,
      // createdBy : user.nickname,
      createdBy: 'testUser3',
      timestamp: new Date(),
      game: 'lol',
    };
    try {
      await update(child(chatroomRef, key), newChatroom);
      console.log('create chatroom success');
    } catch (error) {
      console.log(error);
    }
  };

  const joinChatRoom = () => {
    dispatch(chatRoomActions.ADD_JOINED_CHATROOM('-NT9iLlCfHtYX6VnE3MR'));
  };

  return (
    <Button variant='outlined' onClick={joinChatRoom}>
      채팅방 입장
    </Button>
  );
};

export default CreateChatroomBtn;
