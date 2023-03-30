import {
  Typography,
  Button,
  Divider,
  Box,
  Collapse,
} from '@mui/material';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Fragment } from 'react';

const ViewDetail = ({ data }) => {
  // 파티원 상세보기에서 쓸 임시 데이터 (닉네임, 좋아요 수, 싫어요 수)
  const { name, likeCount, dislikeCount } = data;

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          p: 1,
          bgcolor: '#f1f1f1'
        }}>
        <Typography
          sx={{
            fontSize: 18,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            pr: 3
          }}>
          {name} 님이 받은 평가
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            mr: 4
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', p: 1 }}>
            <ThumbUpOffAltIcon sx={{ mr: 1 }} />
            <Typography>{likeCount}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', p: 1 }}>
            <ThumbDownOffAltIcon sx={{ mr: 1 }} />
            <Typography>{dislikeCount}</Typography>
          </Box>
        </Box>
        <Button
          variant='contained'
          size='small'
          sx={{
            bgcolor: 'rgba(60, 57, 57, 0.7)',
            '&:hover': {
              bgcolor: 'rgba(60, 57, 57, 0.9)'
            }
          }}>
          <PersonAddAltIcon fontSize='small' sx={{ mr: 1 }} />
          팔로우
        </Button>
      </Box>
    </Fragment>
  );
};

export default ViewDetail;