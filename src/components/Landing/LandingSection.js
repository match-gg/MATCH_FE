import React, { Fragment } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

const LandingSection = () => {
  return (
    <Fragment>
      <Box
        sx={{
          height: '100vh',
        }}
      >
        <Container
          maxWidth='lg'
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant='h1'
            sx={{
              color: 'black',
              fontWeight: '600',
            }}
          >
            함께 플레이할 친구가
          </Typography>
          <Typography
            variant='h1'
            sx={{
              color: 'black',
              fontWeight: '600',
              marginBottom: '3vh',
            }}
          >
            필요하신가요?
          </Typography>
          <Typography
            variant='h4'
            sx={{
              color: 'grey',
              fontWeight: '300',
              marginBottom: '3vh',
            }}
          >
            이제 모든 게임 친구는 Match.gg 에서 구하세요!
          </Typography>
          <Button
            sx={{
              backgroundColor: '#d6d6d6',
              color: 'black',
              width: '30rem',
              height: '3rem',
              fontSize: '1.5rem',
              borderColor: 'gray',
              borderRadius: '15px',
            }}
          >
            함께할 플레이어 찾기
          </Button>
        </Container>
      </Box>
      <Box
        sx={{
          height: '5vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>Test</Typography>
      </Box>
      <Box
        sx={{
          height: '50vh',
          backgroundColor: '#e8e8e8',
        }}
      >
        <Container
          maxWidth='lg'
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='h4'>
            리그오브레전드, 배틀그라운, 로스트아크, 메이플스토리, 오버워치
          </Typography>
          <Typography variant='h4'>각각 파티원 구하려면 힘드셨죠?</Typography>
          <Typography variant='h4'>
            저희가 여러분의 실력, 스펙에 맞춰
          </Typography>
          <Typography variant='h4'>
            최고의 플레이어를 연결해 드립니다.
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          height: '150vh',
        }}
      ></Box>
      <Box
        sx={{
          height: '50vh',
          backgroundColor: '#e8e8e8',
        }}
      ></Box>
    </Fragment>
  );
};

export default LandingSection;
