import { Fragment, useState, useEffect } from 'react';

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  IconButton,
  Stack,
  Button,
  ListItemText,
  Grid,
  FormControl,
  Select,
  InputLabel,
  ButtonGroup,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import Card from './Card';

import Logout from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LolPageNavbar from './LolPageNavbar';
import CreateCardBtn from './CreateCardBtn';
import Footer from '../Footer';

const LolPage = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const [boards, setBoards] = useState({ items: [] });

  // 큐 타입
  const [queueType, setQueueType] = useState('');
  const handleQueueType = (event) => {
    setQueueType(event.target.value);
  };

  // 티어
  const [tier, setTier] = useState('');
  const handleTier = (event) => {
    setTier(event.target.value);
  };

  // 라인
  const [line, setLine] = useState('all');

  const fetchBoards = async () => {};

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetchBoards();
  };

  useEffect(() => {
    const onScroll = (e) => {
      setScrollValue(
        (prevState) => (prevState = e.target.documentElement.scrollTop)
      );
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollValue]);

  return (
    <Fragment>
      <LolPageNavbar />
      <Box
        sx={{
          pt: 15,
          height: '100%',
          backgroundColor: '#f3f3f3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component='h1'
          variant='h2'
          sx={{
            fontSize: { sm: 80, lg: 100, xl: 120 },
            textAlign: 'center',
            fontStyle: 'italic',
            fontWeight: '600',
            my: 5,
          }}
        >
          GET YOUR TEAM
        </Typography>
        <Box
          size='small'
          sx={{
            height: 64,
            width: { xs: 480, sm: 480, md: 960, xl: 1400 },
            backgroundColor: 'white',
            border: '1px solid #dddddd',
            borderRadius: 8,
            px: 4,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              flexBasis: '1334',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
              <InputLabel id='queue-type-select'>큐 타입</InputLabel>
              <Select
                labelId='queue-type-select'
                id='queue-type-select'
                value={queueType}
                label={'큐 타입'}
                onChange={handleQueueType}
                defaultValue=''
              >
                <MenuItem value={'상관없음'}>상관없음</MenuItem>
                <MenuItem value={'Normal'}>일반게임</MenuItem>
                <MenuItem value={'HA'}>칼바람나락</MenuItem>
                <MenuItem value={'Solo'}>솔로랭크</MenuItem>
                <MenuItem value={'Free'}>자유랭크</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
              <InputLabel id='tier-select'>티어</InputLabel>
              <Select
                labelId='tier-select'
                id='tier-select'
                value={tier}
                label={'티어'}
                onChange={handleTier}
                defaultValue=''
              >
                <MenuItem value={'상관없음'}>상관없음</MenuItem>
                <MenuItem value={'iron'}>아이언+</MenuItem>
                <MenuItem value={'Bronze'}>브론즈+</MenuItem>
                <MenuItem value={'silver'}>실버+</MenuItem>
                <MenuItem value={'gold'}>골드+</MenuItem>
                <MenuItem value={'platinum'}>플래티넘+</MenuItem>
                <MenuItem value={'diamond'}>다이아몬드+</MenuItem>
                {!(queueType === 'Solo') && (
                  <MenuItem value={'master'}>마스터+</MenuItem>
                )}
              </Select>
            </FormControl>
            <ButtonGroup
              variant='outlined'
              aria-label='line-button-group'
              color='primary'
              sx={{
                height: 40,
                m: 1,
              }}
            >
              <Button
                onClick={() => {
                  setLine('all');
                }}
                sx={{
                  backgroundColor: line === 'all' ? '#1976d2' : '',
                  color: line === 'all' ? 'white' : '',
                  '&:hover': {
                    color: line === 'all' ? '#1976d2' : '',
                  },
                }}
              >
                전체
              </Button>
              <Button
                onClick={() => {
                  setLine('top');
                }}
                sx={{
                  backgroundColor: line === 'top' ? '#1976d2' : '',
                  color: line === 'top' ? 'white' : '',
                  '&:hover': {
                    color: line === 'top' ? '#1976d2' : '',
                  },
                }}
              >
                탑
              </Button>
              <Button
                onClick={() => {
                  setLine('jug');
                }}
                sx={{
                  backgroundColor: line === 'jug' ? '#1976d2' : '',
                  color: line === 'jug' ? 'white' : '',
                  '&:hover': {
                    color: line === 'jug' ? '#1976d2' : '',
                  },
                }}
              >
                정글
              </Button>
              <Button
                onClick={() => {
                  setLine('mid');
                }}
                sx={{
                  backgroundColor: line === 'mid' ? '#1976d2' : '',
                  color: line === 'mid' ? 'white' : '',
                  '&:hover': {
                    color: line === 'mid' ? '#1976d2' : '',
                  },
                }}
              >
                미드
              </Button>
              <Button
                onClick={() => {
                  setLine('adc');
                }}
                sx={{
                  backgroundColor: line === 'adc' ? '#1976d2' : '',
                  color: line === 'adc' ? 'white' : '',
                  '&:hover': {
                    color: line === 'adc' ? '#1976d2' : '',
                  },
                }}
              >
                원딜
              </Button>
              <Button
                onClick={() => {
                  setLine('spt');
                }}
                sx={{
                  backgroundColor: line === 'spt' ? '#1976d2' : '',
                  color: line === 'spt' ? 'white' : '',
                  '&:hover': {
                    color: line === 'spt' ? '#1976d2' : '',
                  },
                }}
              >
                서폿
              </Button>
            </ButtonGroup>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
            }}
          ></Box>
          <Box>
            {/* <Button variant='outlined' sx={{ height: 40, mr: 1 }}>
              글 작성하기
            </Button> */}
            <CreateCardBtn />
            <Button sx={{ height: 40 }}>
              새로고침
              <RefreshIcon />
            </Button>
          </Box>
        </Box>
        <Container maxWidth='xl' sx={{ mt: 5 }}>
          <Box
            container
            sx={{
              height: '100%',
              justifyContent: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              pl: 3,
              pt: 3,
            }}
          >
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </Box>
        </Container>
        <Button sx={{ mb: 4 }}>더 불러오기</Button>
      </Box>
      <Footer />
    </Fragment>
  );
};

export default LolPage;
