import { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Container, Box, Typography, Button, TextField } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';

import Copyright from '../../components/ui/Copyright';

const RegisterNotification = (props) => {
  const remainTime = '3:00';

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
            sx={{
              height: '4vh',
              display: 'flex',
              flexDirection: 'row',
              justifyContetns: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CircleOutlinedIcon sx={{ color: 'grey' }} />
            <CircleOutlinedIcon sx={{ color: 'grey' }} />
            <CircleOutlinedIcon sx={{ color: 'grey' }} />
            <CircleIcon sx={{ color: 'grey' }} />
          </Box>
          <Typography
            component='h2'
            variant='h4'
            sx={{
              marginTop: 2,
              fontWeight: '600',
            }}
          >
            알림으로 더 빠르게 듀오를 찾아보세요.
          </Typography>
          <Typography
            component='h3'
            variant='h6'
            sx={{
              marginTop: 2,
              marginBottom: 2,
              fontWeight: '600',
            }}
          >
            전화번호 인증/등록으로 알림을 받아볼 수 있습니다.
          </Typography>
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
          <Box
            component='div'
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              marginTop: '2vh',
              marginBottom: '2vh',
            }}
          >
            <Button
              component={RouterLink}
              to='/register/favgame'
              variant='outlined'
              sx={{
                width: '40%',
                height: '4vh',
                border: '1.5px solid #939393',
                color: 'black',
                fontSize: '1.4rem',
                fontWeight: '500',
                borderRadius: '1rem',
                '&:hover': {
                  border: '1.5px solid #939393',
                  color: 'black',
                  backgroundColor: 'white',
                  boxShadow: '2',
                },
              }}
            >
              이전으로
            </Button>
            <Button
              component={RouterLink}
              to='/register/success'
              variant='contained'
              sx={{
                width: '40%',
                height: '4vh',
                fontSize: '1.4rem',
                fontWeight: '500',
                backgroundColor: '#939393',
                border: '1.5px solid white',
                borderRadius: '1rem',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '2',
                  backgroundColor: '#939393',
                },
              }}
            >
              다음으로
            </Button>
          </Box>
          <Copyright sx={{ position: 'absolute', bottom: 0, mb: 2 }} />
        </Box>
      </Container>
    </Fragment>
  );
};

export default RegisterNotification;
