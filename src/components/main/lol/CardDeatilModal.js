import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { api } from '../../../api/api';

import { tierInfo, typeInfo, lanes } from './Card.d';

// mui
import {
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';

// custom components
import RemainingTime from './RemainingTime';
import PartyMember from './PartyMember';
import Recruitment from './Recruitment';

// styled component
import styled from '@emotion/styled';
import JoinPartyButton from './JoinPartyButton';
import LeavePatryButton from './LeavePatryButton';
const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1100,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: 4,
  minHeight: 640, // minHeight을 주지않으면 솔로랭크는 두칸이라 답답해 보여서 추가.
}));

const CloseModalBtn = styled(Button)({
  position: 'absolute',
  right: 15,
  top: 15,
  color: 'white',
});

const CardDeatilModal = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: boardId } = params;

  const { isLogin } = useSelector((state) => state.user);
  const { joinedChatRooms } = useSelector((state) => state.chatRoom);

  const [boardData, setBoardData] = useState({});

  useEffect(() => {
    // 게시글 상세조회
    const fetchBoardDetail = async () => {
      await api
        .get(`/api/lol/boards/${boardId}`)
        .then((res) => {
          setBoardData(res.data);
        })
        .catch((err) => {
          // 게시글 상세조회 실패
          console.log(err);
          // alert("게시글에 대한 정보를 불러오는 데 실패했습니다.\n'확인'을 누르면 메인페이지로 이동합니다.");
          // navigate('/lol');
        });
    };

    fetchBoardDetail();
  });

  // 방에 대한 인원 수 정보
  const totalMember =
    typeInfo.find((elem) => elem.id === boardData.type)?.maxMember || 0;
  const currentMember = boardData?.memberList?.length || 0;

  return (
    <ModalContainer onClick={() => navigate('/lol')}>
      {/* ModalContainer와 CloseModalBtn 클릭시 뒤로가기(창 닫기)
        ModalContent 클릭 시 뒤로가기(창 닫기) 하지않음. */}
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              bgcolor: 'white',
              p: 2,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 1,
              }}
            >
              <Typography component='h1' sx={{ fontSize: 22, fontWeight: 700 }}>
                {boardData?.name}님의 파티
              </Typography>
              <IconButton size='small' onClick={() => navigate('/lol')}>
                <Close />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', pb: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 340,
                  pr: '60px',
                }}
              >
                <Typography
                  sx={{ color: 'grey', fontSize: 14, fontWeight: 600, pb: 0.5 }}
                >
                  모집 내용
                </Typography>

                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                  {boardData?.content}
                </Typography>

                <Box sx={{ display: 'flex', pt: 0.5 }}>
                  <Typography
                    color={
                      tierInfo.find((elem) => elem.id === boardData?.tier)
                        ?.color || 'grey'
                    }
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    #
                    {tierInfo.find((elem) => elem.id === boardData.tier)?.kor ||
                      '티어'}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      pl: 1,
                    }}
                  >
                    #
                    {typeInfo.find((elem) => elem.id === boardData.type)?.kor ||
                      '큐타입'}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      pl: 1,
                    }}
                  >
                    #
                    {lanes.find((elem) => elem.id === boardData.position)
                      ?.kor || '포지션'}
                    구함
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,

                      fontWeight: 700,
                      pl: 2,
                    }}
                  >
                    {boardData?.mic ? '#음성채팅희망' : ''}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', width: 120 }}
              >
                <Typography
                  sx={{ color: 'grey', fontSize: 14, fontWeight: 600, pb: 0.5 }}
                >
                  마감일시
                </Typography>
                <RemainingTime
                  created={boardData?.created}
                  expire={boardData?.expire}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', pb: 1 }}>
              <Typography sx={{ color: 'grey', fontSize: 14, fontWeight: 600 }}>
                참여자 목록 ( {currentMember} / {totalMember} )
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                maxHeight: 440,
                overflow: 'auto',
              }}
            >
              {boardData.memberList &&
                boardData.memberList.map((elem, _idx) => {
                  return (
                    <PartyMember key={elem} name={elem} type={boardData.type} />
                  );
                })}
              {Array(totalMember - currentMember).fill(<Recruitment />)}
            </Box>
            {!isLogin &&
              (joinedChatRooms.includes('-NVooseMj-whfjWw4gua') ? (
                <LeavePatryButton />
              ) : (
                <JoinPartyButton />
              ))}
            {/* <JoinPartyButton />
          <LeavePatryButton /> */}
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              p: 2,
              pb: 3,
            }}
          >
            <Typography
              component='h1'
              sx={{ fontSize: 22, fontWeight: 700, pb: 1, color: 'white' }}
            >
              {'채팅 영역'}
            </Typography>
            <Typography
              sx={{
                color: 'grey',
                fontSize: 14,
                fontWeight: 600,
                pb: 0.5,
              }}
            >
              파티 전용 채팅
            </Typography>
            <Box
              sx={{
                backgroundColor: '#ececec',
                mt: 1,
                minWidth: 360,
                minHeight: 540,
                overflowY: 'scroll',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '0px',
                  backgroundColor: 'white',
                  width: '100%',
                }}
              >
                <TextField
                  label='메세지를 입력해주세요.'
                  sx={{
                    mt: 1,
                    width: '100%',
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton size='small'>
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </ModalContent>
    </ModalContainer>
  );
};

export default CardDeatilModal;
