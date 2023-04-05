import { Fragment } from 'react';

import { Typography, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ProgressBar from '@ramonak/react-progress-bar';

import React from 'react';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


const ViewDetail = ({ data }) => {
  // 파티원 상세보기에서 쓸 임시 데이터 (닉네임, 좋아요 수)
  const { matchCount, likeCount, dislikeCount } = data;

  // 매칭 수 대비 좋아요 비율
  const likeRate = ((likeCount / (likeCount + dislikeCount)) * 100).toFixed(1);

  // 매칭 수 100 단위로 내림해서 저장 ex) 127 -> 100 , 298 -> 200
  const matchCountMask = Math.floor(matchCount / 100) * 100;

  const theme = createTheme({
    palette: {
      follow: {
        main: 'rgba(60, 57, 57, 0.7)',
        contrastText: 'rgba(60, 57, 57, 0.7)',
      },
    },
  });

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 64,
          pl: 4,
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '70%',
            px: 2
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              px: 1
            }}>
            <Typography
              sx={{
                fontSize: 14,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
              총 매칭 수 : {matchCount >= 100 ? `${matchCountMask} + ` : '100 -'}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: `${likeRate > 50 ? '#00C73C' : '#ff7f00'}`
              }}>
              {likeRate > 50 ? <SentimentSatisfiedAltIcon /> : <SentimentVeryDissatisfiedIcon />}
              <Typography sx={{ fontSize: 16, overflow: 'hidden', textOverflow: 'ellipsis', pl: 1 }}>
                {likeRate}%
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              m: 1
            }}>
            {likeRate > 50 ? (
              <ProgressBar
                completed={likeRate}
                baseBgColor='#e0e0de'
                bgColor='#00C73C'
                height='15px'
                isLabelVisible={false}
              />
            ) : (
              <ProgressBar
                completed={likeRate}
                baseBgColor='#e0e0de'
                bgColor='#ff7f00'
                height='15px'
                isLabelVisible={false}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '30%'
          }}>
          <ThemeProvider theme={theme}>
            <Button variant='text' size='small' color='follow'>
              <PersonAddAltIcon fontSize='small' sx={{ mr: 1 }} />
              팔로우
            </Button>
          </ThemeProvider>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ViewDetail;