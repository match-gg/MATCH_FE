import { Fragment, useState, useEffect } from 'react';

import {
  Container,
  Typography,
  Box,
  MenuItem,
  Button,
  FormControl,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import Card from './Card';

import LolPageNavbar from './LolPageNavbar';
import { api } from '../../../api/api';
import CreateCardBtn from './CreateCardBtn';
import MainFooter from '../MainFooter';

const LolPage = () => {
  const [boards, setBoards] = useState([]); // 전체 게시글 저장
  const [pageNumber, setPageNumber] = useState(1); // 불러 올 페이지 번호
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const [queueType, setQueueType] = useState('ALL'); // 큐 타입
  const [tier, setTier] = useState('ALL'); // 티어
  const [line, setLine] = useState('ALL'); // 라인

  const handleQueueType = (event) => {
    if (event.target.value === 'ARAM') {
      setTier('ALL');
      setLine('ALL');
    }
    setQueueType(event.target.value);
  };

  const handleTier = (event) => {
    setTier(event.target.value);
  };

  const hanldeLine = (event) => {
    setLine(event.target.value);
  };

  // 더 불러오기
  const moreBoards = async () => {
    await api
      .get('/api/lol/board', {
        params: { size: 12, page: pageNumber, position: line, type: queueType, tier },
      })
      .then((res) => {
        setBoards([...boards, ...res.data.content]);
        setPageNumber((prevState) => prevState + 1);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(pageNumber);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoading(true);

      await api
        .get('/api/lol/board', {
          params: { size: 12, page: 0, position: line, type: queueType, tier },
        })
        .then((response) => {
          setBoards(response.data.content);
          setPageNumber(1);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    };

    fetchBoards();
  }, [queueType, tier, line]);

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
              <Select id='queue-type-select' value={queueType} onChange={handleQueueType}>
                <MenuItem value={'ALL'}>모든 큐</MenuItem>
                <MenuItem value={'DUO_RANK'}>솔로랭크</MenuItem>
                <MenuItem value={'FREE_RANK'}>자유랭크</MenuItem>
                <MenuItem value={'ARAM'}>칼바람나락</MenuItem>
                <MenuItem value={'NORMAL'}>일반게임</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ m: 1, minWidth: 120 }}
              size='small'
              disabled={queueType === 'ARAM' ? true : false}
            >
              <Select id='tier-select' value={tier} onChange={handleTier}>
                <MenuItem value={'ALL'}>모든 티어</MenuItem>
                {!(queueType === 'DUO_RANK') && <MenuItem value={'MASTER'}>Master+</MenuItem>}
                <MenuItem value={'DIAMOND'}>Diamond+</MenuItem>
                <MenuItem value={'PLATINUM'}>Platinum+</MenuItem>
                <MenuItem value={'GOLD'}>Gold+</MenuItem>
                <MenuItem value={'SILVER'}>Silver+</MenuItem>
                <MenuItem value={'BRONZE'}>Bronze+</MenuItem>
                <MenuItem value={'IRON'}>Iron+</MenuItem>
              </Select>
            </FormControl>
            <ToggleButtonGroup
              value={line}
              onChange={hanldeLine}
              exclusive
              sx={{
                ml: 1,
                height: 40,
                '& > *': {
                  width: 50,
                },
              }}
              disabled={queueType === 'ARAM' ? true : false}
            >
              <ToggleButton value='ALL'>전체</ToggleButton>
              <ToggleButton value='TOP'>탑</ToggleButton>
              <ToggleButton value='JUG'>정글</ToggleButton>
              <ToggleButton value='MID'>미드</ToggleButton>
              <ToggleButton value='ADC'>원딜</ToggleButton>
              <ToggleButton value='SPT'>서폿</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
            }}
          ></Box>
          <Box>
            <CreateCardBtn />
            <Button sx={{ height: 40, color: '#3d3939' }}>
              새로고침
              <RefreshIcon />
            </Button>
          </Box>
        </Box>
        <Container maxWidth='xl' sx={{ mt: 5 }}>
          <Box
            sx={{
              height: '100%',
              minHeight: 400,
              justifyContent: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              pl: 3,
              pt: 3,
            }}
          >
            {!isLoading &&
              boards.map((item, _index) => {
                return <Card key={item.id} item={item} />;
              })}
            {isLoading && <Typography>Loading...</Typography>}
          </Box>
        </Container>
        <Button sx={{ mb: 4, color: '#3d3939' }} onClick={moreBoards}>
          더 불러오기
        </Button>
      </Box>
      <MainFooter />
    </Fragment>
  );
};

export default LolPage;
