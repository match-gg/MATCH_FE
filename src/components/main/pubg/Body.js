import { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled from '@emotion/styled';
import { Button, Container, Typography } from '@mui/material';

import { api } from '../../../api/api';

import BoardsFilter from './BoardsFilter';
import Card from './Card/Card';
import ChatToggleBtn from '../../../chat/ChatToggleBtn';

import { temp_boards } from './boards.tmp';

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

  const [boards, setBoards] = useState(temp_boards);

  // platform, type, tier state
  const [platform, setPlatform] = useState('ALL');
  const [type, setType] = useState('ALL');
  const [tier, setTier] = useState('ALL');

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
          {/* {!isLoading &&
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
          {isLoading && <Typography>Loading...</Typography>} */}
          {boards.map((item, _index) => {
            return (
              <Link
              to={`${item.id}`}
              state={{ background: location }}
              style={{ textDecoration: 'none' }}
              >
                <Card key={item.id} item={item} />
              </Link>
            )
          })}
        </BoardsWrapper>
      </Container>
      <Button sx={{ mb: 4, color: '#3d3939' }} onClick={null}>
        더 불러오기
      </Button>
      <ChatToggleBtn />
    </Fragment>
  );
};

export default Body;
