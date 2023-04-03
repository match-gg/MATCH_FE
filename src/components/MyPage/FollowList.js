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
        paddingLeft: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingTop: 2,
        }}
      >
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
            my: 4,
            pr: 4,
          }}
        >
          
        </Box>
      </Box>
    </Box>
  );
};

export default FollowList;
