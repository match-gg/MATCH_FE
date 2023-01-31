import React from 'react';

import { Box, Typography, Button, TextField } from '@mui/material';
import RegisterLayout from './RegisterLayout';

const RegisterNotification = (props) => {
  const remainTime = '3:00';

  return (
    <RegisterLayout
      title={'알림으로 더 빠르게 듀오를 찾아보세요.'}
      description={'전화번호 인증/등록으로 알림을 받아볼 수 있습니다.'}
      prevLink={'/register/favgame'}
      nextLink={'/register/success'}
      phase={4}
    >
      <Box
        component='div'
        sx={{
          width: '80%',
          height: '65vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <Box
          component='form'
          sx={{
            width: '90%',
            height: '6vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextField
            id='outlined-basic'
            label={'전화번호를 입력하세요.'}
            variant='outlined'
            sx={{
              width: '70%',
              height: '5vh',
              paddingRight: '5%',
            }}
          />
          <Button
            variant='outlined'
            sx={{
              width: '25%',
              height: '5vh',
              fontSize: '1.2rem',
            }}
          >
            인증번호 받기
          </Button>
        </Box>
        <Box
          component='form'
          sx={{
            width: '90%',
            height: '6vh',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              width: '20%',
              marginRight: '5%',
              textAlign: 'center',
              fontSize: '1rem',
            }}
          >
            남은시간 : {remainTime}
          </Typography>

          <TextField
            id='outlined-basic'
            label={'인증번호 입력'}
            variant='outlined'
            sx={{
              width: '45%',
              height: '5vh',
              paddingRight: '5%',
            }}
          />
          <Button
            variant='outlined'
            sx={{
              width: '25%',
              height: '5vh',
              fontSize: '1.2rem',
            }}
          >
            인증하기
          </Button>
        </Box>
      </Box>
    </RegisterLayout>
  );
};

export default RegisterNotification;
