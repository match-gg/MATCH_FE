import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '../../api/api';

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Avatar,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  IconButton,
  Stack,
  Button,
  ListItemText,
  Link,
  SwipeableDrawer,
  Badge,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LoginIcon from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/user-slice';
import { tokenActions } from '../../store/token-slice';
import { GameList } from './GameList.d';
import { notificationActions } from '../../store/notification-slice';

const NotiMenuItem = (props) => {
  const { handleNotiClose, title, body } = props;
  const navigate = useNavigate();
  return (
    <MenuItem
      // onClick={handleNotiClose}
      // boardId 값을 가져와야 하네
      onClick={() => navigate('/lol/61')}
      sx={{ borderBottom: '1px solid lightgrey', height: '60px' }}
    >
      <Stack>
        <ListItemText>
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
            {title || `알림 제목 : ${'여기가 알림 제목'}`}
          </Typography>
        </ListItemText>
        <ListItemText>
          <Typography sx={{ fontSize: '14px', color: 'gray' }}>
            {body || `알림 내용 : ${'여기는 알림 내용'}`}
          </Typography>
        </ListItemText>
      </Stack>
    </MenuItem>
  );
};

const MainHeader = ({ game }) => {
  const { isLogin, profile_imageUrl, nickname, representative } = useSelector(
    (state) => state.user
  );
  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');

  const foregroundMessages = useSelector(
    (state) => state.notification.foregroundMessages
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // logout
  const logoutHandler = async () => {
    await api
      .post(`/api/user/logout`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Refresh-Token': refreshToken,
        },
      })
      .then((response) => {
        dispatch(userActions.DELETE_USER());
        dispatch(tokenActions.DELETE_TOKEN());
        dispatch(notificationActions.DELETE_NOTITOKEN());
        navigate('/login');
      })
      .catch((error) => {
        alert('로그아웃 중 문제가 발생했습니다.');
        console.log(error);
      });
  };

  // xs ~ md 간 좌측 Drawer 설정
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  // menu list
  const CurrentGame = GameList.find((elem) => elem.id === game)?.fullName_Kor;

  const linkToLogin = () => {
    navigate('/login');
  };

  // 알림 관련
  const [notiAnchorEl, setNotiAnchorEl] = useState(null);
  const notiOpen = Boolean(notiAnchorEl);

  const handleNotiClick = (e) => {
    setNotiAnchorEl(e.currentTarget);
  };

  const handleNotiClose = () => {
    setNotiAnchorEl(null);
  };

  const deleteAllForegroundMsg = () => {
    dispatch(notificationActions.CLEAR_FOREGROUND_MSG());
  };

  return (
    <AppBar
      component='nav'
      position='fixed'
      sx={{
        backgroundColor: '#3d3939',
        color: 'white',
        height: 72,
        justifyContent: 'center',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          <Button
            onClick={handleDrawerOpen}
            sx={{
              display: { xs: 'flex', md: 'none' },
              p: 0,
              minWidth: 0,
              minHeight: 0,
              mr: 2,
            }}
          >
            <MenuIcon
              sx={{
                color: '#f3f3f3',
                fontSize: { xs: 28 },
              }}
            />
          </Button>
          <SwipeableDrawer
            anchor='left'
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            onOpen={handleDrawerOpen}
          >
            <Box
              sx={{
                minWidth: 320,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: ' center',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 72,
                  backgroundColor: '#3d3939',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 3,
                }}
              >
                <Typography
                  sx={{
                    color: 'white',
                    fontStyle: 'italic',
                    fontSize: { xs: 32, md: 36 },
                    fontWeight: '700',
                  }}
                >
                  Match.GG
                </Typography>
                <Button
                  onClick={handleDrawerClose}
                  sx={{
                    display: { xs: 'flex', md: 'none' },
                    p: 0,
                    minWidth: 0,
                    minHeight: 0,
                  }}
                >
                  <ArrowBackIosNewIcon
                    sx={{
                      color: '#f3f3f3',
                      fontSize: { xs: 28 },
                    }}
                  />
                </Button>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 'calc(100vh - 72px)',
                  pl: 4,
                  pt: 4,
                  backgroundColor: '#f3f3f3',
                }}
              >
                {GameList.map((aGame, index) => {
                  return (
                    <Fragment key={index}>
                      <Button
                        onClick={() => {
                          if (game === aGame.id) {
                            handleDrawerClose();
                          } else {
                            navigate(`/${aGame.id}`);
                          }
                        }}
                        sx={{
                          textDecoration: 'none',
                          color: '#3d3939',
                          '&:hover': {
                            transform: 'scale(1.1) translateX(10px)',
                            backgroundColor: '#f3f3f3',
                          },
                        }}
                      >
                        <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                          {aGame.fullName_Kor}
                        </Typography>
                      </Button>
                      <Divider sx={{ my: 1 }} />
                    </Fragment>
                  );
                })}
              </Box>
            </Box>
          </SwipeableDrawer>
          <Link
            href={`${representative || 'lol'}`}
            underline='none'
            color='white'
            sx={{
              fontStyle: 'italic',
              fontSize: { xs: 32, md: 36 },
              fontWeight: '700',
            }}
          >
            Match.GG
          </Link>
          <Box sx={{ flexGrow: 1 }}>
            <Stack
              direction='row'
              spacing={4}
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Button
                id='demo-positioned-button'
                aria-controls={open2 ? 'demo-positioned-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open2 ? 'true' : undefined}
                onClick={handleClick2}
                sx={{
                  marginLeft: 5,
                  fontSize: 16,
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                {CurrentGame}
                <KeyboardArrowDownIcon />
              </Button>
              <Menu
                id='game-menu'
                aria-labelledby='game-button'
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                PaperProps={{
                  style: {
                    width: 146,
                  },
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {GameList.map((aGame, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        navigate(`/${aGame.id}`);
                      }}
                    >
                      <ListItemText key={index} style={{ textAlign: 'center' }}>
                        {aGame.fullName_Kor}
                      </ListItemText>
                    </MenuItem>
                  );
                })}
              </Menu>
              <Typography
                sx={{
                  marginLeft: 5,
                  fontSize: 14,
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                파티원 모집
              </Typography>
              <Typography
                sx={{
                  marginLeft: 5,
                  fontSize: 14,
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                자유게시판
              </Typography>
            </Stack>
          </Box>
          {isLogin && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Tooltip title='Profile Settings'>
                  <IconButton
                    onClick={handleClick}
                    size='small'
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'profile-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Typography
                      sx={{
                        display: { xs: 'none', sm: 'flex' },
                        color: 'white',
                        fontSize: { xs: 14, sm: 16 },
                        fontWeight: '500',
                      }}
                    >
                      {nickname ? nickname : '카카오닉네임'}
                    </Typography>
                    <Box
                      component='img'
                      src={
                        profile_imageUrl ||
                        'https://d18ghgbbpc0qi2.cloudfront.net/lol/champions/garen.jpg'
                      }
                      sx={{
                        width: { xs: 32, sm: 40 },
                        height: { xs: 32, sm: 40 },
                        marginLeft: 1,
                        borderRadius: '50%',
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 20,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate('/mypage');
                  }}
                >
                  <Avatar fontSize='medium' />
                  마이페이지
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleClose();
                    // request to /logout endpoint
                    logoutHandler();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize='medium' />
                  </ListItemIcon>
                  로그아웃
                </MenuItem>
              </Menu>
            </>
          )}
          {!isLogin && (
            <IconButton onClick={linkToLogin}>
              <LoginIcon sx={{ mr: 1, color: 'white' }} />
              <Typography
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  color: 'white',
                  fontSize: { xs: 14, sm: 16 },
                  fontWeight: '500',
                }}
              >
                로그인 / 회원가입
              </Typography>
            </IconButton>
          )}
          <Tooltip title='알림'>
            <IconButton onClick={handleNotiClick}>
              <Badge
                badgeContent={
                  foregroundMessages.length > 99
                    ? '99+'
                    : foregroundMessages.length
                }
                color='warning'
              >
                <NotificationsIcon fontSize='large' sx={{ color: 'white' }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={notiAnchorEl}
            id='notification-menu'
            open={notiOpen}
            onClose={handleNotiClose}
            onClick={handleNotiClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 20,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
              {foregroundMessages.map((msg, idx) => {
                return (
                  <NotiMenuItem
                    msg={msg}
                    key={idx}
                    handleNotiClose={handleNotiClose}
                    title={msg.notification.title}
                    body={msg.notification.body}
                  />
                );
              })}
            </Box>
            <MenuItem
            // onClick={deleteAllForegroundMsg}
            >
              <ListItemText sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 'bold', color: 'orangered' }}>
                  모두 지우기(지금은 함수 주석처리함)
                </Typography>
              </ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainHeader;
