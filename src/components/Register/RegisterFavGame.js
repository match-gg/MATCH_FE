import React, { Fragment, useState } from 'react';

import { Box } from '@mui/material';

import GameIcon from './GameIcon';

import lolIcon from './logo_images/LoL_Icon_Flat_BLACK.png';
import pubgIcon from './logo_images/Pubg_Logo.png';
import overwatchIcon from './logo_images/overwatch_logo.png';
import lostarkIcon from './logo_images/lost_Ark_Logo.png';
import maplestoryIcon from './logo_images/maplestory_logo.png';

const RegisterFavGame = (props) => {
  const { setFavGame } = props;
  const [lolSelected, setLolSelected] = useState(false);
  const [pubgSelected, setPubgSelected] = useState(false);
  const [overwatchSelected, setOverwatchSelected] = useState(false);
  const [lostarkSelected, setLostarkSelected] = useState(false);
  const [maplestorySelected, setMaplestorySelected] = useState(false);

  const handleLoLSelected = () => {
    setLolSelected(true);
    setPubgSelected(false);
    setOverwatchSelected(false);
    setLostarkSelected(false);
    setMaplestorySelected(false);
  };
  const handlePUBGSelected = () => {
    setLolSelected(false);
    setPubgSelected(true);
    setOverwatchSelected(false);
    setLostarkSelected(false);
    setMaplestorySelected(false);
  };
  const handleOVERWATCHSelected = () => {
    setLolSelected(false);
    setPubgSelected(false);
    setOverwatchSelected(true);
    setLostarkSelected(false);
    setMaplestorySelected(false);
  };
  const handleLOSTARKSelected = () => {
    setLolSelected(false);
    setPubgSelected(false);
    setOverwatchSelected(false);
    setLostarkSelected(true);
    setMaplestorySelected(false);
  };
  const handleMAPLESTORYSelected = () => {
    setLolSelected(false);
    setPubgSelected(false);
    setOverwatchSelected(false);
    setLostarkSelected(false);
    setMaplestorySelected(true);
  };

  return (
    <Fragment>
      <Box
        component='div'
        sx={{
          width: '100%',
          height: '65vh',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <GameIcon
          gameIcon={lolIcon}
          altMessage={'리그오브레전드_아이콘'}
          gameName={'lol'}
          setFavGame={setFavGame}
          isSelected={lolSelected}
          setIsSelected={handleLoLSelected}
        />
        <GameIcon
          gameIcon={pubgIcon}
          altMessage={'배틀그라운드_아이콘'}
          gameName={'pubg'}
          setFavGame={setFavGame}
          isSelected={pubgSelected}
          setIsSelected={handlePUBGSelected}
        />
        <GameIcon
          gameIcon={overwatchIcon}
          altMessage={'오버워치2_아이콘'}
          gameName={'overwatch'}
          setFavGame={setFavGame}
          isSelected={overwatchSelected}
          setIsSelected={handleOVERWATCHSelected}
        />
        <GameIcon
          gameIcon={lostarkIcon}
          altMessage={'로스트아크_아이콘'}
          gameName={'lostark'}
          setFavGame={setFavGame}
          isSelected={lostarkSelected}
          setIsSelected={handleLOSTARKSelected}
        />
        <GameIcon
          gameIcon={maplestoryIcon}
          altMessage={'메이플스토리_아이콘'}
          gameName={'maplestory'}
          setFavGame={setFavGame}
          isSelected={maplestorySelected}
          setIsSelected={handleMAPLESTORYSelected}
        />
      </Box>
    </Fragment>
  );
};

export default RegisterFavGame;
