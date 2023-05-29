import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  onChildAdded,
  child,
  serverTimestamp,
  get,
  set,
  push,
  off,
} from 'firebase/database';
import ChatMessageInDetail from './ChatMessageInDetail';
import { chatRoomActions } from '../store/chatRoom-slice';

const ChatInCardDetailModal = (props) => {
  const navigate = useNavigate();
  //props로 해당 파티의 채팅방 id값, 닉네임 가져오기
  const { chatRoomId, nickname } = props;

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

    //종료된 파티인지 확인
    await get(child(chatRoomRef, chatRoomId)).then(async (datasnapshot) => {
      if (datasnapshot.val().isDeleted) {
        alert('종료된 파티입니다.');
        navigate('/lol');
        return;
      }

      //  종료된 채팅방이 아닌 경우 (정상적인 프로세스)
      const members = [...datasnapshot.val().memberList];
      const oauth2IdList = members.map((member) => member.oauth2Id);

      //oauth2Id를 통해 파티에 가입되어 있는지 확인
      if (oauth2IdList.includes(oauth2Id)) {
        // 해당 파티에 가입되어있는 정상적인 사용자
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
        // 가입되어있지 않은 사용자 (탈퇴되었거나 스스로 나간 경우)
        alert('유효하지 않은 사용자 입니다.');
        dispatch(chatRoomActions.LEAVE_JOINED_CHATROOM(chatRoomId));
        navigate('/lol');
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
          }}
        >
          {messages.map((message, idx) => {
            const msgBySameSender =
              message.user.nickname === messages[idx - 1]?.user.nickname
                ? true
                : false;
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

export default ChatInCardDetailModal;
