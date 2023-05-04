import React, { useEffect, useRef, useState } from 'react';

import { Box, OutlinedInput, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// import ChatEnter from './ChatEnter';
import ChatMessage from './ChatMessage';
import { useSelector } from 'react-redux';
import {
  getDatabase,
  onChildAdded,
  ref,
  child,
  set,
  push,
  serverTimestamp,
} from 'firebase/database';

const ChatRoom = () => {
  const user = useSelector((state) => state.user);
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  //파이어베이스의 messages ref
  const messagesRef = ref(getDatabase(), 'messages');

  //파이어베이스에서 가져온 메세지들을 담을 리스트
  const [messages, setMessages] = useState([]);

  //파이어베이스의 메세지들을 가져올 리스너 함수
  const addMessagesListener = (chatRoomId) => {
    let messagesArray = [];
    onChildAdded(child(messagesRef, chatRoomId), (DataSnapshot) => {
      messagesArray.push(DataSnapshot.val());
      setMessages([...messagesArray]);
    });
  };

  //컴포넌트 생성 시 메세지 가져와서 보여주기
  useEffect(() => {
    if (chatRoom) {
      addMessagesListener(chatRoom.roomId);
    }
  }, []);

  //에러를 보여줄 툴팁
  const [tooltip, setTooltip] = useState(false);
  const handleTooltipOpen = () => {
    setTooltip(true);
  };
  const handleTooltipClose = () => {
    setTooltip(false);
  };

  //메세지 전송중 state
  const [messageSending, setMessageSending] = useState(false);

  //메세지 인풋 state
  const [content, setContent] = useState('');
  const handleContent = (e) => {
    setContent(e.target.value);
  };

  //메세지 입력창에 포커스 되도록 Ref
  const inputRef = useRef(null);

  const createMessage = () => {
    const message = {
      timestamp: serverTimestamp(),
      name: user.nickname,
      content: content,
    };
    return message;
  };
  //메세지 전송
  const postMessage = async () => {
    inputRef.current.querySelector('input').focus();

    setMessageSending(true);
    if (!content) {
      handleTooltipOpen();
      setTimeout(() => {
        handleTooltipClose();
        inputRef.current.querySelector('input').focus();
      }, 2000);
      setMessageSending(false);
      return;
    }
    try {
      await set(push(child(messagesRef, chatRoom.roomId)), createMessage());
      setContent('');
      setMessageSending(false);
      setTimeout(() => {
        inputRef.current.querySelector('input').focus();
      }, 0);
    } catch (error) {
      console.log(error);
    }
  };
  //엔터키로 메세지 전송
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      postMessage();
    }
  };

  //자동으로 하단으로 스크롤 되도록 Ref
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '530px',
        maxHeight: '530px',
        // overflowY: 'scroll',
        width: '300px',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '5px',
      }}
    >
      {/* 메세지 영역 */}
      <Box
        ref={scrollRef}
        sx={{
          padding: '5px',
          width: '100%',
          display: 'fext',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          maxHeight: '460px',
          overflowY: 'auto',
        }}
      >
        {/* 채팅방 입장 메세지 */}
        {/* {members.map((member, idx) => {
          return <ChatEnter key={idx} name={member} />;
        })} */}
        {messages.map((message, idx) => {
          return <ChatMessage key={idx} user={user} message={message} />;
        })}
      </Box>
      {/* 입력 영역 */}
      <Tooltip
        arrow
        title='메세지를 입력해주세요'
        open={tooltip}
        placement='top'
        leaveDelay={3000}
      >
        <OutlinedInput
          value={content}
          onChange={handleContent}
          onKeyDown={handleKeyDown}
          size='small'
          autoComplete='off'
          placeholder='메세지를 입력해주세요.'
          disabled={messageSending}
          autoFocus
          ref={inputRef}
          sx={{
            position: 'absolute',
            bottom: '30px',
            width: '80%',
            borderColor: '#3c3939',
          }}
          endAdornment={
            <SendIcon
              onClick={postMessage}
              sx={{
                cursor: 'pointer',
                padding: '3px',
                color: '#3c3939',
                '&:hover': {
                  cursor: 'pointer',
                  borderRadius: '5px',
                  backgroundColor: 'rgba(60, 57, 57, 0.5)',
                },
              }}
            />
          }
        ></OutlinedInput>
      </Tooltip>
    </Box>
  );
};

export default ChatRoom;
