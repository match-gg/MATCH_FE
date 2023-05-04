import React from 'react';

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material';

import { GameList } from './GameList.d';

const BodyWrapper = styled(Box)(({ theme }) => ({
  paddingTop: '90px',
  height: '100%',
  minHeight: 'calc(100vh - 278px)',
  backgroundColor: '#f3f3f3',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const GameTypo = styled(Typography)(({ theme }) => ({
  fontSize: 32,
  textAlign: 'center',
  fontStyle: 'italic',
  fontWeight: '600',
  my: 5,
  [theme.breakpoints.up('sm')]: {
    fontSize: 56,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: 64,
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: 80,
  },
}));

const MainBodyWrapper = ({ children, game }) => {

  const gameTypo = GameList.find(elem => elem.id === game).fullName;

  return (
    <BodyWrapper>
      <GameTypo>{gameTypo}</GameTypo>
      {children}
    </BodyWrapper>
  );
};

export default MainBodyWrapper;
