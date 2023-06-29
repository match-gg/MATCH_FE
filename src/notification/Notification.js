import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// mui
import {
  Tooltip,
  Badge,
  Menu,
  Box,
  Accordion,
  AccordionSummary,
  MenuItem,
  ListItemText,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { getDatabase, onChildAdded, ref, child, get } from 'firebase/database';

import NotificationDetail from './NotificationDetail';
import { notificationActions } from '../store/notification-slice';

const Notification = (props) => {
  const { notiAnchorEl, notiOpen, handleNotiClick, handleNotiClose } = props;
  const { isLogin } = useSelector((state) => state.user);

  const { messagesForNoti } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  // joinedChatRoomList
  const reduxChatRooms = useSelector((state) => state.chatRoom.joinedChatRooms);

  // Badge 디스플레이 상태
  const [showNotification, setShowNotification] = useState(false);

  // firebase
  const messagesRef = ref(getDatabase(), 'messages');
  const chatRoomRef = ref(getDatabase(), 'chatRooms');

  // Accordian 생성에 필요한 state인데...
  const [joinedChatRooms, setJoinedChatRooms] = useState([]);

  const addMessagesListener = (chatRoomId) => {
    onChildAdded(child(messagesRef, chatRoomId), (datasnapshot) => {
      const data = { chatRoomId, message: datasnapshot.val().content };
      dispatch(notificationActions.ADD_MESSAGE(data));
      setShowNotification(true);
    });
  };

  const getJoinedChatRoomsInfo = async () => {
    if (reduxChatRooms.length === 0) {
      console.log('no redux chatroom...');
      return;
    }
    const chatRoomData = [];
    await get(chatRoomRef).then(async (datasnapshot) => {
      chatRoomData.push(datasnapshot.val());
    });

    const joinedChatRoomInfo = Object.values(chatRoomData[0]);
    setJoinedChatRooms(joinedChatRoomInfo);
    return joinedChatRoomInfo;
  };

  useEffect(() => {
    getJoinedChatRoomsInfo().then((chatRooms) => {
      chatRooms &&
        chatRooms.forEach((chatRoom) => {
          addMessagesListener(chatRoom.key);
        });
    });
  }, [reduxChatRooms]);

  // Accordion 관련
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Tooltip title='알림'>
        <Badge
          sx={{ cursor: 'pointer' }}
          onClick={(event) => {
            setShowNotification(false);
            handleNotiClick(event);
            setShowNotification(false);
          }}
          variant={showNotification ? 'dot' : undefined}
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
          {joinedChatRooms.map((chatRoom, idx) => {
            return (
              <Accordion
                key={idx}
                sx={{
                  margin: '8px',
                  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                }}
                expanded={expanded === chatRoom?.key}
                onChange={handleChange(chatRoom?.key)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{ whiteSpace: 'pre-line' }}
                  >{`[${chatRoom?.createdBy}] 님의 파티\n${chatRoom?.content}`}</Typography>
                </AccordionSummary>
                <NotificationDetail
                  chatRoomId={chatRoom.key}
                  setShowNotification={setShowNotification}
                  messagesForNoti={messagesForNoti}
                />
              </Accordion>
            );
          })}
        </Box>
        <MenuItem sx={{ borderTop: '1px solid gray' }}>
          <ListItemText sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                color: 'orangered',
              }}
            >
              모두 지우기
            </Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Notification;
