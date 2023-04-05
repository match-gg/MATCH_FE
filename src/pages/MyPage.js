import { Fragment } from 'react';

import { Box, Typography } from '@mui/material';

import MyPageBody from '../components/MyPage/MyPageBody';
import LolPageNavbar from '../components/main/lol/LolPageNavbar';

const MyPage = () => {
  return (
    <Fragment>
      <LolPageNavbar />
      <MyPageBody />
    </Fragment>
  );
};

export default MyPage;
