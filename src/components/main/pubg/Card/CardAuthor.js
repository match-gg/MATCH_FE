import { Fragment } from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';

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
            alignItems: 'flex-start',
          }}
        >
          <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>
            작성자 닉네임
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
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
            width: 171,
          }}
        >
          <FlexRow>
            <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>
              RP(Rating Point)
            </Typography>
          </FlexRow>
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
              src={'https://opgg-pubg-static.akamaized.net/images/tier/competitive/Gold-3.png'}
              loading='lazy'
              alt={author.mostLane}
              sx={{
                height: 24,
                width: 24,
                mr: 1,
              }}
            />
            {/* 랭크 이미지는 이미지 CDN 작업 이후에 추가할 예정 */}
            <Typography component='span' sx={{ fontSize: 16, fontWeight: 700 }}>
              {author.ratingPoint}
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
            width: 70,
          }}
        >
          <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>K/D</Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color:
                author.kill_summary / author.death_summary > 4
                  ? 'red'
                  : author.kill_summary / author.death_summary > 2.5
                  ? 'orange'
                  : 'black',
            }}
          >
            {(author.kill_summary / author.death_summary).toFixed(2)}
          </Typography>
        </FlexCol>
        <FlexCol sx={{ width: 101 }}>
          <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>
            경기 당 데미지
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color:
                author.avgDmgDealt > 400 ? 'red' : author.avgDmgDealt > 250 ? 'orange' : 'black',
            }}
          >
            {author.avgDmgDealt.toFixed(2)}
          </Typography>
        </FlexCol>
        <FlexCol
          sx={{
            width: 85,
          }}
        >
          <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>Top 1%</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
            {((author.totalWin / author.totalPlayed) * 100).toFixed(1)}%
          </Typography>
        </FlexCol>
        <FlexCol sx={{ width: 86 }}>
          <Typography sx={{ color: 'grey', fontSize: 12, fontWeight: 700 }}>Top 10%</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700 }}>
            {((author.totalTop10 / author.totalPlayed) * 100).toFixed(1)}%
          </Typography>
        </FlexCol>
      </FlexRow>
    </Fragment>
  );
};

export default CardAuthor;
