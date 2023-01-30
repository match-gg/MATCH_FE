import { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Container, Box, Typography, Button, } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';

import InputGameInfo from './InputGameInfo';
import Copyright from '../../components/ui/Copyright';

import lolIcon from './logo_images/LoL_Icon_Flat_BLACK.png';
import pubgIcon from './logo_images/Pubg_Logo.png';
import overwatchIcon from './logo_images/overwatch_logo.png';
import lostarkIcon from './logo_images/lost_Ark_Logo.png';
import maplestoryIcon from './logo_images/maplestory_logo.png';

const RegisterGames = () => {
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
            <CircleIcon sx={{ color: 'grey' }} />
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
            플레이하는 게임과 닉네임을 알려주세요.
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
            (이후에 마이페이지에서 수정이 가능합니다.)
          </Typography>
          <Box
            component='div'
            sx={{
              width: '80%',
              height: '65vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <InputGameInfo
              gameIcon={lolIcon}
              nickname={'소환사명을 입력하세요.'}
              altMessage={'리그오브레전드_아이콘'}
            />
            <InputGameInfo
              gameIcon={pubgIcon}
              nickname={'캐릭터명을 입력하세요.'}
              altMessage={'배틀그라운드_아이콘'}
            />
            <InputGameInfo
              gameIcon={overwatchIcon}
              nickname={'플레이어 이름 또는 배틀태그#1234 입력하세요.'}
              altMessage={'오버워치_아이콘'}
            />
            <InputGameInfo
              gameIcon={lostarkIcon}
              nickname={'캐릭터명을 입력하세요.'}
              altMessage={'로스트아크_아이콘'}
            />
            <InputGameInfo
              gameIcon={maplestoryIcon}
              nickname={'캐릭터명을 입력하세요.'}
              altMessage={'메이플스토리_아이콘'}
            />
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
            to='/register/terms'
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
            to='/register/favgame'
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

export default RegisterGames;
