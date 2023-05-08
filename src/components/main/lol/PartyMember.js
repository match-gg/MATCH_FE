import { useState } from 'react';

import { Typography, Box, ImageList } from '@mui/material';

import MicIcon from '@mui/icons-material/Mic';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// import ViewDetail from './ViewDetail';

import { lanes, rank_emblems, tierInfo } from './transform.d';

const PartyMember = ({data}) => {
  // 상세보기 관련 state와 함수
  // const [viewDetail, setViewDetail] = useState(false);
  // const viewDetailHandler = () => {
  //   setViewDetail((prev) => !prev)
  // }

  // 파티원 정보에서 쓸 임시값 (이름, 티어, 랭크, 포지션, 승률, 모스트3, 보이스)
  const nickname = '민우야플레가자'
  const voice = 'Y'
  const position = 'SPT'
  const tier = 'PLATINUM'
  const rank = 'IV'
  const leaguePoints = 37
  const wins = 36
  const losses = 54
  const totalPlayed = wins + losses;
  const winRate = Math.round((wins / totalPlayed) * 100);
  const mostChampion = ["garen", "galio", "lux"]

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 520,
        minHeight: 80,
        border: '1px solid #CCCCCC',
        borderRadius: 2,
        p: 1,
        mb: 1
      }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>닉네임</Typography>
        <Typography component='span' sx={{ fontSize: 16, fontWeight: 700 }}>
          {nickname}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box
            component='img'
            src={lanes.find(elem => elem.id === position).image}
            loading='lazy'
            alt={position}
            sx={{
              height: 20,
              width: 20,
              mr: 1,
              mixBlendMode: 'exclusion'
            }}
          />
          {voice.toUpperCase() === 'Y' ? <MicIcon sx={{ fontSize: 20 }} /> : null}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>티어</Typography>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              height: 48,
              width: 48,
              borderRadius: '50%',
              backgroundColor: '#eeeeee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Box
              component='img'
              src={rank_emblems[tier]}
              loading='lazy'
              alt={tier}
              sx={{
                transform: 'scale(0.11)'
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              ml: 1
            }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }} color={tierInfo.find(elem => elem.id === tier).color}>
              {tier.slice(0, 1)}
              {rank === 'I' ? 1 : rank === 'II' ? 2 : rank === 'III' ? 3 : rank === 'IV' ? 4 : ''}-{leaguePoints}LP
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
              {wins}승 {losses}패
              <Typography
                component='span'
                sx={{ fontSize: 12, fontWeight: 700, ml: 0.5 }}
                color={winRate >= 50 ? '#5383e8' : '#D64E5B'}>
                ({winRate}%)
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 160, pl: 4 }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>모스트 챔피언</Typography>
        <Box sx={{ display: 'flex' }}>
          <ImageList sx={{ m: 0, p: 0 }} cols={3} gap={1}>
            {mostChampion.map((item, index) => (
              <Box
                key={index}
                component='img'
                src={`https://d18ghgbbpc0qi2.cloudfront.net/lol/champions/${item}.jpg?`}
                alt={item.name}
                loading='lazy'
                sx={{
                  width: '40px',
                  height: '48px',
                  borderRadius: 1,
                  objectFit: 'cover',
                  border: '1px solid #dddddd'
                }}
              />
            ))}
          </ImageList>
        </Box>
      </Box>
    </Box>
  );
};

export default PartyMember;
