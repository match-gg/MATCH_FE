import React, { Fragment } from 'react';

import { Box } from '@mui/material';

import GameIcon from './GameIcon';

import lolIcon from './logo_images/LoL_Icon_Flat_BLACK.png';
import pubgIcon from './logo_images/Pubg_Logo.png';
import overwatchIcon from './logo_images/overwatch_logo.png';
import lostarkIcon from './logo_images/lost_Ark_Logo.png';
import maplestoryIcon from './logo_images/maplestory_logo.png';

const RegisterFavGame = () => {
  return (
    <Fragment>
      <Box
        component='div'
        sx={{
          width: '80%',
          height: '65vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <GameIcon gameIcon={lolIcon} altMessage={'리그오브레전드_아이콘'} />
        <GameIcon gameIcon={pubgIcon} altMessage={'배틀그라운드_아이콘'} />
        <GameIcon gameIcon={overwatchIcon} altMessage={'오버워치2_아이콘'} />
        <GameIcon gameIcon={lostarkIcon} altMessage={'로스트아크_아이콘'} />
        <GameIcon
          gameIcon={maplestoryIcon}
          altMessage={'메이플스토리_아이콘'}
        />
      </Box>
    </Fragment>
  );
};

export default RegisterFavGame;
