import { useState } from 'react';

import { Card as MuiCard, CardContent, Typography, Box, ImageList, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import CheckIcon from '@mui/icons-material/Check';

import PartyModalBtn from './PartyModalBtn';

import { lanes, rank_emblems, expiredTime, tierInfo } from './transform.d';

const BaseCard = styled(MuiCard)(({ theme }) => ({
  width: 376,
  borderRadius: '8px',
  boxShadow: 'none',
  border: '1px solid #dddddd',
  marginRight: 8,
  marginBottom: 8,
  '&:hover': {
    border: '1px solid grey',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
  },
}));

const FlexRow = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
}));

const FlexCol = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const Card = ({ item }) => {
  const { author, content, expire, created, voice, tier, position } = item;

  // 방에 대한 정보가 구현 되면 아래 변수 적용
  // const totalMemberNums = 5;
  // const currentMemberNums = 2;

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

  const duration = expiredTime[expire];
  const endTime = duration + createdDate.getTime();

  // 만료 여부
  const isExpired = Date.now() - endTime > 0 ? true : false;

  const remainingTime = !isExpired ? endTime - Date.now() : 0;
  const remainingTimeSec = Math.floor(remainingTime / 1000);
  const remainingTimeMin = Math.floor(remainingTimeSec / 60);
  const remainingTimeHour = Math.floor(remainingTimeMin / 60);
  const remainingTimeDay = Math.floor(remainingTimeHour / 24);

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
      <PartyModalBtn>
        <BaseCard>
          <CardContent
            sx={{
              width: '100%',
              height: '100%',
              p: 2,
            }}
          >
            <FlexCol>
              <FlexRow
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FlexRow
                  sx={{
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Box
                    component='img'
                    src={lanes.find((elem) => elem.id === position).image}
                    loading='lazy'
                    alt={position}
                    sx={{ height: 40, width: 40, mr: 1, mixBlendMode: 'exclusion' }}
                  />
                  <p>
                    <Typography
                      component='span'
                      color={tierInfo.find((elem) => elem.id === tier).color}
                      sx={{ display: 'inline-block', fontSize: 16, fontWeight: 700 }}
                    >
                      [{tierInfo.find((elem) => elem.id === tier).kor}]
                    </Typography>
                    <Typography component='span' sx={{ fontSize: 16, fontWeight: 600 }}>
                      {' ' + content}
                    </Typography>
                  </p>
                </FlexRow>
              </FlexRow>
              {isHovering && (
                <Box sx={{ alignItems: 'center' }}>
                  <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>
                    클릭해서 상세보기
                  </Typography>
                </Box>
              )}
              {!isHovering && (
                <FlexRow
                  sx={{
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pl: 6,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ color: '#5383e8', fontSize: 14, fontWeight: 700 }}>
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
                </FlexRow>
              )}
              <Divider sx={{ my: 1 }} />
              <FlexRow>
                <FlexCol
                  sx={{
                    width: 171,
                  }}
                >
                  <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>
                    작성자
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography component='span' sx={{ fontSize: 16, fontWeight: 700 }}>
                      {author.summonerName}
                    </Typography>
                    {voice === 'Y' ? (
                      <span>
                        <MicIcon sx={{ fontSize: 16 }} />
                      </span>
                    ) : null}
                  </Box>
                </FlexCol>
                <FlexCol
                  sx={{
                    width: 171,
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>
                      주 포지션
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Box
                      component='img'
                      src={lanes.find((elem) => elem.id === author.mostLane).image}
                      loading='lazy'
                      alt={position}
                      sx={{
                        height: 24,
                        width: 24,
                        mr: 1,
                        mixBlendMode: 'exclusion',
                      }}
                    />
                    <Typography component='span' sx={{ fontSize: 16, fontWeight: 700 }}>
                      {lanes.find((elem) => elem.id === author.mostLane).kor}
                    </Typography>
                  </Box>
                </FlexCol>
              </FlexRow>
              <FlexRow
                sx={{
                  pt: 1,
                }}
              >
                <FlexCol
                  sx={{
                    width: 171,
                  }}
                >
                  <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>
                    티어
                  </Typography>
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
                      <Typography
                        sx={{ fontSize: 14, fontWeight: 500 }}
                        color={tierInfo.find((elem) => elem.id === author.tier).color}
                      >
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
                </FlexCol>
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
              </FlexRow>
            </FlexCol>
          </CardContent>
        </BaseCard>
      </PartyModalBtn>
    </div>
  );
};

export default Card;
