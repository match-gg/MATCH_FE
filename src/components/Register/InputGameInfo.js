import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, TextField } from '@mui/material';

import { registerActions } from '../../store/register-slice';
import GameIcon from './GameIcon';

const InputGameInfo = ({ gameIcon, labelText, altMessage, gameName }) => {
  const { games } = useSelector((state) => state.register);

  const dispatch = useDispatch();

  const changeTextField = (e) => {
    dispatch(registerActions.SET_GAMES_WITH_ID({ id: e.target.id, value: e.target.value.trim() }));
  };

  return (
    <Box
      component='div'
      sx={{
        width: '50%',
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
        />
      </Box>
    </Box>
  );
};

export default InputGameInfo;
