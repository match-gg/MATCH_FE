import { Button, Box } from '@mui/material';

import kakao_login_symbol from './kakao_login_symbol.png';

const KakaoLoginBtn = () => {
  return (
    <Button
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`}
      sx={{
        width: '30rem',
        height: '4rem',
        backgroundColor: '#FEE500',
        color: '#000000',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '1.3rem',
        '&:hover': {
          backgroundColor: '#FEE500',
          color: '#000000',
        },
      }}
    >
      <Box
        component='img'
        sx={{ height: '2rem', position: 'absolute', left: '2rem' }}
        alt='kakao'
        src={kakao_login_symbol}
      />
      카카오로 시작하기
    </Button>
  );
};

export default KakaoLoginBtn;
