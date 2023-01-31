import React from 'react';

import { Typography, Button, Card, CardContent } from '@mui/material';

import RegisterLayout from './RegisterLayout';

const RegisterSuccess = (props) => {
  return (
    <RegisterLayout title={'회원가입이 완료되었습니다.'} description={''}>
      <Card
        sx={{
          marginTop: 20,
          width: '100%',
          height: '50%',
          backgroundColor: '##edebeb',
          border: '1px solid black',
          borderRadius: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography component='h2' variant='h3' sx={{ marginBottom: 5 }}>
            {'kakao_nickname'} 님 환영합니다.
          </Typography>
          <Typography component='p' variant='h5'>
            Match.GG 에서 함께할 플레이어를 찾아보세요. <br />
            저희는 {'kakao_nickname'} 님의 연승을 응원하겠습니다.
          </Typography>
          <Button
            variant='contained'
            sx={{
              marginTop: '5vh',
              width: '10rem',
              height: '4vh',
              fontSize: '1.4rem',
              fontWeight: '500',
              backgroundColor: '#939393',
              color: 'black',
              border: '1.5px solid white',
              borderRadius: '1rem',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '2',
                backgroundColor: '#939393',
              },
            }}
          >
            시작하기
          </Button>
        </CardContent>
      </Card>
    </RegisterLayout>
  );
};

export default RegisterSuccess;
