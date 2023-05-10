import React from 'react';
import { api } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { Box, Button } from '@mui/material';

import Copyright from '../ui/Copyright';
import { userActions } from '../../store/user-slice';
import { tokenActions } from '../../store/token-slice';
import { registerActions } from '../../store/register-slice';

const RegisterFooter = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { phase, increasePhase, decreasePhase } = props;

  const { firstTerm, secondTerm, games, gamesCheck, representative } = useSelector(
    (state) => state.register
  );

  const phaseOneNextBtn =
    gamesCheck.lol &&
    gamesCheck.lostark &&
    gamesCheck.maplestory &&
    gamesCheck.pubg &&
    gamesCheck.overwatch;

  const signUpHandler = async () => {
    // 1. 인가코드 가져오기
    const params = new URL(document.URL).searchParams;
    const code = params.get('code');

    // 2. 인가코드로 카카오 액세스 토큰 발급
    const {
      data: { access_token: kakaoAccessToken },
    } = await api('https://kauth.kakao.com/oauth/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_REST_API_KEY,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        code,
      },
    }).catch((error) => {
      alert('카카오 연결 중 문제가 발생했습니다.\n잠시후 다시 시도해 주세요.');
      navigate('/login');
    });

    // send request
    const response = await api
      .post(`/api/user/signup`, {
        oauth2AccessToken: kakaoAccessToken,
        representative: representative.toUpperCase(),
        lol: games.lol,
        overwatch: games.overwatch,
        pubg: games.pubg,
        lostark: games.lostark,
        maplestory: games.maplestory,
      })
      .catch((error) => {
        if (error.response.status === 400 && error.response.data.message === '이미 존재하는 회원입니다.') {
          alert('이미 존재하는 회원입니다.\n로그인 페이지로 이동합니다.');
          navigate('/login');
        } else {
          alert('회원가입 중 문제가 발생했습니다.\n다시 시도해 주세요.'); // mui dialog 이용해서 바꿀 예정
          navigate('/login');
        }
      });

    if (response.status === 200) {
      alert('회원가입이 완료되었습니다.\n로그인 페이지로 이동합니다.');
      navigate('/login');
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
        disabled={phase === 0 ? !firstTerm || !secondTerm : phase === 1 ? !phaseOneNextBtn : false}
        onClick={() => {
          if (phase === 2) {
            signUpHandler();
          } else {
            increasePhase();
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
        {phase !== 2 ? '다음으로' : '회원가입 하기'}
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
