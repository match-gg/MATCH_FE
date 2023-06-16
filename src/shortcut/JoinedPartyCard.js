import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Box, Button, Stack, Typography } from '@mui/material';

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

const JoinedPartyCard = (props) => {
  const { chatRoomInfo } = props;

  const location = useLocation();

  return (
    // 테두리
    <Box
      sx={{
        marginBottom: '20px',
        border: '1px solid rgba(60, 57, 57, 0.5)',
        borderRadius: '4px',
        width: '300px',
        minHeight: '110px',
        backgroundColor: 'white',
        padding: '4px',
      }}
    >
      {/* 내용 */}
      <Stack
        spacing={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            // minHeight: '28px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component='img'
              src={gameImg[chatRoomInfo.game]}
              alt='game_img'
              sx={{
                maxHeight: '24px',
                maxWidth: '32px',
                marginRight: '5px',
              }}
            />
            <Typography sx={{ ml: 1, fontSize: '14px' }}>
              <strong>{chatRoomInfo.createdBy}</strong>님의 파티
            </Typography>
            <Typography sx={{ ml: 2, color: '#5383e8', fontWeight: 'bold' }}>
              {`[${chatRoomInfo.memberList.length} / ${chatRoomInfo.maxMember}]`}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            fontSize: '14px',
            textAlign: 'center',
            wordBreak: 'break-all',
          }}
        >
          {chatRoomInfo.content}
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
          {/* 게시글 상세보기로 이동 */}
          <Link
            to={`${chatRoomInfo.roomId}`}
            state={{ background: location }}
            style={{
              textDecoration: 'none',
              background: 'fixed',
              width: '60%',
              height: '80%',
            }}
          >
            <Button
              variant='outlined'
              size='small'
              sx={{
                width: '100%',
                marginBottom: '10px',
                color: '#3c3939',
                borderColor: '#3c3939',
                '&:hover': {
                  border: 'none',
                  backgroundColor: 'rgba(60, 57, 57, 0.5)',
                  color: 'white',
                },
              }}
            >
              상세보기
            </Button>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default JoinedPartyCard;
