import { Box, Typography, Button } from '@mui/material';

const Withdraw = () => {
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
          paddingTop: 2,
        }}
      >
        <Box>
          <Typography variant='h6' sx={{ color: 'black', fontWeight: '600' }}>
            탈퇴하기
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 20 }}>
          <Typography
            variant='h4'
            sx={{
              color: 'black',
              fontWeight: '600',
            }}
          >
            정말 탈퇴하시겠습니까?
          </Typography>
          <Typography
            sx={{
              paddingTop: 2,
              fontSize: 'small',
              fontWeight: '600',
              color: '#9E9E9E',
            }}
          >
            탈퇴하시면 더이상 서비스를 이용할 수 없게 되며,
          </Typography>
          <Typography
            sx={{
              fontSize: 'small',
              fontWeight: '600',
              color: '#9E9E9E',
            }}
          >
            기존 정보들이 모두 사라지게 됩니다.
          </Typography>
          <Button
            variant='outlined'
            color='error'
            sx={{
              marginTop: 2,
              fontWeight: '800',
            }}
          >
            탈퇴하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Withdraw;
