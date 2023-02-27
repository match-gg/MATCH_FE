import React, { Fragment } from 'react';

import InputGameInfo from './InputGameInfo';

import lolIcon from './logo_images/LoL_Icon_Flat_BLACK.png';
import pubgIcon from './logo_images/Pubg_Logo.png';
import overwatchIcon from './logo_images/overwatch_logo.png';
import lostarkIcon from './logo_images/lost_Ark_Logo.png';
import maplestoryIcon from './logo_images/maplestory_logo.png';

const RegisterGames = (props) => {
  const { games, setGames, registerInfo } = props;

  const handleLOLName = (name) => {
    setGames({ ...games, lol: name });
  };
  const handlePUBGName = (name) => {
    setGames({ ...games, pubg: name });
  };
  const handleOVERWATCHName = (name) => {
    setGames({ ...games, overwatch: name });
  };
  const handleLOSTARKName = (name) => {
    setGames({ ...games, lostark: name });
  };
  const handleMAPLESTORYName = (name) => {
    setGames({ ...games, maplestory: name });
  };

  const GameInfos = [
    {
      gameName: 'lol',
      gameIcon: lolIcon,
      labelText: '소환사명을 입력하세요',
      altMessage: '리그오브레전드_아이콘',
      handleNickName: handleLOLName,
    },
    {
      gameName: 'pubg',
      gameIcon: pubgIcon,
      labelText: '캐릭터명을 입력하세요.',
      altMessage: '배틀그라운드_아이콘',
      handleNickName: handlePUBGName,
    },
    {
      gameName: 'overwatch',
      gameIcon: overwatchIcon,
      labelText: '플레이어 이름 또는 배틀태그#1234 입력하세요.',
      altMessage: '오버워치_아이콘',
      handleNickName: handleOVERWATCHName,
    },
    {
      gameName: 'lostark',
      gameIcon: lostarkIcon,
      labelText: '캐릭터명을 입력하세요',
      altMessage: '로스트아크_아이콘',
      handleNickName: handleLOSTARKName,
    },
    {
      gameName: 'maplestory',
      gameIcon: maplestoryIcon,
      labelText: '캐릭터명을 입력하세요',
      altMessage: '메이플스토리_아이콘',
      handleNickName: handleMAPLESTORYName,
    },
  ];

  return (
    <Fragment>
      {GameInfos.map((content, idx) => {
        return (
          <InputGameInfo
            key={idx}
            gameIcon={content.gameIcon}
            labelText={content.labelText}
            altMessage={content.altMessage}
            handleNickName={content.handleNickName}
            registerInfo={registerInfo}
            gameName={content.gameName}
          />
        );
      })}
    </Fragment>
  );
};

export default RegisterGames;
