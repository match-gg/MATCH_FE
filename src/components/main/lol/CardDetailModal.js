import { Button, Typography, Box, Modal } from '@mui/material';

import { Fragment, useState } from 'react';

import PartyMember from './PartyMember';
import Recruitment from './Recruitment';
import Countdown from 'react-countdown';
import { expiredTime } from './transform.d';


const CardDetailModal = (props) => {
  const { author, content, expire } = props.item;
  const createdDate = props.createdDate;

  // 방에 대한 인원 수 정보
  const totalMember = 5;
  const currentMember = 3;

  //Modal 관련 state와 함수
  const [open, setOpen] = useState(false);
  const openModalHandler = () => setOpen(true);
  const closeModalHandler = () => {
    setOpen(false);
  };

  // 타이머 관련 변수와 함수
  const remainingTime = createdDate.getTime() + expiredTime[expire] - Date.now(); 
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>만료됨</Typography>;
    } else if (hours !== 0 ) {
      return <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>{hours}시간 남음</Typography>;
    }  else if (minutes !== 0 ) {
      return <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>{minutes}분 남음</Typography>;
    } else {
      return <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>{seconds}초 남음</Typography>;
    }
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
          <Box sx={{ display: 'flex', pb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 340, pr: '60px' }}>
              <Typography sx={{ color: 'grey', fontSize: 14, fontWeight: 600, pb: 0.5 }}>모집 내용</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{content}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 120 }}>
              <Typography sx={{ color: 'grey', fontSize: 14, fontWeight: 600, pb: 0.5 }}>마감일시</Typography>
              <Countdown date={Date.now() + remainingTime} renderer={renderer}/>
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
              fontWeight: 700,
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
