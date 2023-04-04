import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Typography, Button, TextField, Stack } from '@mui/material';

import { userActions } from '../../store/user-slice';

import { gameList } from './Game.data';
import GameInfo from './GameInfo';
import GameIcon from './GameIcon';

const GamesSetting = ({ userInfo }) => {
  const dispatch = useDispatch();
  const { representative } = useSelector((state) => state.user);

  const [games, setGames] = useState({
    lol: userInfo.lol,
    valorant: userInfo.valorant,
  });

  const gamesHandler = (e) => {
    console.log(e.target);
    setGames({ ...games, [`${e.target.id}`]: e.target.value });
  };

  const updateDBGames = (e) => {
    // DB의 사용자 닉네임 업데이트 하는 동작
    console.log(e.target.id);
  };

  const changeRepresentative = async (e) => {
    // 서버로 대표게임 바꾼다고 전송
    // 성공시 우리 redux-store 도 수정

    dispatch(userActions.SET_REPRESENTATIVE({ representative: e.target.id }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '65%',
        width: '100%',
        flexDirection: 'column',
        paddingTop: 2,
        pl: 4,
      }}
    >
      <Typography variant='h5' sx={{ color: 'black', fontWeight: '600' }}>
        게임별 캐릭터 연결
      </Typography>
      <Stack
        spacing={3}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          overflow: 'auto',
          mt: 2,
          pl: 4,
        }}
      >
        {gameList.map((aGame, index) => {
          return (
            <GameInfo
              id={aGame.id}
              game={games[aGame.id]}
              gameKor={aGame.gameKor}
              onChangeHandler={gamesHandler}
              updateHandler={updateDBGames}
              isChanged={userInfo[aGame.id] !== games[aGame.id] ? true : false}
            />
          );
        })}
      </Stack>
      <Typography variant='h5' sx={{ color: 'black', fontWeight: '600', mt: 6, mb: 2 }}>
        대표 게임 설정
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          px: 4,
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 8,
        }}
      >
        {gameList.map((aGame, index) => {
          return (
            <GameIcon
              key={aGame.id}
              gameIcon={aGame.gameIcon}
              altMessage={aGame.gameKor}
              gameName={aGame.id}
              onClickHandler={changeRepresentative}
              selected={representative === aGame.id ? true : false}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default GamesSetting;
