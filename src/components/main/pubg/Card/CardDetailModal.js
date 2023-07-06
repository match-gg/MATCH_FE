import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { api } from '../../../../api/api';

import { platformList, typeList, tierList } from './CardDetailModal.d';

// mui
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

// custom components
import RemainingTime from './RemainingTime';
import PartyMember from './PartyMember';
import Recruitment from './Recruitment';

// styled component
import styled from '@emotion/styled';
// import JoinPartyButton from './JoinPartyButton';
// import LeavePatryButton from './LeavePatryButton';
import ChatRoom from '../../../../chat/ChatRoom';
// import DeletePartyButton from './DeletePartyButton';

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
  minHeight: 600, // minHeight을 주지않으면 솔로랭크는 두칸이라 답답해 보여서 추가.
}));

const CardDeatilModal = (props) => {
  //현재 게임 정보
  const location = useLocation();
  const game = location.pathname.split('/')[1];

  const navigate = useNavigate();
  const params = useParams();
  const { id: boardId } = params;

  const { isLogin } = useSelector((state) => state.user);
  const { joinedChatRoomsId } = useSelector((state) => state.chatRoom);

  const oauth2Id = useSelector((state) => state.user.oauth2Id);

  const [boardData, setBoardData] = useState({});

  // 게시글 상세조회
  const fetchBoardDetail = async () => {
    await api
      .get(`/api/${game}/boards/${boardId}`)
      .then((res) => {
        setBoardData(res.data);
      })
      .catch((err) => {
        // 게시글 상세조회 실패
        console.log(err);
        alert(
          "게시글에 대한 정보를 불러오는 데 실패했습니다.\n'확인'을 누르면 메인페이지로 이동합니다."
        );
        navigate(0);
      });
  };
  //컴포넌트 렌더링 시 게시글 상세 조회 호출
  useEffect(() => {
    fetchBoardDetail();
  }, []);

  // 방에 대한 인원 수 정보
  const totalMember =
    typeList.find((elem) => elem.id === boardData.type)?.maxMember || 0;
  const currentMember = boardData?.memberList?.length || 0;

  return (
    <ModalContainer onClick={() => navigate(`/${game}`)}>
      {/* ModalContainer와 CloseModalBtn 클릭시 뒤로가기(창 닫기)
        ModalContent 클릭 시 뒤로가기(창 닫기) 하지않음. */}
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
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
              {!isLogin &&
                !joinedChatRoomsId.includes(boardData.chatRoomId) && (
                  <IconButton size='small' onClick={() => navigate(`/${game}`)}>
                    <Close />
                  </IconButton>
                )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 340,
                      pr: '60px',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'grey',
                        fontSize: 14,
                        fontWeight: 600,
                        pb: 1,
                      }}
                    >
                      모집 내용
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                      {boardData?.content}
                    </Typography>
                    <Box sx={{ display: 'flex', pt: 1 }}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        #
                        {platformList.find(
                          (elem) => elem.id === boardData.platform
                        )?.label || '플랫폼'}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 700,
                          pl: 1,
                        }}
                      >
                        #
                        {typeList.find((elem) => elem.id === boardData.type)
                          ?.label || '큐타입'}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: 700,
                          pl: 1,
                        }}
                      >
                        #
                        {tierList.find((elem) => elem.id === boardData.tier)
                          ?.label || '티어'}{' '}
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
                  <Box>
                    <Typography
                      sx={{
                        color: 'grey',
                        fontSize: 14,
                        fontWeight: 600,
                        pb: 1,
                      }}
                    >
                      마감일시
                    </Typography>
                    <RemainingTime
                      created={boardData?.created}
                      expire={boardData?.expire}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', py: 1 }}>
                  <Typography
                    sx={{ color: 'grey', fontSize: 14, fontWeight: 600 }}
                  >
                    참여자 목록 ( {currentMember} / {totalMember} )
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    minWidth: 520,
                    minHeight: 440,
                    maxHeight: 440,
                    overflow: 'auto',
                  }}
                >
                  {boardData &&
                    boardData.memberList &&
                    boardData.memberList.map((elem, idx) => {
                      return (
                        <PartyMember
                          key={elem}
                          name={elem}
                          platform={boardData.platform}
                          type={boardData.type}
                          isAuthor={oauth2Id === boardData.oauth2Id}
                          game={game}
                          id={boardData.id}
                          chatRoomId={boardData.chatRoomId}
                          fetchBoardDetail={fetchBoardDetail}
                        />
                      );
                    })}
                  {Array(totalMember - currentMember).fill(<Recruitment />)}
                </Box>
                {/* {isLogin &&
                  (joinedChatRooms.includes(boardData.chatRoomId) ? (
                    oauth2Id === boardData.oauth2Id ? (
                      <DeletePartyButton
                        chatRoomId={boardData.chatRoomId}
                        id={boardData.id}
                        game={game}
                      />
                    ) : (
                      <LeavePatryButton
                        chatRoomId={boardData.chatRoomId}
                        game={'lol'}
                        id={boardData.id}
                      />
                    )
                  ) : (
                    <JoinPartyButton
                      chatRoomId={boardData.chatRoomId}
                      game={'lol'}
                      id={boardData.id}
                    />
                  ))} */}
              </Box>
              {isLogin && joinedChatRoomsId.includes(boardData.chatRoomId) && (
                <Box sx={{ ml: 2 }}>
                  <ChatRoom chatRoomId={boardData.chatRoomId} game={game} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </ModalContent>
    </ModalContainer>
  );
};

export default CardDeatilModal;
