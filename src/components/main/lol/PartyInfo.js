import { Button, Typography, Stack, Divider, IconButton, Box, Modal } from '@mui/material';

import { Fragment } from 'react';

import CloseIcon from '@mui/icons-material/Close';

import PartyMember from './PartyMember';
import Recruitment from './Recruitment';

const PartyModal = props => {
  return (
    <Fragment>
      <Modal
        open={props.open}
        onClose={props.onCloseModal}
        disableEnforceFocus
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='stretch'
          sx={{
            width: '40%',
            maxHeight: '600px',
            bgcolor: 'white',
            padding: '16px',
            borderRadius: 4
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography component='h1' sx={{ fontSize: 24, ml: 1 }}>
              파티 정보 상세보기
            </Typography>
            <IconButton size='small' onClick={props.onCloseModal}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          </Box>
          <Divider sx={{ mt: 1 }} />
          <Stack alignItems='center' divider={<Divider flexItem />} sx={{ overflow: 'auto' }}>
            <PartyMember onViewDetail={props.onViewDetail} />
            <PartyMember onViewDetail={props.onViewDetail} />
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
                bgcolor: '#808080',
                ':hover': {
                  bgcolor: '#a0a0a0'
                }
              }}
              onClick={props.onCloseModal}>
              뒤로가기
            </Button>
            <Button variant='contained' size='small'>
              참여하기
            </Button>
          </Box>
        </Stack>
      </Modal>
    </Fragment>
  );
}

export default PartyModal;