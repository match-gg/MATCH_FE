import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CircularProgress, Box, Typography } from '@mui/material';

import SimpleLayout from '../components/ui/SimpeLayout';

const SERVER_URL = '';

const KakaoRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoLogin = () => {
      // 1. 페이지 URL에서 인가코드 받아오기
      let params = new URL(document.URL).searchParams;
      let code = params.get('code');

      // 2. server 로 인가코드 전달 ( queryString )
      axios.get(`${SERVER_URL}/api/auth?code=${code}`).then((response) => {
        console.log(response);

        // refreshToken -> cookie with HTTP Only and Secure
        // accessToken -> Redux Store
      });
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
