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
  Typography
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { api } from '../../../api/api';
import CreateCardBtn from './CreateCardBtn';
import Card from './Card';

const LolBody = () => {
  const [boards, setBoards] = useState([
    {
      "id": "323468236299433964910447382545296922921",
      "name": "수유욱",
      "type": "NORMAL",
      "tier": "IRON",
      "position": "SPT",
      "voice": "y",
      "content": "NORMAL IRON 이상 SUP구해요",
      "expire": "SIX_H",
      "created": "2023-05-02 01:48:47",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "호랑이 깡총",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 27,
        "wins": 50,
        "losses": 33,
        "mostChampion": ["shen", "rumble", "aatrox"],
        "mostLane": "JUG"
      }
    },
    {
      "id": "50446356446670526980189877961964209065",
      "name": "완도수산새우도둑",
      "type": "ARAM",
      "tier": "MASTER",
      "position": "ALL",
      "voice": "n",
      "content": "ARAM MASTER 이상 ALL구해요",
      "expire": "FIFTEEN_M",
      "created": "2023-05-02 01:48:57",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "완도수산새우도둑",
        "tier": "GOLD",
        "rank": "I",
        "leaguePoints": 0,
        "wins": 33,
        "losses": 19,
        "mostChampion": ["lux", "nautilus", "ahri"],
        "mostLane": "SPT"
      }
    },
    {
      "id": "228109843217649339617604470733650984346",
      "name": "완도수산새우도둑",
      "type": "FREE_RANK",
      "tier": "ALL",
      "position": "JUG",
      "voice": "n",
      "content": "FREE_RANK ALL 이상 JUG구해요",
      "expire": "TWENTY_FOUR_H",
      "created": "2023-05-02 01:48:57",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "밍꾸라지",
        "tier": "SILVER",
        "rank": "I",
        "leaguePoints": 39,
        "wins": 56,
        "losses": 109,
        "mostChampion": ["jhin", "braum", "thresh"],
        "mostLane": "SPT"
      }
    },
    {
      "id": "279949681337570280781832879522599299088",
      "name": "시샘달 사흘",
      "type": "ALL",
      "tier": "MASTER",
      "position": "MID",
      "voice": "y",
      "content": "ALL MASTER 이상 MID구해요",
      "expire": "SIX_H",
      "created": "2023-05-02 01:48:58",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "완도수산새우도둑",
        "tier": "GOLD",
        "rank": "I",
        "leaguePoints": 0,
        "wins": 33,
        "losses": 19,
        "mostChampion": ["lux", "nautilus", "ahri"],
        "mostLane": "ADC"
      }
    },
    {
      "id": "81015235326917448287812391711579125905",
      "name": "밍꾸라지",
      "type": "ARAM",
      "tier": "DIAMOND",
      "position": "SPT",
      "voice": "y",
      "content": "ARAM DIAMOND 이상 SUP구해요",
      "expire": "SIX_H",
      "created": "2023-05-02 01:48:58",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "호랑이 깡총",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 27,
        "wins": 50,
        "losses": 33,
        "mostChampion": ["shen", "rumble", "aatrox"],
        "mostLane": "MID"
      }
    },
    {
      "id": "216797542735424053637669740124667789752",
      "name": "호랑이깡총",
      "type": "ARAM",
      "tier": "BRONZE",
      "position": "ADC",
      "voice": "y",
      "content": "ARAM BRONZE 이상 ADC구해요",
      "expire": "THREE_H",
      "created": "2023-05-02 01:49:56",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "호랑이 깡총",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 27,
        "wins": 50,
        "losses": 33,
        "mostChampion": ["shen", "rumble", "aatrox"],
        "mostLane": "TOP"
      }
    },
    {
      "id": "124346868943839577574232480122081238218",
      "name": "밍꾸라지",
      "type": "ALL",
      "tier": "MASTER",
      "position": "ALL",
      "voice": "n",
      "content": "ALL MASTER 이상 ALL구해요",
      "expire": "TWO_H",
      "created": "2023-05-02 01:49:56",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "호랑이 깡총",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 27,
        "wins": 50,
        "losses": 33,
        "mostChampion": ["shen", "rumble", "aatrox"],
        "mostLane": "MID"
      }
    },
    {
      "id": "306283534212141321285152285377522075962",
      "name": "밍꾸라지",
      "type": "NORMAL",
      "tier": "MASTER",
      "position": "SPT",
      "voice": "y",
      "content": "NORMAL MASTER 이상 SUP구해요",
      "expire": "FIFTEEN_M",
      "created": "2023-05-02 01:49:56",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "시샘달 사흘",
        "tier": "DIAMOND",
        "rank": "II",
        "leaguePoints": 5,
        "wins": 20,
        "losses": 30,
        "mostChampion": ["ezreal", "akshan", "varus"],
        "mostLane": "MID"
      }
    },
    {
      "id": "75441572053799534661551182943980962369",
      "name": "밍꾸라지",
      "type": "ALL",
      "tier": "ALL",
      "position": "SPT",
      "voice": "n",
      "content": "ALL ALL 이상 SUP구해요",
      "expire": "ONE_H",
      "created": "2023-05-02 01:49:56",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "밍꾸라지",
        "tier": "SILVER",
        "rank": "I",
        "leaguePoints": 39,
        "wins": 56,
        "losses": 109,
        "mostChampion": ["jhin", "braum", "thresh"],
        "mostLane": "MID"
      }
    },
    {
      "id": "154742929549044068678781916881453697837",
      "name": "시샘달 사흘",
      "type": "DUO_RANK",
      "tier": "PLATINUM",
      "position": "ALL",
      "voice": "n",
      "content": "DUO_RANK PLATINUM 이상 ALL구해요",
      "expire": "TWENTY_FOUR_H",
      "created": "2023-05-02 01:49:56",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "수유욱",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 20,
        "wins": 89,
        "losses": 34,
        "mostChampion": ["brand", "camille", "blitzcrank"],
        "mostLane": "ADC"
      }
    },
    {
      "id": "128275092100898503554554259954837388611",
      "name": "밍꾸라지",
      "type": "ALL",
      "tier": "IRON",
      "position": "MID",
      "voice": "y",
      "content": "ALL IRON 이상 MID구해요",
      "expire": "FIFTEEN_M",
      "created": "2023-05-02 01:49:56",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "수유욱",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 20,
        "wins": 89,
        "losses": 34,
        "mostChampion": ["brand", "camille", "blitzcrank"],
        "mostLane": "MID"
      }
    },
    {
      "id": "245689168186426722513811478873040050580",
      "name": "수유욱",
      "type": "ALL",
      "tier": "SILVER",
      "position": "ADC",
      "voice": "n",
      "content": "ALL SILVER 이상 ADC구해요",
      "expire": "THIRTY_M",
      "created": "2023-05-02 01:49:56",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "수유욱",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 20,
        "wins": 89,
        "losses": 34,
        "mostChampion": ["brand", "camille", "blitzcrank"],
        "mostLane": "JUG"
      }
    },
    {
      "id": "288429514266995145712746735776288546159",
      "name": "수유욱",
      "type": "ARAM",
      "tier": "GOLD",
      "position": "SPT",
      "voice": "y",
      "content": "ARAM GOLD 이상 SUP구해요",
      "expire": "TWO_H",
      "created": "2023-05-02 01:49:57",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "수유욱",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 20,
        "wins": 89,
        "losses": 34,
        "mostChampion": ["brand", "camille", "blitzcrank"],
        "mostLane": "JUG"
      }
    },
    {
      "id": "270951710592386895659963641516779863809",
      "name": "호랑이깡총",
      "type": "DUO_RANK",
      "tier": "MASTER",
      "position": "SPT",
      "voice": "y",
      "content": "DUO_RANK MASTER 이상 SUP구해요",
      "expire": "TWENTY_FOUR_H",
      "created": "2023-05-02 01:49:57",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "수유욱",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 20,
        "wins": 89,
        "losses": 34,
        "mostChampion": ["brand", "camille", "blitzcrank"],
        "mostLane": "TOP"
      }
    },
    {
      "id": "299396955289911333131930725410655464319",
      "name": "호랑이깡총",
      "type": "ARAM",
      "tier": "MASTER",
      "position": "MID",
      "voice": "n",
      "content": "ARAM MASTER 이상 MID구해요",
      "expire": "THIRTY_M",
      "created": "2023-05-02 01:49:57",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "수유욱",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 20,
        "wins": 89,
        "losses": 34,
        "mostChampion": ["brand", "camille", "blitzcrank"],
        "mostLane": "TOP"
      }
    },
    {
      "id": "289049139271949113907585053051399519558",
      "name": "호랑이깡총",
      "type": "FREE_RANK",
      "tier": "IRON",
      "position": "ADC",
      "voice": "y",
      "content": "FREE_RANK IRON 이상 ADC구해요",
      "expire": "THREE_H",
      "created": "2023-05-02 01:49:57",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "호랑이 깡총",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 27,
        "wins": 50,
        "losses": 33,
        "mostChampion": ["shen", "rumble", "aatrox"],
        "mostLane": "TOP"
      }
    },
    {
      "id": "338504949296047664305480134782287210060",
      "name": "밍꾸라지",
      "type": "ARAM",
      "tier": "SILVER",
      "position": "ADC",
      "voice": "n",
      "content": "ARAM SILVER 이상 ADC구해요",
      "expire": "TWO_H",
      "created": "2023-05-02 01:49:57",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "밍꾸라지",
        "tier": "SILVER",
        "rank": "I",
        "leaguePoints": 39,
        "wins": 56,
        "losses": 109,
        "mostChampion": ["jhin", "braum", "thresh"],
        "mostLane": "ADC"
      }
    },
    {
      "id": "112028176424593983497098499972451355781",
      "name": "수유욱",
      "type": "ARAM",
      "tier": "MASTER",
      "position": "TOP",
      "voice": "y",
      "content": "ARAM MASTER 이상 TOP구해요",
      "expire": "THIRTY_M",
      "created": "2023-05-02 01:49:57",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "호랑이 깡총",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 27,
        "wins": 50,
        "losses": 33,
        "mostChampion": ["shen", "rumble", "aatrox"],
        "mostLane": "JUG"
      }
    },
    {
      "id": "280057300546151859729112218667196038153",
      "name": "호랑이깡총",
      "type": "ALL",
      "tier": "GOLD",
      "position": "ALL",
      "voice": "n",
      "content": "ALL GOLD 이상 ALL구해요",
      "expire": "FIFTEEN_M",
      "created": "2023-05-02 01:49:57",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "밍꾸라지",
        "tier": "SILVER",
        "rank": "I",
        "leaguePoints": 39,
        "wins": 56,
        "losses": 109,
        "mostChampion": ["jhin", "braum", "thresh"],
        "mostLane": "TOP"
      }
    },
    {
      "id": "301834399442693335966728924656718272095",
      "name": "완도수산새우도둑",
      "type": "DUO_RANK",
      "tier": "ALL",
      "position": "ADC",
      "voice": "n",
      "content": "DUO_RANK ALL 이상 ADC구해요",
      "expire": "TWO_H",
      "created": "2023-05-02 01:49:57",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "수유욱",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 20,
        "wins": 89,
        "losses": 34,
        "mostChampion": ["brand", "camille", "blitzcrank"],
        "mostLane": "SPT"
      }
    },
    {
      "id": "174824696314704450601243427107394321636",
      "name": "호랑이깡총",
      "type": "FREE_RANK",
      "tier": "IRON",
      "position": "SPT",
      "voice": "n",
      "content": "FREE_RANK IRON 이상 SUP구해요",
      "expire": "SIX_H",
      "created": "2023-05-02 01:49:58",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "밍꾸라지",
        "tier": "SILVER",
        "rank": "I",
        "leaguePoints": 39,
        "wins": 56,
        "losses": 109,
        "mostChampion": ["jhin", "braum", "thresh"],
        "mostLane": "TOP"
      }
    },
    {
      "id": "2358231906611880064339744591558259522",
      "name": "호랑이깡총",
      "type": "ARAM",
      "tier": "SILVER",
      "position": "SPT",
      "voice": "n",
      "content": "ARAM SILVER 이상 SUP구해요",
      "expire": "SIX_H",
      "created": "2023-05-02 01:49:58",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "수유욱",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 20,
        "wins": 89,
        "losses": 34,
        "mostChampion": ["brand", "camille", "blitzcrank"],
        "mostLane": "JUG"
      }
    },
    {
      "id": "235686713902068626270251183443357744348",
      "name": "수유욱",
      "type": "ALL",
      "tier": "MASTER",
      "position": "ALL",
      "voice": "y",
      "content": "ALL MASTER 이상 ALL구해요",
      "expire": "TWO_H",
      "created": "2023-05-02 01:49:58",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "수유욱",
        "tier": "GOLD",
        "rank": "IV",
        "leaguePoints": 20,
        "wins": 89,
        "losses": 34,
        "mostChampion": ["brand", "camille", "blitzcrank"],
        "mostLane": "JUG"
      }
    },
    {
      "id": "225125783208984976330662198131411875315",
      "name": "밍꾸라지",
      "type": "DUO_RANK",
      "tier": "IRON",
      "position": "ALL",
      "voice": "y",
      "content": "DUO_RANK IRON 이상 ALL구해요",
      "expire": "ONE_H",
      "created": "2023-05-02 01:49:58",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "시샘달 사흘",
        "tier": "DIAMOND",
        "rank": "II",
        "leaguePoints": 5,
        "wins": 20,
        "losses": 30,
        "mostChampion": ["ezreal", "akshan", "varus"],
        "mostLane": "SPT"
      }
    },
    {
      "id": "271840748475391989590309068505526384990",
      "name": "호랑이깡총",
      "type": "NORMAL",
      "tier": "BRONZE",
      "position": "ADC",
      "voice": "y",
      "content": "NORMAL BRONZE 이상 ADC구해요",
      "expire": "TWO_H",
      "created": "2023-05-02 01:49:58",
      "author": {
        "queueType": "RANKED_SOLO_5x5",
        "summonerName": "시샘달 사흘",
        "tier": "DIAMOND",
        "rank": "II",
        "leaguePoints": 5,
        "wins": 20,
        "losses": 30,
        "mostChampion": ["ezreal", "akshan", "varus"],
        "mostLane": "TOP"
      }
    }
  ]
  
  ); // 전체 게시글 저장
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
      </Grid>
      <Grid
        sm
        sx={{
          p: 0,
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap:1
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
