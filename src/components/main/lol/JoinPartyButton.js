import React from 'react';
import { Button } from '@mui/material';
import { api } from '../../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { ref, child, get, getDatabase, update } from 'firebase/database';
import { chatRoomActions } from '../../../store/chatRoom-slice';

const JoinPartyButton = (props) => {
  //game, chatRoomId, id를 props로 받아와야함
  // const {game, chatRoomId, id, newMember} = props;
  //테스트용 데이터
  const game = 'lol';
  const chatRoomId = '-NVooseMj-whfjWw4gua';
  const { id } = props;
  const newMember = {
    nickname: '테스트용닉네임',
    oauth2Id: 'kakaoTest123',
  };

  //토큰
  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');
  const dispatch = useDispatch();

  const addFirebaseRDB = async (newMember, chatRoomId) => {
    const chatRoomRef = ref(getDatabase(), 'chatRooms');
    await get(child(chatRoomRef, chatRoomId))
      .then(async (datasnapshot) => {
        const prevMemberList = [];
        prevMemberList.push(...datasnapshot.val().memberList);
        const joinedMemberList = [...prevMemberList, newMember];
        await update(ref(getDatabase(), `chatRooms/${chatRoomId}`), {
          memberList: joinedMemberList,
        }).then(() =>
          dispatch(chatRoomActions.ADD_JOINED_CHATROOM(chatRoomId))
        );
      })
      .catch((error) => console.log(error));
  };
  const joinParty = async () => {
    //서버에 파티 참가 전송
    await api
      .post(`/api/chat/${game}/${id}/member`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          //파이어베이스의 Realtime DB에 추가, 리덕스에 채팅방 아이디 저장
          addFirebaseRDB(newMember, chatRoomId);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Button
      variant='outlined'
      size='small'
      sx={{
        p: 1,
        mt: 1,
        borderColor: '#CCCCCC',
        color: '#5C5C5C',
        fontWeight: 700,
        ':hover': {
          borderColor: '#dddddd',
          backgroundColor: '#f3f3f3',
        },
      }}
      // onClick={joinParty}
      onClick={() => addFirebaseRDB(newMember, chatRoomId)}
    >
      파티 참가
    </Button>
  );
};

export default JoinPartyButton;
