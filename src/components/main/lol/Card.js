import { Card as MuiCard, CardContent, Typography, Box, ImageList, Button } from '@mui/material';

import { PieChart } from 'react-minimal-pie-chart';

import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PartyModalBtn from './PartyModalBtn';

import { lanes, rank_emblems, expiredTime } from './transform.data';

const Card = ({ item }) => {
  const { author, content, expire, created, voice, mostLane = 'SPT' } = item;

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
        width: 464,
        height: 250,
        borderRadius: '8px',
        boxShadow: 'none',
        border: '1px solid #dddddd',
        mr: 3,
        mb: 3,
      }}
    >
      <CardContent
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            px: 2,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ flexBasis: 24, display: 'flex', flexDirection: 'row' }}>
            <Typography sx={{ color: 'skyblue', fontSize: 15, fontWeight: 700 }}>
              {elapsedDay
                ? elapsedDay + '일 전'
                : elapsedHour
                ? elapsedHour + '시간 전'
                : elapsedMin
                ? elapsedMin + '분 전'
                : '방금 전'}
            </Typography>
            <Typography sx={{ marginLeft: 1, color: 'grey', fontSize: 15, fontWeight: 700 }}>
              {isExpired ? '만료됨' : remainingTimeDay
                ? remainingTimeDay + '일 후 만료'
                : remainingTimeHour
                ? remainingTimeHour + '시간 후 만료'
                : remainingTimeMin
                ? remainingTimeMin + '분 후 만료'
                : '잠시 후 만료'}
            </Typography>
          </Box>
          <Box sx={{ flexBasis: 88, display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexBasis: 64 }}>
              <PieChart
                data={[{ value: `${winRate}`, color: '#5383e8', name: 'winRate' }]}
                reveal={winRate} // 퍼센트 치수
                lineWidth={30} // 두께
                startAngle={270}
                background='#E84057'
                animate
                label={({ dataEntry }) => dataEntry.value + '%'}
                labelStyle={{
                  fontSize: 18,
                  fontWeight: 700,
                  fill: '#5383e8',
                }}
                labelPosition={0}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                pl: 1,
                justifyContent: 'center',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Box
                  component='img'
                  src={lanes[mostLane]}
                  loading='lazy'
                  alt={mostLane}
                  sx={{ height: 24, mr: 2, filter: 'grayscale(70%)' }}
                ></Box>
                <Box
                  component='img'
                  src={rank_emblems[author.tier]}
                  loading='lazy'
                  alt={author.tier}
                  sx={{ width: 36, mr: 1 }}
                ></Box>
                <Typography sx={{ mr: 1, fontWeight: 500, fontSize: 16 }}>{author.rank}</Typography>
                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                  {author.leaguePoints}LP
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Typography
                  noWrap
                  sx={{
                    width: 160,
                    fontSize: 18,
                    fontWeight: 800,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {author.summonerName}
                </Typography>
                <Box sx={{ pr: 1 }}>{voice === 'y' ? <MicIcon /> : <MicOffIcon />}</Box>
              </Box>
            </Box>
            <ImageList sx={{ flexBasis: 144 }} cols={3}>
              {author.mostChampion.map((item, index) => (
                <Box
                  key={index}
                  component='img'
                  src={`https://d18ghgbbpc0qi2.cloudfront.net/lol/champions/${item}.jpg?`}
                  alt={item.name}
                  loading='lazy'
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 1,
                    objectFit: 'cover',
                    border: '1px solid #dddddd',
                    // transform: 'scale(1.2)',
                  }}
                />
              ))}
            </ImageList>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                align='left'
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  pr: 1,
                }}
              >
                {content}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: '0 0 80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PartyModalBtn />
            </Box>
          </Box>
          <Box sx={{ flexBasis: 24 }}>
            <Typography sx={{ color: 'grey', fontSize: 15, fontWeight: 700 }}>
              모집현황 [ 3 / 5 ]{/* 나중에 데이터 값 받아서 집어넣기 */}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
