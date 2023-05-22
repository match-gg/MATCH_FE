import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//mui
import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Close } from '@mui/icons-material';

import {
  ref,
  getDatabase,
  onChildAdded,
  child,
  serverTimestamp,
  get,
  set,
  push,
  off,
} from 'firebase/database';
import ChatMessageInDetail from './ChatMessageInDetail';

const ChatInCardDetailModal = (props) => {
  const navigate = useNavigate();
  //props로 해당 파티의 채팅방 id값 가져오기
  const { chatRoomId } = props;
  //닉네임, ouath2Id
  const nickname = useSelector((state) => state.user.games['lol']);
  const oauth2Id = useSelector((state) => state.user.oauth2Id);

  const dispatch = useDispatch();

  //채팅방의 메세지들 state
  const [messages, setMessages] = useState([]);
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
  const createMessage = () => {
    const message = {
      timestamp: serverTimestamp(),
      user: {
        nickname,
        oauth2Id,
      },
      content,
    };
    return message;
  };
  //파이어베이스
  const chatRoomRef = ref(getDatabase(), 'chatRooms');

  //메세지 Ref
  const messagesRef = ref(getDatabase(), 'messages');

  //메세지들을 가져올 리스너 함수
  const addMessagesListener = (chatRoomId) => {
    const messagesArray = [];
    onChildAdded(child(messagesRef, chatRoomId), (datasnapshot) => {
      messagesArray.push(datasnapshot.val());
      setMessages([...messagesArray]);
    });
  };
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
    //메세지 전송 유효성 테스트(해당 파티에 가입되어 있는지 확인)
    await get(child(chatRoomRef, chatRoomId)).then(async (datasnapshot) => {
      const members = [...datasnapshot.val().memberList];
      const oauth2IdList = members.map((member) => member.oauth2Id);
      //유효성 확인 통과 (가입되어 있는 사용자)
      if (oauth2IdList.includes(oauth2Id)) {
        await set(push(child(messagesRef, chatRoomId)), createMessage())
          .catch((error) => console.log(error))
          .then(() => {
            setContent('');
            setMessageSending(false);
            setTimeout(() => {
              inputRef.current.querySelector('input').focus();
            }, 0);
          });
      } else {
        alert('유효하지 않은 사용자 입니다.');
        return;
      }
    });
  };
  //컴포넌트 렌더링 시 메세지 가져오기
  useEffect(() => {
    addMessagesListener(chatRoomId);
    return () => {
      off(chatRoomRef);
    };
  }, []);
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
  }, [messages]);

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
          minHeight: 490,
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
            overflow: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxHeight: 480,
          }}
        >
          {messages.map((message, idx) => {
            console.log(message);
            const msgBySameSender =
              message.user.nickname === messages[idx - 1]?.user.nickname ? true : false;
            return (
              <ChatMessageInDetail
                key={idx}
                messageInfo={message}
                msgBySameSender={msgBySameSender}
              />
            );
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
          size='small'
          sx={{
            mt: 1,
            width: '100%',
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

export default ChatInCardDetailModal;
