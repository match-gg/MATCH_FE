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
  const [userInfo, setUserInfo] = useState({
    id: -1,
    oauth2Id: '',
    nickname: '',
    email: '',
    imageUrl: '',
    representative: '',
    lol: '',
    overwatch: '',
    pubg: '',
    maplestory: '',
    lostark: '',
    likeCount: 0,
    dislikeCount: 0,
    matchCount: 0,
    regDate: ''
  });

  const chooseMenuHandler = selectedMenu => {
    setMenu(selectedMenu);
  };

  const { accessToken } = useSelector(state => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  useEffect(() => {
    const getUserDataHandler = async () => {
      await api
        .get('/api/user/info', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken
          }
        })
        .then(res => {
          setUserInfo({...res.data});
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
          {menu === 'my_info' && <MyInfo userInfo={userInfo} />}
          {menu === 'follow_list' && <FollowList />}
          {menu === 'personal_info' && <PersonalInfo userInfo={userInfo} />}
          {menu === 'withdraw' && <Withdraw />}
        </Box>
      </Box>
    </Container>
  );
};

export default MyPageLayout;
