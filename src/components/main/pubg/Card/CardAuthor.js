import { Fragment } from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';

import { rankInfo } from './CardAuthor.d';

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

  return (
    <Fragment>
      <FlexRow>
        <FlexCol
          sx={{
            width: 171,
            alignItems: 'flex-start'
          }}>
          <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>닉네임</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Typography component='span' sx={{ fontSize: 16, fontWeight: 700 }}>
              {author.name}
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
            width: 171
          }}>
          <FlexRow>
            <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>RP(Rating Point)</Typography>
          </FlexRow>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
            {author.currentRankPoint !== 0 && (
              <Box
                component='img'
                src={rankInfo[author.tier.toUpperCase() + author.subTier]}
                loading='lazy'
                alt={author.tier}
                sx={{
                  height: 24,
                  width: 24,
                  mr: 0.5
                }}
              />
            )}
            <Typography component='span' sx={{ fontSize: 16, fontWeight: 700 }}>
              {author.currentRankPoint === 0 ? '랭크 정보 없음' : author.currentRankPoint}
            </Typography>
          </Box>
        </FlexCol>
      </FlexRow>
      <FlexRow
        sx={{
          pt: 2
        }}>
        <FlexCol
          sx={{
            width: 70
          }}>
          <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>K/D</Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: author.kills / author.deaths > 4 ? 'red' : author.kills / author.deaths > 2.5 ? 'orange' : 'black'
            }}>
            {(author.kills / author.deaths).toFixed(2)}
          </Typography>
        </FlexCol>
        <FlexCol sx={{ width: 101 }}>
          <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>경기 당 데미지</Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: author.avgDmg > 400 ? 'red' : author.avgDmg > 250 ? 'orange' : 'black'
            }}>
            {author.avgDmg.toFixed(2)}
          </Typography>
        </FlexCol>
        <FlexCol
          sx={{
            width: 85
          }}>
          <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>Top 1</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
            {((author.wins / author.totalPlayed) * 100).toFixed(1)}%
          </Typography>
        </FlexCol>
        <FlexCol sx={{ width: 86 }}>
          <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>Top 10</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
            {((author.top10 / author.totalPlayed) * 100).toFixed(1)}%
          </Typography>
        </FlexCol>
      </FlexRow>
    </Fragment>
  );
};

export default CardAuthor;
