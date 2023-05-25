import { Fragment } from 'react';

import { Box, Typography, ImageList } from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';

import { positionInfo, rank_emblems, tierInfo } from './Card.d';

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

const CardAuthor = (props) => {
  const { author, voice } = props;

  const totalPlayed = author.wins + author.losses;
  const winRate = Math.round((author.wins / totalPlayed) * 100);

  // K/D 계산
  const killDeath = (author.kill / author.death).toFixed(2);

  return (
    <Fragment>
      <FlexRow>
        <FlexCol
          sx={{
            width: 171,
            alignItems: 'flex-start'
          }}>
          <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>작성자</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Typography component='span' sx={{ fontSize: 16, fontWeight: 700 }}>
              {author.summonerName}
            </Typography>
            {voice.toUpperCase() === 'Y' ? (
              <span>
                <MicIcon sx={{ fontSize: 16, transform: 'translateY(2px)' }} />
              </span>
            ) : null}
          </Box>
        </FlexCol>
        <FlexCol
          sx={{
            width: 100
          }}>
          <FlexRow>
            <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>주 포지션</Typography>
          </FlexRow>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
            <Box
              component='img'
              src={positionInfo.find(elem => elem.id === author.mostPosition).image}
              loading='lazy'
              alt={author.mostPosition}
              sx={{
                height: 24,
                width: 24,
                mr: 1,
                mixBlendMode: 'exclusion'
              }}
            />
            <Typography component='span' sx={{ fontSize: 16, fontWeight: 700 }}>
              {positionInfo.find(elem => elem.id === author.mostPosition).kor}
            </Typography>
          </Box>
        </FlexCol>
        <FlexCol
          sx={{
            width: 71
          }}>
          <FlexRow>
            <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>K/D</Typography>
          </FlexRow>
          <FlexRow>
            <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{killDeath} : 1</Typography>
          </FlexRow>
          <FlexRow>
            <Typography sx={{ color: 'grey', fontSize: 12 }}>
              {author.kill} / {author.death}
            </Typography>
          </FlexRow>
        </FlexCol>
      </FlexRow>
      <FlexRow
        sx={{
          pt: 1
        }}>
        <FlexCol
          sx={{
            width: 171
          }}>
          <FlexRow>
            <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>티어</Typography>
          </FlexRow>
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
                src={rank_emblems[author.tier]}
                loading='lazy'
                alt={author.tier}
                sx={{
                  transform: 'scale(0.11)'
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
                ml: 1
              }}>
              <Typography
                sx={{ fontSize: 14, fontWeight: 500 }}
                color={tierInfo.find(elem => elem.id === author.tier).color}>
                {author.tier === 'GRANDMASTER' ? 'GM' : author.tier.slice(0, 1)}
                {author.rank === 'I'
                  ? 1
                  : author.rank === 'II'
                  ? 2
                  : author.rank === 'III'
                  ? 3
                  : author.rank === 'IV'
                  ? 4
                  : ''}{' '}
                - {author.competitivePoints}
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                {author.wins}승 {author.losses}패
                <Typography
                  component='span'
                  sx={{ fontSize: 12, fontWeight: 700, ml: 0.5 }}
                  color={winRate >= 50 ? '#5383e8' : '#D64E5B'}>
                  ({winRate}%)
                </Typography>
              </Typography>
            </Box>
          </Box>
        </FlexCol>
        <FlexCol sx={{ width: 171 }}>
          <FlexRow>
            <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>모스트 챔피언</Typography>
          </FlexRow>
          <FlexRow>
            <img
              src='https://www.hungryapp.co.kr/rank/overwatch/img/hero_thum/icon-portrait.03Fcx.png'
              alt=''
              width='40px'
              height='40px'
            />
            <img
              src='https://www.hungryapp.co.kr/rank/overwatch/img/hero_thum/icon-portrait.03Fcx.png'
              alt=''
              width='40px'
              height='40px'
            />
            <img
              src='https://www.hungryapp.co.kr/rank/overwatch/img/hero_thum/icon-portrait.03Fcx.png'
              alt=''
              width='40px'
              height='40px'
            />

            {/* <ImageList sx={{ m: 0, p: 0 }} cols={3} gap={1}>
              {author.mostPosition.map((item, index) => (
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
            </ImageList> */}
          </FlexRow>
        </FlexCol>
      </FlexRow>
    </Fragment>
  );
};

export default CardAuthor;
