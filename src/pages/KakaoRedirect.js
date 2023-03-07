import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

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
      // 1. 페이지 URL에서 인가코드 받아오기
      let params = new URL(document.URL).searchParams;
      let code = params.get('code');

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
      });

      // 3. 토큰을 서버로 전송해 가입 여부 확인하기
      const response = await api
        .post(`/api/user/signup`, {
          oauth2AccessToken: kakaoAccessToken,
        })
        .catch(async (error) => {
          if (error.response.status === 400 && error.response.data['status']) {
            // signin flow 로 전환.
            const response = await api.post(`/api/user/signin`, {
              oauth2AccessToken: kakaoAccessToken,
            });
            const { accessToken, refreshToken } = response.data;

            dispatch(tokenActions.SET_TOKEN(accessToken));
            localStorage.setItem('matchGG_refreshToken', refreshToken);
            const jwtPayload = jwt_decode(accessToken);
            console.log(jwtPayload);

            dispatch(userActions.SET_USER(jwtPayload));

            navigate('/lol');
          } else {
            alert('비정상적인 접근입니다.');
          }
        });

      // error 없이 회원가입 프로세스 진행
      const { accessToken, refreshToken } = response.data['jwtToken'];

      dispatch(tokenActions.SET_TOKEN(accessToken));
      localStorage.setItem('matchGG_refreshToken', refreshToken);
      const jwtPayload = jwt_decode(accessToken);
      console.log(jwtPayload);

      dispatch(userActions.SET_USER(jwtPayload));

      navigate('/register');
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
