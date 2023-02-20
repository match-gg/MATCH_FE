import React, { Fragment } from 'react';

import InputGameInfo from './InputGameInfo';

import lolIcon from './logo_images/LoL_Icon_Flat_BLACK.png';
import pubgIcon from './logo_images/Pubg_Logo.png';
import overwatchIcon from './logo_images/overwatch_logo.png';
import lostarkIcon from './logo_images/lost_Ark_Logo.png';
import maplestoryIcon from './logo_images/maplestory_logo.png';

const RegisterGames = (props) => {
  const { games, setGames } = props;

  const handleLOLName = (text) => {
    setGames({ ...games, lol: text });
  };
  const handlePUBGName = (text) => {
    setGames({ ...games, pubg: text });
  };
  const handlOVERWATCHName = (text) => {
    setGames({ ...games, overwatch: text });
  };
  const handleLOSTARKName = (text) => {
    setGames({ ...games, lostark: text });
  };
  const handleMAPLESTORYName = (text) => {
    setGames({ ...games, maplestory: text });
  };

  return (
    <Fragment>
      <InputGameInfo
        gameIcon={lolIcon}
        nickname={'소환사명을 입력하세요.'}
        altMessage={'리그오브레전드_아이콘'}
        handleNickName={handleLOLName}
      />
      <InputGameInfo
        gameIcon={pubgIcon}
        nickname={'캐릭터명을 입력하세요.'}
        altMessage={'배틀그라운드_아이콘'}
        handleNickName={handlePUBGName}
      />
      <InputGameInfo
        gameIcon={overwatchIcon}
        nickname={'플레이어 이름 또는 배틀태그#1234 입력하세요.'}
        altMessage={'오버워치_아이콘'}
        handleNickName={handlOVERWATCHName}
      />
      <InputGameInfo
        gameIcon={lostarkIcon}
        nickname={'캐릭터명을 입력하세요.'}
        altMessage={'로스트아크_아이콘'}
        handleNickName={handleLOSTARKName}
      />
      <InputGameInfo
        gameIcon={maplestoryIcon}
        nickname={'캐릭터명을 입력하세요.'}
        altMessage={'메이플스토리_아이콘'}
        handleNickName={handleMAPLESTORYName}
      />
    </Fragment>
  );
};

export default RegisterGames;
