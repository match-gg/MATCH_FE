import { Button } from '@mui/material';
import React from 'react';
import { api } from '../../../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { child, get, getDatabase, ref, update } from 'firebase/database';
import { chatRoomActions } from '../../../store/chatRoom-slice';

const LeavePatryButton = (props) => {
  // game, chatRoomId, id, targetMember를 props로 받아와야함
  const { game, chatRoomId, id } = props;
  const nickname = useSelector((state) => state.user.nickname);
  const oauth2Id = useSelector((state) => state.user.oauth2Id);
  const targetMember = {
    nickname,
    oauth2Id,
  };
  //토큰
  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  const dispatch = useDispatch();

  const removeFirebaseRDB = async (targetMember, chatRoomId) => {
    const chatRoomRef = ref(getDatabase(), 'chatRooms');
    await get(child(chatRoomRef, `${chatRoomId}/memberList`))
      .then(async (datasnapshot) => {
        const prevMemberList = [...datasnapshot.val()];
        const removedMemberList = prevMemberList.filter((member) => {
          return member.oauth2Id !== targetMember.oauth2Id;
        });
        await update(ref(getDatabase(), `chatRooms/${chatRoomId}`), {
          memberList: removedMemberList,
        }).then(() =>
          dispatch(chatRoomActions.LEAVE_JOINED_CHATROOM(chatRoomId))
        );
      })
      .catch((error) => console.log(error));
  };

  const leaveParty = async () => {
    //서버에 파티 탈퇴 전송
    await api
      .delete(`/api/chat/${game}/${id}/${targetMember.oauth2Id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          //파이어베이스의 Realtime DB에서 제거, 리덕스에서 채팅방 아이디 제거
          removeFirebaseRDB(targetMember, chatRoomId);
        }
      });
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
      onClick={leaveParty}
    >
      파티 탈퇴
    </Button>
  );
};

export default LeavePatryButton;
