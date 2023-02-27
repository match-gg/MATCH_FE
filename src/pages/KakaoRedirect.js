import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { tokenActions } from '../store/token-slice';
import { userActions } from '../store/user-slice';
import { api } from '../api/api';

import { CircularProgress, Box, Typography } from '@mui/material';

import SimpleLayout from '../components/ui/SimpeLayout';

const KakaoRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [kakaoAccessToken, setKakaoAccessToken] = useState('');

  useEffect(() => {
    const kakaoLogin = async () => {
      const kakaoLogin = async () => {
        // 1. 페이지 URL에서 인가코드 받아오기
        let params = new URL(document.URL).searchParams;
        let code = params.get('code');

        // 2. 토큰을 서버로 전송해 가입 여부 확인하기
        const response = await api
          .post(`http://localhost:8080/api/user/signup`, {
            kakaoAuthCode: code,
          })
          .catch(async (error) => {
            if (error.response.status === 400 && error.response.data['status']) {
              const response = await api.post(`http://localhost:8080/api/user/signin`, {
                kakaoAuthCode: code,
              });

              const { accessToken, refreshToken } = response.data['jwtToken'];

              dispatch(tokenActions.SET_TOKEN(accessToken));
              localStorage.setItem('matchGG_refreshToken', refreshToken);
              navigate('/leagueoflegends');
            } else {
              alert(`비정상적인 접근입니다.`);
            }
          });

        const { accessToken, refreshToken } = response.data['jwtToken'];

        dispatch(tokenActions.SET_TOKEN(accessToken));
        localStorage.setItem('matchGG_refreshToken', refreshToken);

        navigate('/register');
      };
    };
    
    kakaoLogin();
  }, [dispatch, navigate]);

  return (
    <SimpleLayout>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <CircularProgress />
        <Typography component='h2' variant='h4'>
          잠시만 기다려 주세요!
        </Typography>
      </Box>
    </SimpleLayout>
  );
};

export default KakaoRedirect;
