import React from 'react';

import { Button } from '@mui/material';
import { getDatabase, ref, push, update, child } from 'firebase/database';
// import fdb from '../firebase';

import { useSelector } from 'react-redux';

const CreateChatroomBtn = () => {
  const user = useSelector((state) => state.user);

  const createChatroom = async () => {
    const chatroomRef = ref(getDatabase(), 'chatrooms');
    const key = push(chatroomRef).key;
    const newChatroom = {
      roomId: key,
      // createdBy : user.nickname,
      createdBy: 'testUser3',
      timestamp: new Date(),
      game: 'lol',
      members: ['testUser3, testUser4'],
    };
    try {
      await update(child(chatroomRef, key), newChatroom);
      console.log('create chatroom success');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant='outlined' onClick={createChatroom}>
      채팅방만들기
    </Button>
  );
};

export default CreateChatroomBtn;
