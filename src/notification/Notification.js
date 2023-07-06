import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// mui
import { Tooltip, Badge, Menu, Box, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  getDatabase,
  ref,
  get,
  serverTimestamp,
  set,
  child,
  onChildChanged,
} from 'firebase/database';

import NotiAccordion from './NotiAccordion';
import { notificationActions } from '../store/notification-slice';

const Notification = (props) => {
  const { notiAnchorEl, notiOpen, handleNotiClick, handleNotiClose } = props;
  const dispatch = useDispatch();

  // 가입되어있는 채팅방 Id 리스트
  const { joinedChatRoomsId } = useSelector((state) => state.chatRoom);

  const { oauth2Id } = useSelector((state) => state.user);

  const [lastReadState, setLastReadState] = useState();
  const { notifications } = useSelector((state) => state.notification);

  const { isBadgeShow } = useSelector((state) => state.notification);

  useEffect(() => {
    const handleBadge = async () => {
      if (!notifications) return;
      // notifications 필터링
      const filteredNotis = Object.values(notifications).filter(
        (noti) => noti.length > 0
      );
      // 리덕스의 noti의 timestamp중 가장 큰 값
      const reduxMaxTimestamp = Math.max(
        ...filteredNotis.map((notis) => notis[0]['timestamp'])
      );

      if (lastReadState < reduxMaxTimestamp) {
        // 노티가 있다는 거니까
        dispatch(notificationActions.SET_BADGE_SHOW_TRUE());
      } else {
        dispatch(notificationActions.SET_BADGE_SHOW_FALSE());
      }
    };
    handleBadge();
  }, [notifications, lastReadState]);

  const updateAllLastRead = () => {
    const lastReadRef = ref(getDatabase(), 'lastRead');
    joinedChatRoomsId.forEach(async (chatRoomId) => {
      await set(
        child(lastReadRef, `${oauth2Id}/${chatRoomId}`),
        serverTimestamp()
      ).catch((error) => console.log(error));
    });
    handleNotiClose();
  };

  const removeAllNotis = () => {
    dispatch(notificationActions.REMOVE_ALL_NOTIFICATIONS());
  };

  useEffect(() => {
    const lastReadRef = ref(getDatabase(), `lastRead/${oauth2Id}`);
    // onChildChanged 리스너 함수
    const addLastReadListener = async () => {
      onChildChanged(lastReadRef, (datasnapshot) => {
        console.log(datasnapshot.ref.key);
        console.log(datasnapshot.val());
        setLastReadState(datasnapshot.val());
      });
    };
    addLastReadListener();
  }, []);

  return (
    <>
      <Tooltip title='알림'>
        <Badge
          sx={{
            cursor: 'pointer',
            '& .MuiBadge-dot': {
              width: 12,
              height: 12,
              borderRadius: '100%',
            },
          }}
          onClick={(event) => {
            handleNotiClick(event);
            dispatch(notificationActions.SET_BADGE_SHOW_FALSE());
          }}
          variant={isBadgeShow ? 'dot' : null}
          color='warning'
        >
          <NotificationsIcon sx={{ color: 'white', fontSize: '32px' }} />
        </Badge>
      </Tooltip>
      <Menu
        anchorEl={notiAnchorEl}
        id='notification-menu'
        open={notiOpen}
        onClose={handleNotiClose}
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
        <Box
          sx={{
            width: '360px',
            maxHeight: '50vh',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {joinedChatRoomsId.map((chatRoomId) => {
            return <NotiAccordion key={chatRoomId} chatRoomId={chatRoomId} />;
          })}
        </Box>
        <MenuItem
          onClick={() => {
            updateAllLastRead();
            removeAllNotis();
          }}
          sx={{
            borderTop: '1px solid gray',
            marginRight: '4px',
            marginLeft: '4px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <DeleteIcon sx={{ color: 'orangered' }} />
          <Typography
            sx={{
              fontWeight: 'bold',
              color: 'orangered',
            }}
          >
            모두 지우기
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Notification;
