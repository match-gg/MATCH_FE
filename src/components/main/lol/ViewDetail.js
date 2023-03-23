import {
  Typography,
  Button,
  Divider,
  Box,
} from '@mui/material';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Fragment } from 'react';

const ViewDetail = props => {
  // 파티원 평가 정보 임시 값
  const like = 50;
  const dislike = 12;

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
          bgcolor: '#f1f1f1',
          borderRadius: 2
        }}>
        <Typography
          sx={{
            fontSize: 18,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            pr: 2
          }}>
          {props.nickname} 님의 정보
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            bgcolor: '#D9D9D9',
            borderRadius: 4,
            mr: 3
          }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', p: 1 }}>
            <ThumbUpOffAltIcon sx={{ mr: 1 }} />
            <Typography>{like}</Typography>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', p: 1 }}>
            <ThumbDownOffAltIcon sx={{ mr: 1 }} />
            <Typography>{dislike}</Typography>
          </Box>
        </Box>
        <Button variant='contained' size='small'>
          팔로우
        </Button>
      </Box>
    </Fragment>
  );
}

export default ViewDetail;