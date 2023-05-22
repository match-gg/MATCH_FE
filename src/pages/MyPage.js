import { Fragment } from 'react';

import { Box, Typography } from '@mui/material';

import MyPageBody from '../components/MyPage/MyPageBody';
import MainHeader from '../components/main/MainHeader';

const MyPage = () => {
  return (
    <Fragment>
      <MainHeader />
      <MyPageBody />
    </Fragment>
  );
};

export default MyPage;
