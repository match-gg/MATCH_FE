import { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled from '@emotion/styled';
import { Button, Container, Typography } from '@mui/material';

import { api } from '../../../api/api';

import BoardsFilter from './BoardsFilter';
import Card from './Card/Card';
import ChatToggleBtn from '../../../chat/ChatToggleBtn';

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

  const [boards, setBoards] = useState([]); // 전체 게시글 저장
  const [pageNumber, setPageNumber] = useState(1); // 불러 올 페이지 번호

  // platform, type, tier state
  const [platform, setPlatform] = useState('ALL');  // 플랫폼
  const [type, setType] = useState('ALL');  // 큐 타입
  const [tier, setTier] = useState('ALL');  // 티어

  const [isLoading, setIsLoading] = useState(false);

  // handler for platform, type, tier
  const platformHandler = (event) => {
    setPlatform(event.target.value);
  };

  const typeHandler = (event) => {
    setType(event.target.value);
  };

  const tierHandler = (event) => {
    setTier(event.target.value);
  };

  // 최초 1회 게시글 로딩
  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoading(true);

      await api
        .get('/api/pubg/boards', {
          params: { size: 12, page: 0, platform: platform, type: type, tier: tier },
        })
        .then((response) => {
          setBoards(response.data.content);
          setPageNumber(1);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          if (error.status === 404) {
            setBoards([]);
          }
        });
    };

    fetchBoards();
  }, [platform, type, tier]);

  // 더 불러오기 버튼 클릭 시
  const moreBoards = async () => {
    await api
      .get('/api/pubg/boards', {
        params: {
          size: 12,
          page: pageNumber,
          platform: platform,
          type: type,
          tier: tier,
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

  const filterProps={
    platform,
    type,
    tier,
    platformHandler,
    typeHandler,
    tierHandler
  }

  return (
    <Fragment>
      <BoardsFilter filterProps={filterProps} />
      <Container maxWidth='xl' sx={{ mt: 2 }}>
        <BoardsWrapper>
          {!isLoading &&
            boards.map((item, _index) => {
              return (
                <Link
                  to={`${item.id}`}
                  state={{ background: location }}
                  style={{ textDecoration: 'none' }}
                >
                  <Card key={item.id} item={item} />
                </Link>
              );
            })}
          {isLoading && <Typography>Loading...</Typography>}
          {/* {boards.map((item, _index) => {
            return (
              <Link
              to={`${item.id}`}
              state={{ background: location }}
              style={{ textDecoration: 'none' }}
              >
                <Card key={item.id} item={item} />
              </Link>
            )
          })} */}
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
