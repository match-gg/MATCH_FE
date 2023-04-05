import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { tokenActions } from '../store/token-slice';
import { userActions } from '../store/user-slice';
import { api } from '../api/api';

import { CircularProgress, Box, Typography } from '@mui/material';

import SimpleLayout from '../components/ui/SimpeLayout';

const KakaoLoginRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          redirect_uri: process.env.REACT_APP_REDIRECT_URI_LOGIN,
          code,
        },
      });

      // 3. 액세스 토큰을 담아 로그인 요청 보내기
      const response = await api
        .post('/api/user/signin', {
          oauth2AccessToken: kakaoAccessToken,
        })
        .catch((error) => {
          // 에러코드 분리해서 코드별로 동작 분리해야 함.
          alert('로그인에 실패했습니다.');
          navigate('/login');
        });

      const { accessToken, refreshToken } = response.data;

      // 액세스 토큰과 리프레쉬 토큰을 각각 앱과, 로컬스토리지에 저장.
      dispatch(tokenActions.SET_TOKEN(accessToken));
      localStorage.setItem('matchGG_refreshToken', refreshToken);

      // 액세스 토큰에서 사용자 정보 decode
      const jwtPayload = jwt_decode(accessToken);
      const { nickname, imageUrl, representative } = jwtPayload;

      // 앱에 사용자 정보 저장.
      dispatch(userActions.SET_USER({ nickname, profile_image: imageUrl, representative }));

      // 사용자가 설정한 대표 게임으로 navigate
      navigate(`${representative}`);
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
          로그인 중 입니다. 잠시만 기다려 주세요.
        </Typography>
      </Box>
    </SimpleLayout>
  );
};

export default KakaoLoginRedirect;
