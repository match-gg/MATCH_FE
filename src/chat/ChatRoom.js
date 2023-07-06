import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

//mui
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import {
  ref,
  getDatabase,
  child,
  serverTimestamp,
  get,
  set,
  push,
} from 'firebase/database';
import ChatMessageInDetail from './ChatMessage';
import { chatRoomActions } from '../store/chatRoom-slice';
import SystemMessage from './SystemMessage';

const ChatRoom = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //props로 해당 파티의 채팅방 id값, 닉네임 가져오기
  const { chatRoomId, nickname } = props;

  // 리덕스에 저장되어있는 메세지 가져오기
  const currentChatRoomMessages = useSelector(
    (state) => state.messages.messages[chatRoomId]
  );

  const oauth2Id = useSelector((state) => state.user.oauth2Id);

  //메세지 전송중 state (true이면 전송중)
  const [messageSending, setMessageSending] = useState(false);

  //메세지 인풋 state, 핸들러 함수
  const [content, setContent] = useState('');
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  //메세지 인풋에 포커스 되도록 Ref
  const inputRef = useRef(null);
  //파이어베이스로 전송할 메세지 객체 생성 함수
  const createMessage = (timestamp) => {
    const message = {
      type: 'chat',
      timestamp: timestamp,
      user: {
        nickname,
        oauth2Id,
      },
      content,
    };
    return message;
  };
  //파이어베이스 Ref

  const chatRoomRef = ref(getDatabase(), 'chatRooms');
  const messagesRef = ref(getDatabase(), 'messages');

  //메세지 전송 함수
  const postMessage = async () => {
    setMessageSending(true);

    if (!content) {
      setTimeout(() => {
        inputRef.current.querySelector('input').focus();
      }, 1000);
      setMessageSending(false);
      return;
    }

    // 종료된 파티인지 확인
    await get(child(chatRoomRef, chatRoomId)).then(async (datasnapshot) => {
      if (datasnapshot.val().isDeleted) {
        alert('종료된 파티입니다.');
        navigate('/lol');
        return;
      }

      //  종료된 채팅방이 아닌 경우 (정상적인 프로세스)
      const members = [...datasnapshot.val().memberList];
      const oauth2IdList = members.map((member) => member.oauth2Id);
      const timestamp = Date.now();

      //oauth2Id를 통해 파티에 가입되어 있는지 확인
      if (oauth2IdList.includes(oauth2Id)) {
        // 해당 파티에 가입되어있는 정상적인 사용자
        await updateLastRead(timestamp);
        await set(
          push(child(messagesRef, chatRoomId)),
          createMessage(timestamp)
        )
          .then(async () => {
            setContent('');
            setMessageSending(false);
            setTimeout(() => {
              inputRef.current.querySelector('input').focus();
            }, 0);
          })
          .catch((error) => console.log(error));
      } else {
        // 가입되어있지 않은 사용자 (탈퇴되었거나 스스로 나간 경우)
        alert('유효하지 않은 사용자 입니다.');
        dispatch(chatRoomActions.LEAVE_JOINED_CHATROOMS_ID(chatRoomId));
        navigate('/lol');
        window.location.reload();
        return;
      }
    });
  };

  //엔터키 입력 시 메세지 전송
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      postMessage();
    }
  };
  // 자동으로 채팅창의 하당으로 스크롤 되도록 Ref
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

    updateLastRead(Date.now());
  }, [currentChatRoomMessages]);

  const updateLastRead = async (timestamp) => {
    const lastReadRef = ref(getDatabase(), 'lastRead');
    await set(child(lastReadRef, `${oauth2Id}/${chatRoomId}`), timestamp).catch(
      (error) => console.log(error)
    );
  };

  const [thisMessages, setThisMessages] = useState([]);

  useEffect(() => {
    updateLastRead(Date.now());
    setThisMessages(currentChatRoomMessages);
  }, [thisMessages]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        pb: 1,
      }}
    >
      <Typography
        sx={{
          color: 'grey',
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        파티 전용 채팅
      </Typography>
      <Box
        sx={{
          backgroundColor: 'rgba(236, 236, 236, 0.5)',
          minWidth: 360,
          maxWidth: 360,
          minHeight: 480,
          position: 'relative',
          borderRadius: 1,
          p: 1,
        }}
      >
        {/* 채탕 매세지 영역 */}
        <Box
          ref={scrollRef}
          sx={{
            width: '100%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxHeight: 480,
            overflowX: 'hidden',
          }}
        >
          {currentChatRoomMessages &&
            currentChatRoomMessages.map((message, idx) => {
              const msgBySameSender =
                message.user.nickname ===
                currentChatRoomMessages[idx - 1]?.user.nickname
                  ? true
                  : false;
              if (message.type === 'chat') {
                return (
                  <ChatMessageInDetail
                    key={idx}
                    messageInfo={message}
                    msgBySameSender={msgBySameSender}
                  />
                );
              } else {
                return <SystemMessage key={idx} messageInfo={message} />;
              }
            })}
        </Box>
        {/* 메세지 인풋 영역 */}
      </Box>
      <Box
        sx={{
          backgroundColor: 'white',
          width: '100%',
          height: 40,
        }}
      >
        <TextField
          label='메세지를 입력해주세요.'
          disabled={messageSending}
          value={content}
          onChange={handleContent}
          onKeyDown={handleKeyDown}
          autoComplete='off'
          autoFocus
          ref={inputRef}
          sx={{
            mt: 1,
            width: '100%',
            height: 40,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton size='small' onClick={postMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatRoom;
