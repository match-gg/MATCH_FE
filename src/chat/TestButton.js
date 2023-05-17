import { Button } from '@mui/material';
import { child, get, getDatabase, ref, update } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../api/api';
import { chatRoomActions } from '../store/chatRoom-slice';

const TestButton = () => {
  // const target = useSelector((state) => state.games['lol']);

  const dispatch = useDispatch();

  const leaveChatRoom = async () => {
    const targetMember = 'minggurazi';

    //서버에 알려주기

    // 파이어베이스 채팅방의 members에 접근해서 닉네임 지우기
    const members = [];
    const chatRoomRef = ref(getDatabase(), 'chatrooms');
    await get(child(chatRoomRef, '-NT9iLlCfHtYX6VnE3MR/members'))
      .then((datasnapshot) => members.push(...datasnapshot.val()))
      .then(async () => {
        const removedArr = members.filter((member) => member !== targetMember);
        await update(ref(getDatabase(), 'chatrooms/-NT9iLlCfHtYX6VnE3MR'), {
          members: [...removedArr],
        });
      })
      // 리덕스에서 지우기
      .then(() =>
        dispatch(chatRoomActions.LEAVE_JOINED_CHATROOM('-NT9iLlCfHtYX6VnE3MR'))
      )
      .catch((error) => console.log(error));
  };

  const addChatRoom = () => {
    dispatch(chatRoomActions.ADD_JOINED_CHATROOM('-NT9iLlCfHtYX6VnE3MR'));
  };

  const addUser = async () => {
    const newMember = 'testUser2';
    //서버에 데이터 전송

    //파이어베이스의 해당 채팅방에 유저 추가
    const currentMembers = [];
    const chatRoomRef = ref(getDatabase(), 'chatrooms');
    await get(child(chatRoomRef, '-NT9iLlCfHtYX6VnE3MR/members'))
      .then((datasnapshot) => currentMembers.push(...datasnapshot.val()))
      .then(async () => {
        await update(ref(getDatabase(), 'chatrooms/-NT9iLlCfHtYX6VnE3MR'), {
          members: [...currentMembers, newMember],
        });
      })
      //내 리덕스에 채팅방 id 추가
      .then(() => dispatch(chatRoomActions.ADD_JOINED_CHATROOM('테스트성공')))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Button variant='outlined' onClick={leaveChatRoom}>
        채팅방 나가기
      </Button>
      <Button variant='outlined' onClick={addUser}>
        사용자 추가
      </Button>
    </>
  );
};

export default TestButton;
