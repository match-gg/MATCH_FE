import React from 'react';

import { Box, Button } from '@mui/material';

const GameIcon = ({ gameIcon, altMessage, gameName, selected, onClickHandler }) => {
  return (
    <Button
      id={gameName}
      sx={{
        width: 100,
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContents: 'center',
        borderRadius: 0,
        '&:hover': {
          boxShadow: selected && 2,
        },
        borderBottom: selected && '7px solid black',
      }}
      onClick={onClickHandler}
    >
      <Box
        id={gameName}
        component='img'
        src={gameIcon}
        alt={altMessage}
        sx={{
          width: '100%',
          padding: '10px',
          filter: 'none',
        }}
      />
    </Button>
  );
};

export default GameIcon;
