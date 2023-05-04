import { useState, useEffect, Fragment } from 'react';

import {
  Box,
  Button,
  Container,
  Grid,
  FormControl,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { api } from '../../../api/api';
import CreateCardBtn from './CreateCardBtn';
import Card from './Card';

import { dummyBoards } from './boards.tmp';

const LolBody = () => {
  const [boards, setBoards] = useState(dummyBoards); // 전체 게시글 저장
  const [pageNumber, setPageNumber] = useState(1); // 불러 올 페이지 번호

  const [queueType, setQueueType] = useState('ALL'); // 큐 타입
  const [tier, setTier] = useState('ALL'); // 티어
  const [line, setLine] = useState('ALL'); // 라인

  const [isLoading, setIsLoading] = useState(false);

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

  // 최초 1회 게시글 로딩
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

    // fetchBoards();
  }, [queueType, tier, line]);

  // 더 불러오기 버튼 클릭 시
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
  };

  return (
    <Fragment>
      <Grid
        container
        sx={{
          width: { xs: '95%', lg: 1180 },
          m: 0,
          backgroundColor: 'white',
          border: '1px solid #dddddd',
          borderRadius: 4,
        }}
        spacing={1}
      >
        <Grid item xs={6} sm={3.5} md={2} lg={1.5} sx={{ pr: 1 }}>
          <FormControl sx={{ width: '100%' }} size='small'>
            <Select id='queue-type-select' value={queueType} onChange={handleQueueType}>
              <MenuItem value={'ALL'}>모든 큐</MenuItem>
              <MenuItem value={'DUO_RANK'}>솔로랭크</MenuItem>
              <MenuItem value={'FREE_RANK'}>자유랭크</MenuItem>
              <MenuItem value={'ARAM'}>칼바람나락</MenuItem>
              <MenuItem value={'NORMAL'}>일반게임</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3.5} md={2} lg={1.5} sx={{ pr: 1 }}>
          <FormControl
            sx={{ width: '100%' }}
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
        </Grid>
        <Grid item xs={12} sm={7} md={4.5} lg={3.5} sx={{ pr: 1, pb: 1 }}>
          <ToggleButtonGroup
            fullWidth
            value={line}
            onChange={hanldeLine}
            exclusive
            sx={{
              height: 40,
              '& > *': {
                padding: '0',
              },
            }}
            disabled={queueType === 'ARAM' ? true : false}
          >
            <ToggleButton value='ALL'>전체</ToggleButton>
            <ToggleButton value='TOP'>탑</ToggleButton>
            <ToggleButton value='JUG'>정글</ToggleButton>
            <ToggleButton value='MID'>미드</ToggleButton>
            <ToggleButton value='ADC'>원딜</ToggleButton>
            <ToggleButton value='SPT'>서포터</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid
          sm
          sx={{
            p: 0,
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <CreateCardBtn />
          <Button sx={{ height: 40, color: '#3d3939' }}>
            새로고침
            <RefreshIcon />
          </Button>
        </Grid>
      </Grid>
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            pl: 1,
            pt: 1,
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
    </Fragment>
  );
};

export default LolBody;
