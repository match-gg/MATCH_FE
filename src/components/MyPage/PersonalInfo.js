import { Box, Typography } from '@mui/material';

const PersonalInfo = props => {
  const { email, registerDate } = props.userData;

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
          paddingTop: 2
        }}>
        <Box>
          <Typography variant='h6' sx={{ color: 'black', fontWeight: '600' }}>
            개인정보 관리
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 4
          }}>
          <Typography
            variant='h7'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: 'black',
              fontWeight: '700',
              width: 120
            }}>
            이메일
          </Typography>
          <Typography
            sx={{
              width: 360,
              textAlign: 'center',
              background: '#D9D9D9',
              fontWeight: '600',
              borderRadius: 2,
              padding: 1,
              marginLeft: 1
            }}>
            {email || '이메일 정보제공 미동의'}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2
          }}>
          <Typography
            variant='h7'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: 'black',
              fontWeight: '700',
              width: 120
            }}>
            생성일자
          </Typography>
          <Typography
            sx={{
              width: 360,
              textAlign: 'center',
              background: '#B5D0F5',
              fontWeight: '600',
              borderRadius: 2,
              padding: 1,
              marginLeft: 1
            }}>
            {registerDate || '생성일자'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
