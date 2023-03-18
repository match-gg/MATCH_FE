import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Typography, Button, Box, FormControl } from '@mui/material';
import Copyright from '../ui/Copyright';

const RegisterSuccess = () => {
  const navigate = useNavigate();

  const { representative } = useSelector((state) => state.user);
  // 사용자가 설정한 대표 게임을 받아서 연결해줄 것.

  const startBtnHandler = () => {
    if (representative === null) {
      navigate('/lol');
    } else {
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: '##edebeb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component='h2' variant='h3' sx={{ marginBottom: 5 }}>
          Match.GG에 오신 것을 환영합니다.
        </Typography>
        <Typography component='p' variant='h5'>
          Match.GG에서 함께할 플레이어를 찾고, 빠르게 다음 게임을 진행해보세요. <br />
          저희가 여러분의 연승과 승격을 응원하겠습니다.
        </Typography>
        <FormControl>
          <Button
            variant='contained'
            sx={{
              marginTop: '5vh',
              width: '10rem',
              fontSize: '1.4rem',
              fontWeight: '500',
              backgroundColor: '#939393',
              color: 'white',
              border: '1.5px solid white',
              borderRadius: '10px',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '2',
                backgroundColor: '#939393',
              },
            }}
            onClick={startBtnHandler}
          >
            시작하기
          </Button>
        </FormControl>
      </Box>
      <Copyright sx={{
        position:  'absolute',
        bottom: 0,
      }} />
    </Box>
  );
};

export default RegisterSuccess;
