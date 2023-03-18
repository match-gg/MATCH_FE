import { Fragment } from 'react';

import { CssBaseline, Container, Box, Typography, Button } from '@mui/material';
import Divider from '../components/ui/Divider';

import KakaoLoginBtn from '../components/ui/KakaoLoginBtn';
import Copyright from '../components/ui/Copyright';

const LoginPage = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Container
        component='main'
        maxWidth='md'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component='h1'
          variant='h3'
          sx={{
            position: 'absolute',
            top: 0,
            mt: 4,
            fontStyle: 'italic',
            fontWeight: '700',
          }}
        >
          Match.GG
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Box
            sx={{
              height: 480,
              width: 640,
              border: '2px solid #f3f3f3',
              borderRadius: 4,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography component='h2' variant='h5' sx={{ mt: 2, fontWeight: '400' }}>
              이미 MatchGG 의 회원이라면
            </Typography>
            <Box sx={{ mt: 4 }}>
              <KakaoLoginBtn
                href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI_LOGIN}&response_type=code`}
              >
                카카오로 로그인하기
              </KakaoLoginBtn>
            </Box>
            <Divider
              sx={{
                m: 2,
                width: 520,
              }}
            >
              or
            </Divider>
            <Typography component='h2' variant='h5' sx={{ mt: 4, fontWeight: '400' }}>
              아직 MatchGG 의 회원이 아니라면?
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button
                href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI_REGISTER}&response_type=code`}
                sx={{
                  width: '30rem',
                  height: '4rem',
                  backgroundColor: '#f3f3f3',
                  color: '#000000',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '1.3rem',
                  '&:hover': {
                    backgroundColor: '#Ffffff',
                    color: '#000000',
                    border: '1px solid black',
                  },
                }}
              >
                회원가입 하기
              </Button>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ position: 'absolute', bottom: 0, mb: 1 }} />
      </Container>
    </Fragment>
  );
};

export default LoginPage;
