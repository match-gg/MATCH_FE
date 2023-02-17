import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { tokenActions } from '../store/token-slice';
import { userActions } from '../store/user-slice';

import { CircularProgress, Box, Typography } from '@mui/material';

import SimpleLayout from '../components/ui/SimpeLayout';

const KakaoRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoLogin = async () => {
      // 1. 페이지 URL에서 인가코드 받아오기
      let params = new URL(document.URL).searchParams;
      let code = params.get('code');


      // 2. 인가코드로 카카오 액세스 토큰 발급받기
      try {
        const {
          data: { access_token: kakaoAccessToken },
        } = await axios('https://kauth.kakao.com/oauth/token', {
          params: {
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_REST_API_KEY,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            code: code,
          },
        });

        // 3. 토큰을 서버로 전송해 가입 여부 확인하기
        const response = await axios.post(`${process.env}/api/user/signup`, {
          oauth2AccessToken : kakaoAccessToken,
        })

        // 4. reponse 확인해서 로그인 처리 / 회원가입 플로우로 이동

      } catch (e) {
        console.log(e);
      }
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
