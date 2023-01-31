import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';

const Kakao = (props) => {
  // const dispatch = useDispatch();

  let params = new URL(document.URL).searchParams;
  let code = params.get('code');
  

  console.log(code); // 인가코드

  // useEffect( () => {
  //   const fetchData = async () => {
  //     const response = await dispatch();
  //   };

  //   fetchData();
  // }, [dispatch]);

  return (
    <Container>
      <Grid>
        <Typography>잠시만 기다려 주세요! 로그인 중입니다.</Typography>
      </Grid>
    </Container>
  );
};

export default Kakao;
