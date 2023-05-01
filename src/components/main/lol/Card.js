import {
  Card as MuiCard,
  CardContent,
  Typography,
  Box,
  ImageList,
  Button,
  Divider,
  ImageListItem,
} from '@mui/material';

import { PieChart } from 'react-minimal-pie-chart';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import CheckIcon from '@mui/icons-material/Check';

import PartyModalBtn from './PartyModalBtn';

import { lanes, rank_emblems, expiredTime } from './transform.data';

const Card = ({ item }) => {
  const { author, content, expire, created, voice, mostLane = 'ADC', tier, position } = item;

  const totalMemberNums = 5;
  const currentMemberNums = 2;

  const totalPlayed = author.wins + author.losses;
  const winRate = Math.round((author.wins / totalPlayed) * 100);

  // date parsing
  const year = created.substring(0, 4);
  const month = created.substring(5, 7);
  const day = created.substring(8, 10);
  const hour = created.substring(11, 13);
  const minute = created.substring(14, 16);
  const second = created.substring(17, 19);

  const createdDate = new Date(year, month - 1, day, hour, minute, second);

  const elapsedMSec = new Date(Date.now()) - createdDate;
  const elapsedSec = Math.floor(elapsedMSec / 1000);
  const elapsedMin = Math.floor(elapsedSec / 60);
  const elapsedHour = Math.floor(elapsedMin / 60);
  const elapsedDay = Math.floor(elapsedHour / 24);

  const duration = expiredTime[expire];

  const endTime = duration + createdDate.getTime();

  const isExpired = Date.now() - endTime > 0 ? true : false;
  const remainingTime = !isExpired ? endTime - Date.now() : 0;

  const remainingTimeSec = Math.floor(remainingTime / 1000);
  const remainingTimeMin = Math.floor(remainingTimeSec / 60);
  const remainingTimeHour = Math.floor(remainingTimeMin / 60);
  const remainingTimeDay = Math.floor(remainingTimeHour / 24);

  return (
    <MuiCard
      sx={{
        width: 376,
        borderRadius: '8px',
        boxShadow: 'none',
        border: '1px solid #dddddd',
        mr: 1,
        mb: 1,
      }}
    >
      <CardContent
        sx={{
          width: '100%',
          height: '100%',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                height: 48,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Box
                component='img'
                src={lanes[position]}
                loading='lazy'
                alt={position}
                sx={{ height: 40, width: 40, mr: 1, mixBlendMode: 'exclusion' }}
              />
              <Typography></Typography>
              <Typography
                align='left'
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {content}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              height: 20,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginLeft: 6,
              marginTop: 0.5,
            }}
          >
            <Typography sx={{ color: 'grey', fontSize: 14, fontWeight: 700, mr: 1.5 }}>
              모집 현황
            </Typography>
            <Box
              sx={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#5383e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 0.5,
              }}
            >
              <CheckIcon sx={{ color: 'white', fontSize: 12 }} />
            </Box>
            <Box
              sx={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#5383e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 0.5,
              }}
            >
              <CheckIcon sx={{ color: 'white', fontSize: 12 }} />
            </Box>
            <Box
              sx={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#D9D9D9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 0.5,
              }}
            />
            <Box
              sx={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#D9D9D9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 0.5,
              }}
            />
            <Box
              sx={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#D9D9D9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 0.5,
              }}
            />

            <Typography sx={{ marginLeft: 10, color: '#5383e8', fontSize: 14, fontWeight: 700 }}>
              {isExpired
                ? '만료됨'
                : remainingTimeDay
                ? remainingTimeDay + '일 후 만료'
                : remainingTimeHour
                ? remainingTimeHour + '시간 후 만료'
                : remainingTimeMin
                ? remainingTimeMin + '분 후 만료'
                : '잠시 후 만료'}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box
              sx={{
                width: 160,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>작성자</Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{author.summonerName}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>
                주 포지션
              </Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{author.mostLane}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              mwidth: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Box
              sx={{
                width: 160,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
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
                    src={rank_emblems[author.tier]}
                    loading='lazy'
                    alt={author.tier}
                    sx={{
                      transform: 'scale(0.11)',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    ml: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                    {author.tier.slice(0, 1)}
                    {author.rank === 'I'
                      ? 1
                      : author.rank === 'II'
                      ? 2
                      : author.rank === 'III'
                      ? 3
                      : author.rank === 'IV'
                      ? 4
                      : ''}
                    -{author.leaguePoints}LP
                  </Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                    {author.wins}승 {author.losses}패
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>
                모스트 챔피언
              </Typography>
              <ImageList sx={{ m: 0, p: 0 }} cols={3} gap={2}>
                {author.mostChampion.map((item, index) => (
                  <Box
                    key={index}
                    component='img'
                    src={`https://d18ghgbbpc0qi2.cloudfront.net/lol/champions/${item}.jpg?`}
                    alt={item.name}
                    loading='lazy'
                    sx={{
                      width: '100%',
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
      </CardContent>
    </MuiCard>
  );
};

export default Card;
