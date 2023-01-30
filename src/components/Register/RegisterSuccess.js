import { Fragment } from 'react';

import { Container, Box, Typography, Button, Card, CardContent } from '@mui/material';

import Copyright from '../../components/ui/Copyright';

const RegisterSuccess = (props) => {
  return (
    <Fragment>
      <Container component='main' maxWidth='md'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Typography
            component='h1'
            variant='h3'
            sx={{
              paddingTop: '2vh',
              height: '6vh',
              fontStyle: 'italic',
              fontWeight: '700',
            }}
          >
            Match.GG
          </Typography>
          <Box
            component='div'
            sx={{
              width: '80%',
              height: '75vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            <Card
              sx={{
                width: '100%',
                height: '50%',
                backgroundColor: '##edebeb',
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
                <Typography component='h2' variant='h3'>
                  {'kakao_id'} 님 환영합니다.
                </Typography>
                <Typography component='p' variant='h5'>
                  Match.GG 에서 함께할 플레이어를 찾아보세요. <br/>
                  저희는 {'kakao_id'} 님의 연승을 응원하겠습니다.
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
          </Box>
          <Copyright sx={{ position: 'absolute', bottom: 0, mb: 2 }} />
        </Box>
      </Container>
    </Fragment>
  );
};

export default RegisterSuccess;
