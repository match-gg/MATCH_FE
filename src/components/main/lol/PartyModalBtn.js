import { Button, Typography, Stack, Divider, IconButton, Box, Modal } from '@mui/material';

import { Fragment, useState } from 'react';

import PartyMember from './PartyMember';
import Recruitment from './Recruitment';

import CloseIcon from '@mui/icons-material/Close';
import BackspaceIcon from '@mui/icons-material/Backspace';
import GroupsIcon from '@mui/icons-material/Groups';

const PartyModalBtn = props => {
  // 파티원 임시 데이터
  const data = {
    id: 1,
    name: '완도수산새우도둑',
    tier: 'Platinum',
    rank : 'I',
    position: 'SPT',
    winRate: 70,
    mostChampion: ['lux', 'aatrox', 'shen'],
    voice: 'Y',
    likeCount: 50,
    dislikeCount: 12
  };

  //Modal 관련 state와 함수
  const [open, setOpen] = useState(false);
  const openModalHandler = () => setOpen(true);
  const closeModalHandler = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button variant='contained' sx={{ borderRadius: '8px' }} onClick={openModalHandler}>
        <Typography>더보기</Typography>
      </Button>
      <Modal
        open={open}
        onClose={closeModalHandler}
        disableEnforceFocus
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='stretch'
          sx={{
            width: '40%',
            maxHeight: '700px',
            bgcolor: 'white',
            p: 2,
            borderRadius: 4
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography component='h1' sx={{ fontSize: 24, fontWeight: 600, ml: 1 }}>
              파티 정보 상세보기
            </Typography>
            <IconButton size='small' onClick={closeModalHandler}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          </Box>
          <Divider sx={{ mt: 1 }} />
          <Stack alignItems='center' divider={<Divider flexItem />} sx={{ overflow: 'auto' }}>
            {/* 파티원 임시 정보 넘겨줌 */}
            <PartyMember data={data}/> 
            <PartyMember data={data}/>
            <Recruitment />
            <Recruitment />
            <Recruitment />
          </Stack>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, mt: 1 }}>
            <Button
              variant='contained'
              size='small'
              sx={{
                p: 1,
                bgcolor: '#808080',
                ':hover': {
                  bgcolor: '#a0a0a0'
                }
              }}
              onClick={closeModalHandler}>
              <BackspaceIcon fontSize='small' sx={{ mr: 1 }} />
              뒤로가기
            </Button>
            <Button variant='contained' size='small' sx={{ p: 1 }}>
              <GroupsIcon fontSize='small' sx={{ mr: 1 }} />
              참여하기
            </Button>
          </Box>
        </Stack>
      </Modal>
    </Fragment>
  );
}

export default PartyModalBtn;