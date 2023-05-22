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
// import CreateCardBtn from './CreateCardBtn';

const ValorantBody = () => {
  const [boards, setBoards] = useState([]); // 전체 게시글 저장
  const [pageNumber, setPageNumber] = useState(1); // 불러 올 페이지 번호

  const [queueType, setQueueType] = useState('ALL'); // 큐 타입
  const [tier, setTier] = useState('ALL'); // 티어
  const [role, setRole] = useState('ALL'); // 라인

  const [isLoading, setIsLoading] = useState(false);

  const handleQueueType = (event) => {
    if (event.target.value === 'ARAM') {
      setTier('ALL');
      setRole('ALL');
    }
    setQueueType(event.target.value);
  };

  const handleTier = (event) => {
    setTier(event.target.value);
  };

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  // 최초 1회 게시글 로딩
  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoading(true);

      await api
        .get('/api/valorant/board', {
          params: { size: 12, page: 0, role, type: queueType, tier },
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
  }, [queueType, tier, role]);

  // 더 불러오기 버튼 클릭 시
  const moreBoards = async () => {
    await api
      .get('/api/lol/board', {
        params: { size: 12, page: pageNumber, role, type: queueType, tier },
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
              <MenuItem value={'COMPETITIVE'}>경쟁전</MenuItem>
              <MenuItem value={'UNRATED'}>일반전</MenuItem>
              <MenuItem value={'SWIFTPLAY'}>신속플레이</MenuItem>
              <MenuItem value={'SPIKERUSH'}>스파이크돌격</MenuItem>
              <MenuItem value={'ESCALATION'}>에스컬레이션</MenuItem>
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
              <MenuItem value={'RADIANT'}>레디언트</MenuItem>
              <MenuItem value={'IMMORTAL'}>불멸</MenuItem>
              <MenuItem value={'DIAMOND'}>다이아몬드</MenuItem>
              <MenuItem value={'PLATINUM'}>플래티넘</MenuItem>
              <MenuItem value={'GOLD'}>골드</MenuItem>
              <MenuItem value={'SILVER'}>실버</MenuItem>
              <MenuItem value={'BRONZE'}>브론즈</MenuItem>
              <MenuItem value={'IRON'}>아이언</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={7} md={4.5} lg={3.5} sx={{ pr: 1, pb: 1 }}>
          <ToggleButtonGroup
            fullWidth
            value={role}
            onChange={handleRole}
            exclusive
            sx={{
              height: 40,
              '& > *': {
                width: 50,
              },
            }}
          >
            <ToggleButton value='ALL'>플렉스</ToggleButton>
            <ToggleButton value='DUELIST'>타격대</ToggleButton>
            <ToggleButton value='INITIATOR'>척후대</ToggleButton>
            <ToggleButton value='SENTINEL'>감시자</ToggleButton>
            <ToggleButton value='CONTROLLER'>전략가</ToggleButton>
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
          {/* <CreateCardBtn /> */}
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
          {/* {!isLoading &&
              boards.map((item, _index) => {
                return <Card key={item.id} item={item} />;
              })}
            {isLoading && <Typography>Loading...</Typography>} */}
        </Box>
      </Container>
      <Button sx={{ mb: 4, color: '#3d3939' }} onClick={moreBoards}>
        더 불러오기
      </Button>
    </Fragment>
  );
};

export default ValorantBody;
