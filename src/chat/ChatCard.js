import React from 'react';

import { Box, Button, Stack, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useDispatch } from 'react-redux';
import { chatRoomActions } from '../store/chatRoom-slice';

import lolImg from '../components/Register/logo_images/LoL_Icon_Flat_BLACK.png';
import pubgImg from '../components/Register/logo_images/Pubg_Logo.png';
import lostarkImg from '../components/Register/logo_images/lost_Ark_Logo.png';
import overwatchImg from '../components/Register/logo_images/overwatch_logo.png';
import maplestoryImg from '../components/Register/logo_images/maplestory_logo.png';

const gameImg = {
  lol: lolImg,
  pubg: pubgImg,
  maplestory: maplestoryImg,
  overwatch: overwatchImg,
  lostark: lostarkImg,
};

const ChatCard = (props) => {
  const { maxNum, curNum, handleChatOpen, chatRoomInfo } = props;

  const dispatch = useDispatch();
  //채팅방에 입장 버튼을 눌러 리덕스 변경
  const changeChatRoom = (room) => {
    dispatch(chatRoomActions.SET_CURRENT_CHATROOM(room));
  };

  return (
    // 테두리
    <Box
      sx={{
        marginBottom: '20px',
        border: '1px solid rgba(60, 57, 57, 0.5)',
        borderRadius: '4px',
        width: '300px',
        height: '100px',
        backgroundColor: 'white',
        padding: '10px',
      }}
    >
      {/* 내용 */}
      <Stack
        spacing={1.5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <Box
          sx={{
            height: '40px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Box
              component='img'
              src={gameImg[chatRoomInfo.game]}
              alt='game_icon'
              sx={{
                maxHeight: '30px',
                maxWidth: '35px',
                marginRight: '5px',
              }}
            />
            <Typography variant='subtitle1'>
              <strong>{chatRoomInfo.createdBy}</strong>님의 파티
            </Typography>
          </Box>
          <Typography
            variant='subtitle2'
            sx={{ fontWeight: 'bold', position: 'absolute', right: '5px' }}
          >
            모집현황 [{curNum}/{maxNum}]
          </Typography>
        </Box>
        <Box
          sx={{
            height: '30px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          {/* 자세히 버튼은 나중에 수근이가 만든 더보기 모달창에 연결하면 될듯? */}
          <Button
            variant='outlined'
            size='small'
            sx={{
              color: '#3c3939',
              borderColor: '#3c3939',
              '&:hover': {
                border: 'none',
                backgroundColor: 'rgba(60, 57, 57, 0.5)',
                color: 'white',
              },
            }}
          >
            자세히
          </Button>
          <Button
            onClick={() => {
              handleChatOpen(chatRoomInfo.createdBy);
              changeChatRoom(chatRoomInfo);
            }}
            variant='contained'
            size='small'
            startIcon={<ChatIcon />}
            sx={{
              backgroundColor: '#3c3939',
              '&:hover': {
                backgroundColor: 'rgba(60, 57, 57, 0.5)',
              },
            }}
          >
            채팅
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ChatCard;
