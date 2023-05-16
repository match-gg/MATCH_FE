import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Typography, Box, Modal, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import RemainingTime from './RemainingTime';
import PartyMember from './PartyMember';
import Recruitment from './Recruitment';

import { tierInfo, typeInfo, lanes } from './Card.d';
import { api } from '../../../api/api';

const CardDetailModal = (props) => {
  const { isLogin } = useSelector((state) => state.user);

  const { expire, created, setIsHovering } = props;
  // 곧 사라질 props

  const [boardData, setBoardData] = useState({
    id: 2,
    oauth2Id: 'kakao2668291200',
    name: '수유욱',
    type: 'ARAM',
    tier: 'ALL',
    position: 'ALL',
    voice: 'N',
    content: '123123',
    expire: 'FIFTEEN_M',
    created: '2023-05-16 19:20:45',
    author: {
      queueType: 'RANKED_SOLO_5x5',
      summonerName: '수유욱',
      tier: 'GOLD',
      rank: 'II',
      leaguePoints: 20,
      wins: 57,
      losses: 48,
      mostChampion: ['Ahri', 'Khazix', 'Lulu'],
    },
    chatRoomId: '1234',
    memberList: ['수유욱', '밍꾸라지'],
  });

  const boardId = 0;
  // 게시글ID 만 받아서 아래 fetchAboard 를 이용해 게시글 세부정보를 가져온다.

  useEffect(() => {
    const fetchABoard = async () => {
      await api
        .get(`/api/lol/boards/${boardId}`)
        .then((res) => {
          setBoardData(res.data);
        })
        .catch((err) => {
          // 게시글 상세조회 실패
          console.log(err);
        });
    };

    fetchABoard();
  }, []);

  // 방에 대한 인원 수 정보
  const totalMember = typeInfo.find((elem) => elem.id === boardData.type).maxMember;
  const currentMember = boardData.memberList.length;

  //Modal 관련 state와 함수
  const [open, setOpen] = useState(false);
  const openModalHandler = () => setOpen(true);
  const closeModalHandler = () => {
    setOpen(false);
    setIsHovering(false);
  };

  return (
    <Fragment>
      <Button sx={{ p: 0, m: 0 }} onClick={openModalHandler}>
        {props.children}
      </Button>
      <Modal
        open={open}
        onClose={closeModalHandler}
        disableEnforceFocus
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography component='h1' sx={{ fontSize: 22, fontWeight: 700, pb: 2 }}>
              {boardData.name}님의 파티
            </Typography>
            <IconButton size='small' onClick={closeModalHandler} sx={{ width: 18, height: 18 }}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', pb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 340, pr: '60px' }}>
              <Typography sx={{ color: 'grey', fontSize: 14, fontWeight: 600, pb: 0.5 }}>
                모집 내용
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{boardData.content}</Typography>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Typography
                  color={tierInfo.find((elem) => elem.id === boardData.tier).color}
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  #{tierInfo.find((elem) => elem.id === boardData.tier).kor}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    pl: 1,
                  }}
                >
                  #{typeInfo.find((elem) => elem.id === boardData.type).kor}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    pl: 1,
                  }}
                >
                  #{lanes.find((elem) => elem.id === boardData.position).kor}구함
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 120 }}>
              <Typography sx={{ color: 'grey', fontSize: 14, fontWeight: 600, pb: 0.5 }}>
                마감일시
              </Typography>
              <RemainingTime created={created} expire={expire} />
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
            {boardData.memberList.map((elem, _idx) => {
              return <PartyMember key={elem} name={elem} type={boardData.type} />;
            })}
            {Array(totalMember - currentMember).fill(<Recruitment />)}
          </Box>
          {isLogin && (
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
            >
              파티에 참여하기
            </Button>
          )}
        </Box>
      </Modal>
    </Fragment>
  );
};

export default CardDetailModal;
