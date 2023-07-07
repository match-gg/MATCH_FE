import { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import { Button, Container, Typography } from '@mui/material';

import { api } from '../../../api/api';

import BoardsFilter from './BoardsFilter';
import Card from './Card';
import ShortcutButton from '../../../shortcut/ShortcutButton';

// 테스트
import {
  getDatabase,
  ref,
  child,
  onChildAdded,
  off,
  onChildChanged,
} from 'firebase/database';
import { messagesActions } from '../../../store/message-slice';
import { notificationActions } from '../../../store/notification-slice';

const BoardsWrapper = styled('div')({
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  pl: 1,
  pt: 1,
  // position: 'fixed',
});

const Body = () => {
  const location = useLocation();

  const [boards, setBoards] = useState([]); // 전체 게시글 저장
  const [pageNumber, setPageNumber] = useState(1); // 불러 올 페이지 번호

  const [queueType, setQueueType] = useState('ALL'); // 큐 타입
  const [tier, setTier] = useState('ALL'); // 티어
  const [lane, setLane] = useState('ALL'); // 라인

  const [isLoading, setIsLoading] = useState(false);

  const handleQueueType = (event) => {
    if (event.target.value === 'ARAM') {
      setTier('ALL');
      setLane('ALL');
    }

    if (event.target.value === 'DUO_RANK') {
      setTier('DIAMOND');
    }

    setQueueType(event.target.value);
  };

  const handleTier = (event) => {
    setTier(event.target.value);
  };

  const handleLane = (event) => {
    setLane(event.target.value);
    console.log(event);
  };

  // 최초 1회 게시글 로딩
  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoading(true);

      await api
        .get('/api/lol/boards', {
          params: { size: 12, page: 0, position: lane, type: queueType, tier },
        })
        .then((response) => {
          setBoards(response.data.content);
          setPageNumber(1);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
          if (
            error.response.status === 404 &&
            error.response.data.message === '게시글이 존재하지 않습니다.'
          ) {
            setBoards([]);
          }
        });
    };

    fetchBoards();
  }, [queueType, tier, lane]);

  // 더 불러오기 버튼 클릭 시
  const moreBoards = async () => {
    await api
      .get('/api/lol/boards', {
        params: {
          size: 12,
          page: pageNumber,
          position: lane,
          type: queueType,
          tier,
        },
      })
      .then((res) => {
        setBoards([...boards, ...res.data.content]);
        setPageNumber((prevState) => prevState + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refreshBoards = async () => {};

  const filterProps = {
    queueType,
    handleQueueType,
    tier,
    handleTier,
    lane,
    handleLane,
    refreshBoards,
  };

  // 테스트
  const dispatch = useDispatch();

  // 파이어베이스 messagesRef
  const messagesRef = ref(getDatabase(), 'messages');
  // 리덕스에 저장되어있는 chatRoom의 Id 리스트
  const { joinedChatRoomsId } = useSelector((state) => state.chatRoom);

  // 메세지 각 채팅방의 메세지 리스너 추가
  const addFirebaseListener = () => {
    joinedChatRoomsId.forEach((chatRoomId) => {
      onChildAdded(child(messagesRef, chatRoomId), (datasnapshot) => {
        const data = {
          chatRoomId,
          message: datasnapshot.val(),
        };
        // 각 채팅방의 메세지를 리덕스에 저장
        dispatch(messagesActions.SET_MESSAGES(data));
      });
    });
  };

  useEffect(() => {
    addFirebaseListener();
  }, []);

  return (
    <Fragment>
      <BoardsFilter filterProps={filterProps} />
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <BoardsWrapper>
          {!isLoading && boards.length === 0 && (
            <Typography>게시글이 존재하지 않습니다.</Typography>
          )}
          {!isLoading &&
            boards.map((item, _index) => {
              return (
                <Link
                  key={item.id}
                  to={`${item.id}`}
                  state={{ background: location }}
                  style={{
                    textDecoration: 'none',
                    background: 'fixed',
                  }}
                >
                  <Card key={item.id} item={item} />
                </Link>
              );
            })}
          {isLoading && <Typography>Loading...</Typography>}
        </BoardsWrapper>
      </Container>
      {boards.length > 0 && (
        <Button sx={{ mb: 4, color: '#3d3939' }} onClick={moreBoards}>
          더 불러오기
        </Button>
      )}
      <ShortcutButton />
    </Fragment>
  );
};

export default Body;
