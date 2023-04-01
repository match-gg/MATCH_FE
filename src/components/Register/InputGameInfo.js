import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, TextField, Button } from '@mui/material';

import { registerActions } from '../../store/register-slice';
import GameIcon from './GameIcon';
import { api } from '../../api/api';

const InputGameInfo = ({ gameIcon, labelText, altMessage, gameName }) => {
  const { games } = useSelector((state) => state.register);

  const dispatch = useDispatch();

  const changeTextField = (e) => {
    dispatch(
      registerActions.SET_GAMES_WITH_ID({
        id: e.target.id,
        value: e.target.value.replaceAll(' ', ''),
      })
    );
  };

  const verifyingNickname = async () => {
    await api.get(`/api/${gameName}/exist/${games[gameName]}`).then((response) => {
      if (response.data === true) {
        dispatch(registerActions.SET_GAMESCHECK_WITH_ID({ id: gameName }));
      }
    });
  };

  return (
    <Box
      component='div'
      sx={{
        width: '40%',
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContents: 'center',
      }}
    >
      <GameIcon gameIcon={gameIcon} altMessage={altMessage} />
      <Box
        component='div'
        sx={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          id={gameName}
          fullWidth
          label={labelText}
          variant='outlined'
          onChange={changeTextField}
          defaultValue={games[gameName]}
          value={games[gameName]}
          InputProps={{
            endAdornment: games[gameName] && (
              <Button onClick={verifyingNickname} sx={{ width: 80 }}>
                인증하기
              </Button>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default InputGameInfo;
