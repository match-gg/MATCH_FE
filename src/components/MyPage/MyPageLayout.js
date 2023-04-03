import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Box, Button, Dialog, Container, DialogTitle, DialogContent, DialogContentText,DialogActions } from '@mui/material';

import { api } from '../../api/api';
import MyPageHeader from './MyPageHeader';
import Sidebar from './Sidebar';
import MyInfo from './MyInfo';
import FollowList from './FollowList';
import PersonalInfo from './PersonalInfo';
import Withdraw from './Withdraw';

const MyPageLayout = () => {
  const navigate = useNavigate();

  // state for menu switch
  const [menu, setMenu] = useState('my_info');

  // state for store user info
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
    created: '',
  });

  // state for open/close dialog
  const [openDialog, setOpenDialog] = useState(false);

  // close dialog handler 
  const DialogCloseHandler = () => {
    setOpenDialog(false);
    navigate(-1);
  }

  const chooseMenuHandler = (selectedMenu) => {
    setMenu(selectedMenu);
  };

  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  useEffect(() => {
    const getUserDataHandler = async () => {
      await api
        .get('/api/user/info', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Refresh-Token': refreshToken,
          },
        })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((error) => {
          setOpenDialog(true)
        });
    };

    getUserDataHandler();
  }, []);

  return (
    <Container maxWidth='md' sx={{ height: 'calc(100vh - 100px)' }}>
      <Dialog
        maxWidth='sm'
        fullWidth
        open={openDialog}
        onClose={DialogCloseHandler}
        PaperProps={{ backdrop: { onClick: (e) => {e.stopPropagation()} } }}>
          <DialogTitle>사용자 정보 조회 오류</DialogTitle>
          <DialogContent>
            <DialogContentText>사용자 정보를 불러오는 과정에서 문제가 발생했습니다.</DialogContentText>
            <DialogContentText>잠시 후, 다시 시도해주시기 바랍니다.</DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={DialogCloseHandler}>이전페이지로 돌아갑니다.</Button>
        </DialogActions>
        </Dialog>
      <MyPageHeader />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
        }}
      >
        <Sidebar onChangeMenu={chooseMenuHandler} menu={menu} />
        <Box
          sx={{
            height: 'calc(100vh - 150px)',
            width: '70%',
          }}
        >
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
