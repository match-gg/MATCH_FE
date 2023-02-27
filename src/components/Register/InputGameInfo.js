import React from 'react';

import { Box, TextField } from '@mui/material';

import GameIcon from './GameIcon';

const InputGameInfo = (props) => {
  const { gameIcon, nickname, altMessage, handleNickName } = props;
  const changeNickName = (e) => {
    handleNickName(e.target.value);
  };

  return (
    <Box
      component='div'
      sx={{
        width: '70%',
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
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          // id='outlined-basic'
          label={nickname}
          variant='outlined'
          onChange={changeNickName}
        />
      </Box>
    </Box>
  );
};

export default InputGameInfo;
