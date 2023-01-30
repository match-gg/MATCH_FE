import { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Container, Box, Typography, Button } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';

import Copyright from '../../components/ui/Copyright';

const RegisterTerm = () => {
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
            <CircleIcon sx={{ color: 'grey' }} />
            <CircleOutlinedIcon sx={{ color: 'grey' }} />
            <CircleOutlinedIcon sx={{ color: 'grey' }} />
            <CircleOutlinedIcon sx={{ color: 'grey' }} />
          </Box>
          <Typography
            component='h2'
            variant='h4'
            sx={{
              marginTop: 2,
              fontWeight: '600',
            }}
          >
            약관 동의하기
          </Typography>
          <Typography
            component='h3'
            variant='h5'
            sx={{
              marginTop: 2,
              marginBottom: 2,
              fontWeight: '600',
            }}
          >
            아래 약관을 동의해야 Match.GG 서비스를 이용하실 수 있습니다.
          </Typography>
          <Box
            component='div'
            sx={{
              width: '80%',
              height: '65vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'auto',
              gap: 2,
            }}
          ></Box>
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
              to='/register/games'
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

export default RegisterTerm;
