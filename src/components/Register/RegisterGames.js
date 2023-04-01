import React  from 'react';

import InputGameInfo from './InputGameInfo';

import { GameDatas } from './datas/Game.data';
import { Box } from '@mui/material';

const RegisterGames = () => {

  return (
    <Box sx={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 1
    }}>
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
    </Box>
  );
};

export default RegisterGames;
