import { Button } from '@mui/material';
import { getDatabase, ref } from 'firebase/database';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { chatRoomActions } from '../store/chatRoom-slice';

const TestButton = () => {
  const dispatch = useDispatch();

  const chatRoomRef = ref(getDatabase(), 'chatrooms');
  const members = [];
  useEffect(() => {});
  const leaveChatRoom = () => {
    // 혼자 나가기
    // 해당 채팅방의 members에 접속해서 닉네임 지우는 작업
    // + 리덕스에서 지우기
    dispatch(chatRoomActions.LEAVE_JOINED_CHATROOM('-NT9iLlCfHtYX6VnE3MR'));
  };

  const undoFunc = () => {
    dispatch(chatRoomActions.ADD_JOINED_CHATROOM('-NT9iLlCfHtYX6VnE3MR'));
  };

  return (
    <>
      <Button variant='outlined' onClick={leaveChatRoom}>
        채팅방 나가기
      </Button>
      <Button variant='outlined' onClick={undoFunc}>
        실수함ㅋ
      </Button>
    </>
  );
};

export default TestButton;
