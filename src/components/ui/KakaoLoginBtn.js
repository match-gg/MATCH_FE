import { Button, Box } from '@mui/material';

import kakao_login_symbol from './kakao_login_symbol.png';
import { KAKAO_AUTH_URL } from '../../OAuth';

const KakaoLoginBtn = () => {
  return (
    <Button
      href={KAKAO_AUTH_URL}
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
        alt='kakao_login_symbol'
        src={kakao_login_symbol}
      />
      카카오로 시작하기
    </Button>
  );
};

export default KakaoLoginBtn;
