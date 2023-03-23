import { Box, Typography } from '@mui/material';
import FollowItem from './FollowItem.js';

const FollowList = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        paddingLeft: 4
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingTop: 2
        }}>
        <Typography variant='h6' sx={{ color: 'black', fontWeight: '600' }}>
          팔로우 목록
        </Typography>
        <Box
          component='div'
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'auto',
            gap: 2,
            height: '100%',
            marginTop: 2,
            background: '#f8f8f8',
            borderRadius: 4,
            pt: 2
          }}>
          <FollowItem />
          <FollowItem />
          <FollowItem />
          <FollowItem />
          <FollowItem />
          <FollowItem />
          <FollowItem />
        </Box>
      </Box>
    </Box>
  );
};

export default FollowList;
