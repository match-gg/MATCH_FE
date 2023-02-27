import { Box, Container } from '@mui/material';

import { useState } from 'react';

import MyPageHeader from './MyPageHeader';
import Sidebar from './Sidebar';
import MyInfo from './MyInfo';
import FollowList from './FollowList';
import PersonalInfo from './PersonalInfo';
import Withdraw from './Withdraw';

const MyPageLayout = () => {
  const [menu, setMenu] = useState('my_info');

  const chooseMenuHandler = selectedMenu => {
    setMenu(selectedMenu);
  };

  return (
    <Container maxWidth='md' sx={{ height: 'calc(100vh - 100px)' }}>
      <MyPageHeader />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%'
        }}>
        <Sidebar onChangeMenu={chooseMenuHandler} menu={menu} />
        <Box
          sx={{
            height: 'calc(100vh - 150px)',
            width: '70%'
          }}>
          {menu === 'my_info' && <MyInfo />}
          {menu === 'follow_list' && <FollowList />}
          {menu === 'personal_info' && <PersonalInfo />}
          {menu === 'withdraw' && <Withdraw />}
        </Box>
      </Box>
    </Container>
  );
};

export default MyPageLayout;
