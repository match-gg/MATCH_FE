import React from 'react';

import { Box } from '@mui/material';

const GameIcon = (props) => {
  const {
    gameIcon,
    altMessage,
    w,
    h,
    p,
    gameName,
    setFavGame,
    isSelected,
    setIsSelected,
  } = props;
  const handleFavGame = (e) => {
    setFavGame(e.target.id);
    setIsSelected(e.target.id);
  };
  return (
    <Box
      component='div'
      sx={{
        width: w ? w : 150,
        height: h ? h : 150,
        padding: p ? p : '5px',
        marginX: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContents: 'center',
        '&:hover': {
          boxShadow: 2,
          borderRadius: '5px',
        },
        borderBottom: isSelected ? '7px solid black' : 0,
      }}
      onClick={handleFavGame}
    >
      <Box
        component='img'
        src={gameIcon}
        alt={altMessage}
        sx={{
          width: '100%',
          padding: '10px',
          filter: 'none',
        }}
        id={gameName}
      />
    </Box>
  );
};

export default GameIcon;
