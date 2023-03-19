import { api } from '../../api/api';

import { Box, Container } from '@mui/material';

import { useState, useEffect } from 'react';

import MyPageHeader from './MyPageHeader';
import Sidebar from './Sidebar';
import MyInfo from './MyInfo';
import FollowList from './FollowList';
import PersonalInfo from './PersonalInfo';
import Withdraw from './Withdraw';
import { useSelector } from 'react-redux';

const MyPageLayout = () => {
  const [menu, setMenu] = useState('my_info');
  const [userData, setUserData] = useState();

  const chooseMenuHandler = selectedMenu => {
    setMenu(selectedMenu);
  };

  const { accessToken } = useSelector(state => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  useEffect(() => {
    const getUserDataHandler = async () => {
      await api
        .get('/api/user/info', null, {
          headers: {
            Authorization: accessToken,
            'Refresh-Token': refreshToken
          }
        })
        .then(res => {
          setUserData(res.data);
          console.log(res.data);
        })
        .catch(error => {
          console.log('회원정보를 가져오는 중 문제가 발생했습니다.\n다시 시도해 주세요');
          console.log(error);
        });
    };

    getUserDataHandler();
  }, [accessToken, refreshToken]);

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
          {menu === 'my_info' && <MyInfo userData={userData} />}
          {menu === 'follow_list' && <FollowList />}
          {menu === 'personal_info' && <PersonalInfo userData={userData} />}
          {menu === 'withdraw' && <Withdraw />}
        </Box>
      </Box>
    </Container>
  );
};

export default MyPageLayout;
