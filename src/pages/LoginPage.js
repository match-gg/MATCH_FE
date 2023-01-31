import { Fragment } from 'react';

import { CssBaseline, Container, Box, Typography } from '@mui/material';

import KakaoLoginBtn from '../components/ui/KakaoLoginBtn';
import Copyright from '../components/ui/Copyright';

const LoginPage = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '90vh',
          }}
        >
          <Typography
            component='h1'
            variant='h3'
            sx={{
              marginTop: '10rem',
              fontStyle: 'italic',
              fontWeight: '700',
            }}
          >
            Match.GG
          </Typography>
          <Typography component='h2' variant='h4' sx={{ mt: '10rem', fontWeight: '600' }}>
            카카오로 시작하기
          </Typography>
          <Box sx={{ mt: '7rem' }}>
            <KakaoLoginBtn />
          </Box>
          <Copyright sx={{ position: 'absolute', bottom: 0, mt: 8, mb: 4 }} />
        </Box>
      </Container>
    </Fragment>
  );
};

export default LoginPage;