import React, { useEffect, useRef, useState } from 'react';
import { Box, OutlinedInput, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// import ChatEnter from './ChatEnter';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDatabase,
  onChildAdded,
  ref,
  child,
  set,
  push,
  get,
  serverTimestamp,
} from 'firebase/database';
import { chatRoomActions } from '../store/chatRoom-slice';

const ChatRoom = (props) => {
  const { closeChatOpen } = props;
  const nickname = useSelector((state) => state.user.games['lol']);
  const oauth2Id = useSelector((state) => state.user.oauth2Id);

  const dispatch = useDispatch();
  const currentChatRoom = useSelector(
    (state) => state.chatRoom.currentChatRoom
  );
  //파이어베이스의 messages ref
  const messagesRef = ref(getDatabase(), 'messages');

  //파이어베이스에서 가져온 메세지들을 담을 리스트
  const [messages, setMessages] = useState([]);

  //파이어베이스의 메세지들을 가져올 리스너 함수
  const addMessagesListener = (chatRoomId) => {
    const messagesArray = [];
    onChildAdded(child(messagesRef, chatRoomId), (DataSnapshot) => {
      messagesArray.push(DataSnapshot.val());
      setMessages([...messagesArray]);
    });
  };

  //컴포넌트 생성 시 메세지 가져와서 보여주기
  useEffect(() => {
    if (currentChatRoom) {
      addMessagesListener(currentChatRoom.key);
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
      user: {
        nickname,
        oauth2Id,
      },
      content,
    };
    return message;
  };
  //메세지 전송
  const postMessage = async () => {
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
    //메세지 전송 유효성 테스트 (해당 파티에 가입되어 있는지 확인)
    const chatroomRef = ref(getDatabase(), 'chatRooms');
    await get(child(chatroomRef, currentChatRoom.key))
      .then(async (snapshot) => {
        const members = [...snapshot.val().memberList];
        const oauth2IdList = members.map((member) => member.oauth2Id);
        //유효성 확인 통과 (파티에 가입되어있는 사용자)
        if (oauth2IdList.includes(oauth2Id)) {
          await set(
            push(child(messagesRef, currentChatRoom.key)),
            createMessage()
          )
            .catch((error) => console.log(error))
            .then(() => {
              setContent('');
              setMessageSending(false);
              setTimeout(() => {
                inputRef.current.querySelector('input').focus();
              }, 0);
            });
        } else {
          alert('유효하지 않은 사용자입니다. 3초후 채팅방에서 나가집니당');
          setTimeout(() => {
            closeChatOpen();
          }, 3000);
          dispatch(chatRoomActions.SET_CURRENT_CHATROOM(null));
        }
      })
      .catch((error) => console.log(error));
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
          maxHeight: '460px',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {messages.map((message, idx) => {
          return <ChatMessage key={idx} messageInfo={message} />;
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
