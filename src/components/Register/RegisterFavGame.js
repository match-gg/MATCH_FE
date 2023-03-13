import { Fragment } from 'react';

import { Box } from '@mui/material';

import GameIcon from './GameIcon';
import { GameDatas } from './datas/Game.data';

const RegisterFavGame = () => {
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
        {GameDatas.map((content, idx) => {
          return (
            <GameIcon
              key={idx}
              gameIcon={content.gameIcon}
              altMessage={content.altMessage}
              gameName={content.gameName}
            />
          );
        })}
      </Box>
    </Fragment>
  );
};

export default RegisterFavGame;
