import { Typography, Button, Card, CardContent, Box } from '@mui/material';

import lolIcon from '../Register/logo_images/LoL_Icon_Flat_BLACK.png';

const FollowItem = () => {
  return (
    <Card
      sx={{
        height: 48,
        width: 360,
        flexShrink: '0'
      }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          p: 0,
          '&:last-child': { pb: 0 }
        }}>
        <Box
          sx={{
            display: 'flex',
            height: 32,
            width: 32,
            objectFit: 'cover',
            margin: '0 12px'
          }}>
          <img src={lolIcon} alt='게임 아이콘'></img>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: 224
          }}>
          <Typography variant='h7' sx={{ fontWeight: 700 }}>
            밍꾸라지
          </Typography>
        </Box>
        <Button
          size='small'
          sx={{
            background: '#F39090',
            color: 'black',
            fontWeight: '800',

            '&:hover': {
              background: '#F75B5B'
            }
          }}>
          취소
        </Button>
      </CardContent>
    </Card>
  );
};

export default FollowItem;
