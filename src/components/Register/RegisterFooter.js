import React from 'react';

import { Box, Button } from '@mui/material';

import Copyright from '../ui/Copyright';

const RegisterFooter = (props) => {
  const { phase, increasePhase, decreasePhase, termAllChecked, handleNextBtn } =
    props;

  return (
    <Box
      component='div'
      sx={{
        position: 'fixed',
        bottom: 0,
        height: { xs: 70, sm: 100 },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'center',
        backgroundColor: 'white',
        gap: 4,
        width: '100vw',
      }}
    >
      <Button
        onClick={decreasePhase}
        variant='contained'
        sx={{
          marginTop: { xs: 1, sm: 3 },
          width: { xs: 150, sm: 300 },
          height: { xs: 30, sm: 40 },
          fontSize: { xs: 20, sm: 25 },
          fontWeight: '500',
          backgroundColor: '#939393',
          border: '1.5px solid white',
          borderRadius: '10px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '2',
            backgroundColor: '#939393',
          },
        }}
      >
        이전으로
      </Button>
      <Button
        disabled={!termAllChecked}
        onClick={() => {
          increasePhase();
          handleNextBtn();
        }}
        variant='contained'
        sx={{
          marginTop: { xs: 1, sm: 3 },
          width: { xs: 150, sm: 300 },
          height: { xs: 30, sm: 40 },
          fontSize: { xs: 20, sm: 25 },
          fontWeight: '500',
          backgroundColor: '#939393',
          border: '1.5px solid white',
          borderRadius: '10px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '2',
            backgroundColor: '#939393',
          },
        }}
      >
        {phase !== 2 ? '다음으로' : '회원가입하기'}
      </Button>
      <Copyright
        sx={{
          position: 'absolute',
          bottom: 0,
          fontSize: { xs: 13, sm: 15 },
          width: 500,
        }}
      />
    </Box>
  );
};

export default RegisterFooter;