import { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled from '@emotion/styled';
import { Box, Button, Container, Typography } from '@mui/material';

import { api } from '../../../api/api';

import BoardsFilter from './BoardFilter';
import Card from './Card';
import ChatToggleBtn from '../../../chat/ChatToggleBtn';

import { dummyBoards } from './boards.tmp';

const BoardsWrapper = styled('div')({
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  pl: 1,
  pt: 1,
});

const Body = () => {
  const location = useLocation();

  const [boards, setBoards] = useState(dummyBoards); // 전체 게시글 저장
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
          console.log(error);
          setIsLoading(false);
        });
    };

    // fetchBoards();
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

  return (
    <Fragment>
      <BoardsFilter filterProps={filterProps} />
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <BoardsWrapper>
          {!isLoading &&
            boards.map((item, _index) => {
              return (
                <Link to={`${item.id}`} state={{ background: location }} style={{textDecoration: 'none'}}>
                  <Card key={item.id} item={item} />
                </Link>
              );
            })}
          {isLoading && <Typography>Loading...</Typography>}
        </BoardsWrapper>
      </Container>
      <Button sx={{ mb: 4, color: '#3d3939' }} onClick={moreBoards}>
        더 불러오기
      </Button>
      <ChatToggleBtn />
    </Fragment>
  );
};

export default Body;
