import { Fragment, useRef } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import ShowSupportGameList from './ShowSupportGameList';
import ShowFindingParty from './ShowFindingParty';
import ShowChatting from './ShowChatting';
import ShowAlarmService from './ShowAlarmService';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const LandingSection = () => {
  const scrollRef = useRef(null);
  const onScrollRefClick = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Fragment>
      <Box
        sx={{
          height: '95vh',
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
            함께할 플레이어 찾으러가기
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
        <Button onClick={onScrollRefClick}>
          <KeyboardArrowDownIcon />더 알아보기
        </Button>
      </Box>
      <Box
        sx={{
          height: '35vh',
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
          <Typography variant='h4' marginBottom='5px'>
            리그오브레전드, 배틀그라운, 로스트아크, 메이플스토리, 오버워치
          </Typography>
          <Typography variant='h4' marginBottom='5px'>
            각각 파티원 구하려 힘드셨죠?
          </Typography>
          <Typography variant='h4' marginBottom='5px'>
            Match.GG에서 조건에 맞춰 원하시는 동료를 찾아보세요.
          </Typography>
        </Container>
      </Box>
      <ShowSupportGameList ref={scrollRef} />
      <Box
        sx={{
          width: '100%',
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ShowFindingParty />
        <ShowChatting />
        <ShowAlarmService />
      </Box>
    </Fragment>
  );
};

export default LandingSection;
