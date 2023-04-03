import { Fragment } from 'react';

import { Box, Typography } from '@mui/material';

import MyPageLayout from '../components/MyPage/MyPageLayout';
import LolPageNavbar from '../components/main/lol/LolPageNavbar';

const MyPage = () => {
  return (
    <Fragment>
      <LolPageNavbar />
      <Box
        sx={{
          pt: 16,
          height: '100%',
          backgroundColor: '#f3f3f3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MyPageLayout />
      </Box>
    </Fragment>
  );
};

export default MyPage;
