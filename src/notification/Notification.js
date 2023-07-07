import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotiAccordion from './NotiAccordion';
import { notificationActions } from '../store/notification-slice';

// mui
import { Tooltip, Badge, Menu, Box, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  getDatabase,
  ref,
  set,
  child,
  onChildChanged,
} from 'firebase/database';

const Notification = (props) => {
  const dispatch = useDispatch();

  // 컴포넌트 UI 관련
  const { notiAnchorEl, notiOpen, handleNotiClick, handleNotiClose } = props;

  const { joinedChatRoomsId } = useSelector((state) => state.chatRoom);
  const { oauth2Id } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.messages);
  const { isBadgeShow, lastReadTimestamp, timestamps } = useSelector(
    (state) => state.notification
  );

  // 파이어베이스의 lastRead 래퍼런스
  const lastReadRef = ref(getDatabase(), `lastRead/${oauth2Id}`);

  useEffect(() => {
    const handleBadge = async () => {
      // 각 채팅방의 메세지들 중 마지막 메세지의 timestamp중 가장 큰 값 계산
      const reduxMaxTimestamp = Math.max(
        ...Object.values(messages).map(
          (message) => message[message.length - 1]['timestamp']
        )
      );

      if (lastReadTimestamp < reduxMaxTimestamp) {
        // 노티가 있다는 거니까
        dispatch(notificationActions.SET_BADGE_SHOW_TRUE());
      } else {
        dispatch(notificationActions.SET_BADGE_SHOW_FALSE());
      }
    };
    handleBadge();
  }, [messages, lastReadTimestamp]);

  // 모든 채팅방에 lastRead 업데이트
  const updateAllLastRead = () => {
    const lastReadRef = ref(getDatabase(), 'lastRead');
    joinedChatRoomsId.forEach(async (chatRoomId) => {
      await set(
        child(lastReadRef, `${oauth2Id}/${chatRoomId}`),
        Date.now()
      ).catch((error) => console.log(error));
    });
    // 메뉴 닫기
    handleNotiClose();
  };

  useEffect(() => {
    // chatRoom의 마지막 접근시간을 받는 리스너 함수
    const addLastReadListener = async () => {
      onChildChanged(lastReadRef, (datasnapshot) => {
        dispatch(
          notificationActions.SET_LAST_READ_TIMESTAMP(datasnapshot.val())
        );
        dispatch(
          notificationActions.SET_TIMESTAMPS({
            chatRoomId: datasnapshot.key,
            timestamp: datasnapshot.val(),
          })
        );
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
            return (
              <NotiAccordion
                key={chatRoomId}
                chatRoomId={chatRoomId}
                timestamp={timestamps[chatRoomId]}
              />
            );
          })}
        </Box>
        <MenuItem
          onClick={() => {
            updateAllLastRead();
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
