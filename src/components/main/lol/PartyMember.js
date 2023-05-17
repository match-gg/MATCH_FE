import { useEffect, useState } from 'react';

import { api } from '../../../api/api'

import { Typography, Box, ImageList } from '@mui/material';

import { lanes, rank_emblems, tierInfo } from './Card.d';

const PartyMember = (props) => {
  const { name, type } = props;

  const [summonerData, setSummonerData] = useState({
    queueType: 'RANKED_SOLO_5x5',
    summonerName: '수유욱',
    tier: 'GOLD',
    rank: 'II',
    leaguePoints: 20,
    wins: 57,
    losses: 48,
    mostChampion: ['Ahri', 'Khazix', 'Lulu'],
    mostLane: 'MID',
  });

  useEffect(() => {
    const fetchSummonerData = async () => {
      await api
        .get(`/api/lol/summoner/${name}/${type === 'FREE_RANK' ? 'free_rank' : 'duo_rank'}`) 
        // 자유랭크의 경우에만 자유랭크 조회, 그 외에 모두 솔로랭크를 기준으로 조회
        .then((res) => {
          setSummonerData(...summonerData, ...res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchSummonerData();
  });

  const totalPlayed = summonerData.wins + summonerData.losses;
  const winRate = Math.round((summonerData.wins / totalPlayed) * 100);

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
        mb: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
        <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>닉네임</Typography>
        <Typography component='span' sx={{ fontSize: 16, fontWeight: 700 }}>
          {summonerData.summonerName}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box
            component='img'
            src={lanes.find((elem) => elem.id === summonerData.mostLane).image}
            loading='lazy'
            alt={summonerData.mostLane}
            sx={{
              height: 20,
              width: 20,
              mr: 1,
              mixBlendMode: 'exclusion',
            }}
          />
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {lanes.find((elem) => elem.id === summonerData.mostLane).kor}
          </Typography>
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
              justifyContent: 'center',
            }}
          >
            <Box
              component='img'
              src={rank_emblems[summonerData.tier]}
              loading='lazy'
              alt={summonerData.tier}
              sx={{
                transform: 'scale(0.11)',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              ml: 1,
            }}
          >
            <Typography
              sx={{ fontSize: 14, fontWeight: 500 }}
              color={tierInfo.find((elem) => elem.id === summonerData.tier).color}
            >
              {summonerData.tier.slice(0, 1)}
              {summonerData.rank === 'I'
                ? 1
                : summonerData.rank === 'II'
                ? 2
                : summonerData.rank === 'III'
                ? 3
                : summonerData.rank === 'IV'
                ? 4
                : ''}
              -{summonerData.leaguePoints}LP
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
              {summonerData.wins}승 {summonerData.losses}패
              <Typography
                component='span'
                sx={{ fontSize: 12, fontWeight: 700, ml: 0.5 }}
                color={winRate >= 50 ? '#5383e8' : '#D64E5B'}
              >
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
            {summonerData.mostChampion.map((item, index) => (
              <Box
                key={index}
                component='img'
                src={`https://d18ghgbbpc0qi2.cloudfront.net/lol/champions/${item.toLowerCase()}.jpg?`}
                alt={item.name}
                loading='lazy'
                sx={{
                  width: '40px',
                  height: '48px',
                  borderRadius: 1,
                  objectFit: 'cover',
                  border: '1px solid #dddddd',
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
