import { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Container, Box, Typography, Button } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';

import Copyright from '../../components/ui/Copyright';
import GameIcon from './GameIcon';

import lolIcon from './logo_images/LoL_Icon_Flat_BLACK.png';
import pubgIcon from './logo_images/Pubg_Logo.png';
import overwatchIcon from './logo_images/overwatch_logo.png';
import lostarkIcon from './logo_images/lost_Ark_Logo.png';
import maplestoryIcon from './logo_images/maplestory_logo.png';

const RegisterFavGame = (props) => {
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
            <CircleIcon sx={{ color: 'grey' }} />
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
            대표게임을 설정해 주세요.
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
            (이후 마이페이지에서 수정이 가능합니다.)
          </Typography>
          <Box
            component='div'
            sx={{
              width: '80%',
              height: '65vh',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GameIcon gameIcon={lolIcon} altMessage={'리그오브레전드_아이콘'} />
            <GameIcon gameIcon={pubgIcon} altMessage={'리그오브레전드_아이콘'} />
            <GameIcon gameIcon={overwatchIcon} altMessage={'리그오브레전드_아이콘'} />
            <GameIcon gameIcon={lostarkIcon} altMessage={'리그오브레전드_아이콘'} />
            <GameIcon gameIcon={maplestoryIcon} altMessage={'리그오브레전드_아이콘'} />
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
              to='/register/games'
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
             to='/register/notification'
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

export default RegisterFavGame;
