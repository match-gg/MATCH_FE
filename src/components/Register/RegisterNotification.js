import React, { Fragment } from 'react';

import { Box, Typography, Button, TextField, Container } from '@mui/material';

const RegisterNotification = (props) => {
  const remainTime = '3:00';

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default RegisterNotification;
