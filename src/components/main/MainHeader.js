import {  useState } from 'react';
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
} from '@mui/material';

import Card from './lol/Card';

import Logout from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../store/user-slice';
import { tokenActions } from '../../store/token-slice';

const MainHeader = () => {
  const { accessToken } = useSelector((state) => state.token);
  const refreshToken = localStorage.getItem('matchGG_refreshToken');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { nickname, imageUrl, representative } = useSelector((state) => state.user);

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

  // logoClickHandler
  const logoClickHandler = () => {
    navigate(`/lol`);
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
        navigate('/login');
      })
      .catch((error) => {
        alert('로그아웃 중 문제가 발생했습니다.');
        console.log(error);
      });
  };

  return (
    <AppBar
      component='nav'
      position='fixed'
      sx={{
        backgroundColor: '#3d3939',
        color: 'white',
        height: 80,
        justifyContent: 'center',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar>
          <Link
            href={`${representative || 'lol'}`}
            underline='none'
            color='white'
            sx={{
              fontStyle: 'italic',
              fontSize: { xs: 35, sm: 45 },
              fontWeight: '700',
            }}
            onClick={logoClickHandler}
          >
            Match.GG
          </Link>
          <Box sx={{ flexGrow: 1 }}>
            <Stack
              direction='row'
              spacing={4}
              sx={{
                display: 'flex',
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
                  fontSize: 17,
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                리그오브레전드
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
                <MenuItem
                  onClick={() => {
                    navigate('/lol');
                  }}
                >
                  <ListItemText style={{ textAlign: 'center' }}>리그오브레전드</ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/valorant');
                  }}
                >
                  <ListItemText style={{ textAlign: 'center' }}>발로란트</ListItemText>
                </MenuItem>
              </Menu>
              <Typography
                sx={{
                  marginLeft: 5,
                  fontSize: 15,
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                파티원 모집
              </Typography>
              <Typography
                sx={{
                  marginLeft: 5,
                  fontSize: 15,
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                게시판(임시)
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
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
                    color: 'white',
                    fontSize: { xs: 15, sm: 20 },
                    fontWeight: '500',
                  }}
                >
                  {nickname ? nickname : '카카오닉네임'}
                </Typography>
                <Box
                  component='img'
                  src={imageUrl || 'https://d18ghgbbpc0qi2.cloudfront.net/lol/champions/garen.jpg'}
                  sx={{ width: 40, height: 40, marginLeft: 1, borderRadius: '50%' }}
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainHeader;
