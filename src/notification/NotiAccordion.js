import React, { useEffect, useState } from 'react';

// firebase
import {
  child,
  get,
  getDatabase,
  ref,
  serverTimestamp,
  set,
} from 'firebase/database';
// mui
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Skeleton,
  Box,
  MenuItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NotiAccordionDetail from './NotiAccordionDetail';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import { notificationActions } from '../store/notification-slice';

const NotiAccordion = (props) => {
  // 해당 Accordion에서 다룰 chatRoom의 Id
  const { chatRoomId } = props;

  const dispatch = useDispatch();

  const { oauth2Id } = useSelector((state) => state.user);

  const { notifications } = useSelector((state) => state.notification);

  // 컴포넌트에서 사용할 notification
  const [notis, setNotis] = useState(
    notifications[chatRoomId] ? notifications[chatRoomId] : null
  );
  // 마지막 읽은 위치의 timestamp
  const [lastReadTimeStamp, setLastReadTimeStamp] = useState(0);

  // 파이어베이스에서 채팅방 정보 가져오는 로딩
  const [isLoading, setIsLoading] = useState(true);

  // 파이어베이스에서 가져온 chatRoomInfo의 state
  const [chatRoomInfo, setChatRoomInfo] = useState();

  // firebase
  const chatRoomsRef = ref(getDatabase(), 'chatRooms');
  const lastReadRef = ref(getDatabase(), `lastRead/${oauth2Id}/${chatRoomId}`);

  // 채팅방 정보 가져오기
  const getChatRoomInfo = async () => {
    await get(child(chatRoomsRef, chatRoomId))
      .then((datasnapshot) => {
        setChatRoomInfo(datasnapshot.val());
      })
      .catch((error) => console.log(error));
    // 타임스탬프 가져오기
    await get(lastReadRef)
      .then((datasnapshot) => setLastReadTimeStamp(datasnapshot.val()))
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  };

  // 타임스탬프 새로 가져오기
  const refreshTimeStamp = async () => {
    await get(lastReadRef)
      .then((data) => setLastReadTimeStamp(data.val()))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getChatRoomInfo();
  }, []);

  // 타임스탬프 최신화하기
  const updateLastRead = async () => {
    const lastReadRef = ref(getDatabase(), 'lastRead');
    await set(
      child(lastReadRef, `${oauth2Id}/${chatRoomId}`),
      serverTimestamp()
    )
      .then(() => refreshTimeStamp())
      .catch((error) => console.log(error));
  };

  const removeNotis = () => {
    dispatch(notificationActions.REMOVE_NOTIFICATIONS(chatRoomId));
  };

  return (
    <>
      {chatRoomInfo ? (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: 'block',
                maxWidth: '280px',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                {/* 방장 */}
                <Typography
                  noWrap={true}
                  sx={{
                    fontWeight: '560',
                  }}
                >{`[${chatRoomInfo.createdBy}] 님의 파티`}</Typography>
                {/* 아이콘 */}
                {notis?.length > 0 &&
                  isLoading === false &&
                  notis[0].timestamp > lastReadTimeStamp && (
                    <NotificationsActiveRoundedIcon
                      sx={{ color: 'orange', marginLeft: '4px' }}
                    />
                  )}
              </Box>
              <Typography noWrap={true}>{chatRoomInfo.content}</Typography>
            </Box>
          </AccordionSummary>
          {/* 메세지들 */}
          <AccordionDetails>
            {notis &&
              [...notis].reverse().map((noti, idx) => {
                if (noti.timestamp < lastReadTimeStamp) return null;
                return (
                  <NotiAccordionDetail
                    key={idx}
                    message={noti}
                    boardId={chatRoomInfo.roomId}
                  />
                );
              })}
            <MenuItem
              onClick={() => {
                updateLastRead();
                removeNotis();
              }}
              sx={{
                border: '1px solid lightgray',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  color: 'orangered',
                }}
              >
                지우기
              </Typography>
            </MenuItem>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Skeleton variant='rectangular' sx={{ margin: '4px' }} height={40} />
      )}
    </>
  );
};

export default NotiAccordion;
