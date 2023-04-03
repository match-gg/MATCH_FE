import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  Box,
  Button,
  Dialog,
  Container,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

import { api } from '../../api/api';
import Sidebar from './Sidebar';
import MyInfo from './MyInfo';
import FollowList from './FollowList';
import Withdraw from './Withdraw';
import GamesInfo from './GamesInfo';

const MyPageBody = () => {
  const navigate = useNavigate();

  // state for menu switch
  const [menu, setMenu] = useState('my_info');

  // state for store user info
  const [userInfo, setUserInfo] = useState({
    id: -1,
    oauth2Id: '',
    nickname: '엽_',
    email: '',
    imageUrl: '',
    representative: '',
    lol: '완도수산새우도둑',
    valorant: 'pmthk',
    overwatch: '',
    pubg: '',
    maplestory: '',
    lostark: '',
    likeCount: 85,
    dislikeCount: 62,
    matchCount: 147,
    created: '',
  });

  // state for open/close dialog
  const [openDialog, setOpenDialog] = useState(false);

  // close dialog handler
  const DialogCloseHandler = () => {
    setOpenDialog(false);
    // navigate(-1);
  };

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
          setOpenDialog(true);
        });
    };

    getUserDataHandler();
  }, []);

  return (
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
      <Container maxWidth='lg' sx={{ height: 'calc(100vh - 128px)', backgroundColor: '#f3f3f3' }}>
        <Dialog
          maxWidth='sm'
          fullWidth
          open={openDialog}
          onClose={DialogCloseHandler}
          PaperProps={{
            backdrop: {
              onClick: (e) => {
                e.stopPropagation();
              },
            },
          }}
        >
          <DialogTitle>사용자 정보 조회 오류</DialogTitle>
          <DialogContent>
            <DialogContentText>
              사용자 정보를 불러오는 과정에서 문제가 발생했습니다.
            </DialogContentText>
            <DialogContentText>잠시 후, 다시 시도해주시기 바랍니다.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={DialogCloseHandler}>이전페이지로 돌아갑니다.</Button>
          </DialogActions>
        </Dialog>
        <Box
          sx={{
            mt: 5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              height: '100%',
            }}
          >
            <Sidebar onChangeMenu={chooseMenuHandler} menu={menu} userInfo={userInfo} />
            <Box
              sx={{
                height: 640,
                width: '75%',
                backgroundColor: 'white',
                boxShadow: '-4px 0px 8px -6px grey',
                borderTopRightRadius: '8px',
                borderBottomRightRadius: '8px',
                zIndex: 1,
              }}
            >
              {menu === 'my_info' && <MyInfo userInfo={userInfo} />}
              {menu === 'games_info' && <GamesInfo userInfo={userInfo} />}
              {menu === 'follow_list' && <FollowList />}
              {menu === 'withdraw' && <Withdraw />}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MyPageBody;
