import { Button, Box } from '@mui/material';

import kakao_login_symbol from './kakao_login_symbol.png';

const KakaoLoginBtn = (props) => {
  return (
    <Button
      href={props.href}
      sx={{
        width: '30rem',
        height: '4rem',
        backgroundColor: '#FEE500',
        color: '#000000',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '1.3rem',
        '&:hover': {
          backgroundColor: '#e3cd07',
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
      {props.children} 
    </Button>
  );
};

export default KakaoLoginBtn;
