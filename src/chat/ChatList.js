import React, { useEffect, useState } from 'react';

import { Box, Skeleton, Stack, Typography, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import ChatCard from './ChatCard';
import ChatRoom from './ChatRoom';

import { useSelector, useDispatch } from 'react-redux';
import { getDatabase, off, onChildAdded, ref } from 'firebase/database';
import { chatRoomActions } from '../store/chatRoom-slice';
import { api } from '../api/api';

const ChatList = (props) => {
  const joinedChatRooms = useSelector(
    (state) => state.chatRoom.joinedChatRooms
  );
  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  //채팅방 리스트
  const [chatRooms, setChatRooms] = useState([]);

  //파이어베이스 - 실시간 데이터베이스 - 채팅방 Ref
  const chatRoomsRef = ref(getDatabase(), 'chatrooms');

  //채팅방 불러오기 + 채팅방이 추가될 때 파이어베이스에서 최신 정보 가져오기
  const addChatRoomsListener = () => {
    const chatRoomsArray = [];
    onChildAdded(chatRoomsRef, (DataSnapshot) => {
      chatRoomsArray.push(DataSnapshot.val());
      setChatRooms([...chatRoomsArray]);
      setLoading(false);
    });
  };
  //컴포넌트 렌더링 시 리스너 연결, 컴포넌트 사라질 때 연결 종료
  useEffect(() => {
    addChatRoomsListener();
    return () => {
      off(chatRoomsRef);
    };
  }, []);

  const { open, handleOpen } = props;

  const [chatOpen, setChatOpen] = useState(false);
  const [header, setHeader] = useState('현재 참여중인 파티');

  const handleChatOpen = (name) => {
    setChatOpen(true);
    setHeader(`${name} 님의 파티`);
  };

  const closeChatOpen = () => {
    dispatch(chatRoomActions.SET_CURRENT_CHATROOM(null));
    setChatOpen(false);
    setHeader('현재 참여중인 파티');
  };

  useEffect(() => {
    const getChatRooms = async () => {
      await api
        .get(`/api/chat/rooms`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken,
          },
        })
        .catch((error) => console.log(error))
        .then((response) => {
          response.data.chatRoomList.forEach((item, _index) => {
            dispatch(chatRoomActions.ADD_JOINED_CHATROOM(item.chatRoomId));
          });
        });
    };

    getChatRooms();
  }, []);

  return (
    <Zoom in={open}>
      <Box
        sx={{
          display: open ? 'block' : 'none',
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          minWidth: '350px',
          height: '600px',
          boxSizing: 'border-box',
          boxShadow: 10,
          backgroundColor: 'rgba(247, 247, 248, 0.9)',
          backdropFilter: 'blur(60px)',
          borderRadius: '30px',
          zIndex: '100',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {/* 헤더 */}
          <Box
            sx={{
              width: '100%',
              height: '50px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <NavigateBeforeIcon
              sx={{
                cursor: 'pointer',
                display: chatOpen ? 'block' : 'none',
                position: 'absolute',
                left: '20px',
                color: '#3c3939',
                '&:hover': {
                  borderRadius: '5px',
                  backgroundColor: 'rgba(60, 57, 57, 0.5)',
                  color: 'white',
                },
              }}
              onClick={closeChatOpen}
            />
            <Typography sx={{ fontWeight: 'bold', color: '#3c3939' }}>
              {header}
            </Typography>
            <CloseIcon
              sx={{
                cursor: 'pointer',
                position: 'absolute',
                right: '20px',
                color: '#3c3939',
                '&:hover': {
                  borderRadius: '5px',
                  backgroundColor: 'rgba(60, 57, 57, 0.5)',
                  color: 'white',
                },
              }}
              onClick={() => {
                handleOpen();
                closeChatOpen();
              }}
            />
          </Box>
          {/* 컨텐츠 */}
          {/* 나중에 현재 참여중인 파티 뿌려줘야함 일단은 테스트 컴포넌트 */}
          {chatOpen ? (
            <ChatRoom closeChatOpen={closeChatOpen} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                maxHeight: '530px',
                overflowY: 'auto',
              }}
            >
              {!loading ? (
                chatRooms
                  .filter((chatroom) =>
                    joinedChatRooms.includes(chatroom.roomId)
                  )
                  .map((filteredChatRoom, idx) => {
                    return (
                      <ChatCard
                        chatRoomInfo={filteredChatRoom}
                        key={idx}
                        name={filteredChatRoom.createdBy}
                        handleChatOpen={handleChatOpen}
                      />
                    );
                  })
              ) : (
                <Stack spacing={1}>
                  <Skeleton variant='rounded' width={250} height={80} />
                  <Skeleton variant='rounded' width={250} height={80} />
                  <Skeleton variant='rounded' width={250} height={80} />
                  <Skeleton variant='rounded' width={250} height={80} />
                </Stack>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Zoom>
  );
};

export default ChatList;
