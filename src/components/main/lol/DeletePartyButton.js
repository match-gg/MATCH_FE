import { Button } from '@mui/material';
import { ref, getDatabase, update } from 'firebase/database';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api/api';
import { chatRoomActions } from '../../../store/chatRoom-slice';

const DeletePartyButton = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chatRoomId, game, id } = props;

  //토큰
  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  //서버에 알리기
  const deleteParty = async () => {
    await api
      .delete(`/api/${game}/board/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken,
        },
      })
      .then(async (response) => {
        if (response.status === 200) {
          //Firebase Realtime DB의 isDeleted 를 true로 설정
          await update(ref(getDatabase(), `chatRooms/${chatRoomId}`), {
            isDeleted: true,
          })
            .then(() => {
              dispatch(chatRoomActions.LEAVE_JOINED_CHATROOM(chatRoomId));
            })
            .then(() => navigate(0))
            .catch((error) => console.log(error));
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
        height: 40,
        borderColor: '#CCCCCC',
        color: '#5C5C5C',
        fontWeight: 700,
        ':hover': {
          borderColor: '#dddddd',
          backgroundColor: '#f3f3f3',
        },
      }}
      onClick={deleteParty}
    >
      게시글 삭제
    </Button>
  );
};

export default DeletePartyButton;
