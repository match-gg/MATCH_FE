import React from 'react';

import { Box } from '@mui/material';

import RegisterLayout from './RegisterLayout';
import GameIcon from './GameIcon';

import lolIcon from './logo_images/LoL_Icon_Flat_BLACK.png';
import pubgIcon from './logo_images/Pubg_Logo.png';
import overwatchIcon from './logo_images/overwatch_logo.png';
import lostarkIcon from './logo_images/lost_Ark_Logo.png';
import maplestoryIcon from './logo_images/maplestory_logo.png';

const RegisterFavGame = (props) => {
  return (
    <RegisterLayout
      title={'대표게임을 설정해 주세요.'}
      description={'(이후에 마이페이지에서 수정이 가능합니다.'}
      prevLink={'/register/games'}
      nextLink={'/register/notification'}
      phase={3}
    >
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
        <GameIcon gameIcon={pubgIcon} altMessage={'리그오브레전드_아이콘'} />
        <GameIcon gameIcon={overwatchIcon} altMessage={'리그오브레전드_아이콘'} />
        <GameIcon gameIcon={lostarkIcon} altMessage={'리그오브레전드_아이콘'} />
        <GameIcon gameIcon={maplestoryIcon} altMessage={'리그오브레전드_아이콘'} />
      </Box>
    </RegisterLayout>
  );
};

export default RegisterFavGame;
