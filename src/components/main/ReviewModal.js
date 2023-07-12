import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { api } from '../../api/api';
// mui
import { Box, Typography, IconButton, Button } from '@mui/material';
import { AssuredWorkloadSharp, Close } from '@mui/icons-material';

import SkipNextIcon from '@mui/icons-material/SkipNext';
import SendIcon from '@mui/icons-material/Send';

// styled component
import styled from '@emotion/styled';
import ReviewMember from './ReviewMember';

const ModalContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  overflowY: 'hidden',
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
  borderRadius: 4
}));

const ReviewModal = () => {
  //토큰
  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  //현재 게임 정보
  const location = useLocation();
  const game = location.pathname.split('/')[1].toLowerCase();

  const navigate = useNavigate();

  const params = useParams();
  const { id: boardId } = params;

  const nickname = useSelector((state) => state.user.games[game]);

  // 리뷰 할 사람들의 데이터
  const [boardData, setBoardData] = useState({});

  // 리뷰를 다 제출했는지 여부
  const [postEnd, setPostEnd] = useState(false);

  // 멤버와 각 멤버의 평가를 담을 객체
  const reviewList = {};
  
  // 멤버 리스트를 객체로 만드는 동작
  if (boardData.memberList) {
    boardData?.memberList.forEach(item => {
      reviewList[item] = 'none';
    });
  }

  // 리뷰 객체를 바꾸는 함수
  const reviewHandler = (name, review) => {
    reviewList[name] = review;
  }

  // 게시글 상세보기 api로 멤버 리스트 불러오기
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
          "파티원의 정보를 불러오는 데 실패했습니다.\n'확인'을 누르면 메인페이지로 이동합니다."
        );
        navigate(0);
      });
  };

  // 리뷰 제출하기 버튼을 누른 경우
  const submitReview = async () => {
    for (const name in reviewList) {
      if (reviewList[name] === 'none') continue;
      await api.post(
        `api/user/${reviewList[name]}`,
        {
          game: game.toUpperCase(),
          nickname: name
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken
          }
        })
        .catch((error) => {
          alert(
            '리뷰 작성 중 문제가 발생하였습니다.\n잠시 후 다시 시도해주세요.'
          );
          console.log(error);
        })
        .then(async (response) => {
          console.log('성공');
        });
    }
    setPostEnd(true)
  }

  // 리뷰가 다 제출되면 동작
  useEffect(() => {
    if (postEnd) navigate(`/${game}`);
  }, [postEnd]);

  // 컴포넌트 렌더링 시 게시글 상세 조회를 호출해 memberList 받아옴
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    fetchBoardDetail();
    return () => (document.body.style.overflow = 'unset');
  }, []);

  return (
    <ModalContainer onClick={() => navigate(`/${game}`)}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 1
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton size='small' onClick={() => navigate(`/${game}`)}>
              <Close />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Typography component='h1' sx={{ fontSize: 16, fontWeight: 700, pb: 0.5 }}>
              이번 게임은 어떠셨나요?
            </Typography>
            <Typography component='h2' sx={{ fontSize: 12, fontWeight: 700, color: 'grey', pb: 2 }}>
              평가는 상대방이 알 수 없어요.
            </Typography>
            {/* memberList에 있는 닉네임들 중 자신을 제외한 닉네임들을 전달 */}
            {boardData &&
              boardData.memberList &&
              boardData.memberList.map((elem, idx) => {
                if (elem !== nickname) {
                  return <ReviewMember key={elem} name={elem} onChangeReview={reviewHandler} />;
                } else {
                  return null;
                }
              })}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              mt: 1
            }}>
            <Button startIcon={<SendIcon />} variant='contained' size='small' onClick={submitReview}>
              제출하기
            </Button>
          </Box>
        </Box>
      </ModalContent>
    </ModalContainer>
  );
}

export default ReviewModal