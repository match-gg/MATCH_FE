import { Button, Typography, Box, Modal } from '@mui/material';

import { Fragment, useState } from 'react';

import PartyMember from './PartyMember';
import Recruitment from './Recruitment';

const CardDetailModal = (props) => {
  const { author, content, created } = props.item;

  // 방에 대한 인원 수 정보
  const totalMember = 5;
  const currentMember = 3;

  // 방이 만들어진 시간 계산
  const year = created.substring(0, 4);
  const month = created.substring(5, 7);
  const day = created.substring(8, 10);
  const hour = created.substring(11, 13);
  const minute = created.substring(14, 16);

  //Modal 관련 state와 함수
  const [open, setOpen] = useState(false);
  const openModalHandler = () => setOpen(true);
  const closeModalHandler = () => {
    setOpen(false);
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
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            bgcolor: 'white',
            p: 2,
            borderRadius: 1
          }}>
          <Typography component='h1' sx={{ fontSize: 22, fontWeight: 700, pb: 2 }}>
            {author.summonerName}님의 파티
          </Typography>
          <Box sx={{ display: 'flex', pb: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 320 }}>
              <Typography sx={{ color: 'grey', fontSize: 14, fontWeight: 600, pb: 0.5 }}>모집 내용</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{content}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 200 }}>
              <Typography sx={{ color: 'grey', fontSize: 14, fontWeight: 600, pb: 0.5 }}>마감일시</Typography>
              <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 600 }}>{props.expiredTime}</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                {year}년 {month}월 {day}일 {hour}시 {minute}분
              </Typography>
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
              justifyContent: 'space-between',
              height: 440,
              overflow: 'auto'
            }}>
            <PartyMember />
            <PartyMember />
            <PartyMember />
            {Array(totalMember - currentMember).fill(<Recruitment />)}
          </Box>
          <Button
            variant='outlined'
            size='small'
            sx={{
              p: 1,
              mt: 1,
              borderColor: '#CCCCCC',
              color: '#5C5C5C',
              fontWeight: 600,
              ':hover': {
                borderColor: '#dddddd',
                backgroundColor: '#f3f3f3'
              }
            }}>
            파티에 참여하기
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default CardDetailModal;
