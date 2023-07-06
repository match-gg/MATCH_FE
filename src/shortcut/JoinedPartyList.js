import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Skeleton, Stack, Typography, Zoom } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { getDatabase, off, onChildAdded, ref } from 'firebase/database';

import JoinedPartyCard from './JoinedPartyCard';

const JoinedPartyList = (props) => {
  //handleOpen이 ChatList 닫는 함수
  const { open, handleOpen } = props;

  //리덕스에 저장되어있는 내가 가입한 채팅방 Id 리스트
  const { joinedChatRoomsId } = useSelector((state) => state.chatRoom);

  //로딩중 관리 state
  const [loading, setLoading] = useState(true);

  //채팅방 리스트
  const [chatRooms, setChatRooms] = useState([]);

  //파이어베이스
  const chatRoomsRef = ref(getDatabase(), 'chatRooms');
  //채팅방 불러오기 (리스너 함수)
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

  return (
    <Zoom in={open}>
      <Box
        sx={{
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
            <Typography sx={{ fontWeight: 'bold', color: '#3c3939' }}>
              {'현재 참여중인 파티'}
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
              }}
            />
          </Box>
          {/* 컨텐츠 */}
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
                .filter(
                  (chatroom) =>
                    joinedChatRoomsId.includes(chatroom.key) &&
                    chatroom.isDeleted === false
                )
                .map((filteredChatRoom, _idx) => {
                  return (
                    <JoinedPartyCard
                      chatRoomInfo={filteredChatRoom}
                      key={filteredChatRoom.roomId}
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
        </Box>
      </Box>
    </Zoom>
  );
};

export default JoinedPartyList;
