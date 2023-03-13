import React, { Fragment } from 'react';

import InputGameInfo from './InputGameInfo';

import { GameDatas } from './datas/Game.data';

const RegisterGames = () => {
  
  return (
    <Fragment>
      {GameDatas.map((content, idx) => {
        return (
          <InputGameInfo
            key={idx}
            gameIcon={content.gameIcon}
            labelText={content.labelText}
            altMessage={content.altMessage}
            gameName={content.gameName}
          />
        );
      })}
    </Fragment>
  );
};

export default RegisterGames;
