import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import NotiAccordionDetail from './NotiAccordionDetail';

// firebase
import { child, get, getDatabase, ref, set } from 'firebase/database';

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
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';

const NotiAccordion = (props) => {
  // 해당 Accordion에서 다룰 chatRoom의 Id, 해당 채팅방에 마지막에 접근한 timestamp
  const { chatRoomId, timestamp } = props;

  const { oauth2Id } = useSelector((state) => state.user);
  const currentChatRoomMessages = useSelector(
    (state) => state.messages.messages[chatRoomId]
  );

  // 파이어베이스에서 채팅방 정보 가져오는 로딩
  const [isLoading, setIsLoading] = useState(true);
  // 파이어베이스에서 가져온 chatRoomInfo의 state
  const [chatRoomInfo, setChatRoomInfo] = useState();

  // firebase
  const chatRoomsRef = ref(getDatabase(), 'chatRooms');

  // 채팅방 정보 가져오기
  const getChatRoomInfo = async () => {
    await get(child(chatRoomsRef, chatRoomId))
      .then((datasnapshot) => {
        setChatRoomInfo(datasnapshot.val());
      })
      .then(() => setIsLoading(false))
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
      Date.now()
    ).catch((error) => console.log(error));
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
                {currentChatRoomMessages?.length > 0 &&
                  isLoading === false &&
                  currentChatRoomMessages[currentChatRoomMessages.length - 1]
                    .timestamp > timestamp && (
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
            {currentChatRoomMessages &&
              [...currentChatRoomMessages].reverse().map((message, idx) => {
                if (message.timestamp < timestamp) return null;
                return (
                  <NotiAccordionDetail
                    key={idx}
                    message={message}
                    boardId={chatRoomInfo.roomId}
                  />
                );
              })}
            <MenuItem
              onClick={() => {
                updateLastRead();
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
