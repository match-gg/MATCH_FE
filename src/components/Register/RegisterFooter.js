import React from 'react';
import { api } from '../../api/api';

import { Box, Button } from '@mui/material';

import Copyright from '../ui/Copyright';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterFooter = (props) => {
  const navigate = useNavigate();

  const { phase, increasePhase, decreasePhase, termAllChecked, handleNextBtn, registerInfo } = props;
  const { accessToken } = useSelector((state) => state.token);

  const registerHandler = async () => {
    const refreshToken = localStorage.getItem('matchGG_refreshToken');

    // setting headers
    const headers = {
      // single quote around Authorization is required.
      'Authorization': accessToken,
      'Refresh-Token': refreshToken,
    };

    const {favGame, games} = registerInfo;

    const requestData = {
      representative: favGame.toUpperCase(),
      lol: games.lol,
      overwatch: games.overwatch,
      pubg: games.pubg,
      lostark: games.lostark,
      maplestory: games.maplestory,
    };

    // console.log('requestHeaders :' + JSON.stringify(headers));
    // console.log('requestData: ' + JSON.stringify(requestData));

    // send request
    const response = await api.post(
      `/api/user/register`,
      { ...requestData },
      { headers }
    ).catch((error)=> {
      alert('회원가입 중 문제가 발생했습니다.\n다시 시도해 주세요.') // mui dialog 이용해서 바꿀 예정
      navigate('/login');
    } )

    // console.log(response);
    if (response.status === 201) {
      increasePhase();
    }
  };

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
          if (phase === 2) {
            registerHandler();
          } else {
            increasePhase();
            handleNextBtn();
          }
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
