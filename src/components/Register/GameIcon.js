import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box } from '@mui/material';
import { registerActions } from '../../store/register-slice';

const GameIcon = ({ gameIcon, altMessage, w, h, p, gameName }) => {
  const dispatch = useDispatch();

  const { representative } = useSelector((state) => state.register);

  const setRepresentative = (e) => {
    dispatch(registerActions.SET_REPRESENTATIVE(e.target.id));
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
          boxShadow: representative === gameName ? 2 : 0,
          borderRadius: representative === gameName ? '5px' : 0,
        },
        borderBottom: representative === gameName ? '7px solid black' : 0,
      }}
      onClick={setRepresentative}
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
