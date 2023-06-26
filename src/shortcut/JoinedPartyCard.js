import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Badge, Box, Button, Stack, Typography } from '@mui/material';

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
    // badgeContent는 각 파티별로 뿌려줘야함
    <Badge badgeContent={99} color='warning' sx={{ margin: '16px' }}>
      {/* 테두리 */}
      <Box
        sx={{
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
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {chatRoomInfo.content}
          </Box>
          <Box
            sx={{
              height: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* 게시글 상세보기로 이동 */}
            <Link
              to={`${chatRoomInfo.roomId}`}
              state={{ background: location }}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                width: '90%',
              }}
            >
              <Box>
                <Button
                  variant='outlined'
                  size='small'
                  sx={{
                    width: '100%',
                    marginBottom: '10px',
                    color: '#3c3939',
                  }}
                >
                  상세보기로 이동
                </Button>
              </Box>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Badge>
  );
};

export default JoinedPartyCard;
