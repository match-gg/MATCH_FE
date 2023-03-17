import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Typography } from '@mui/material';

import GameIcon from './GameIcon';
import { GameDatas } from './datas/Game.data';
import { registerActions } from '../../store/register-slice';

const RegisterFavGame = () => {
  const dispatch = useDispatch();

  const { games, representative } = useSelector((state) => state.register);
  const [warning, setWarning] = useState(false);

  const setRepresentative = (e) => {
    if (games[e.target.id] === '') {
      setWarning(true);
    } else {
      setWarning(false);
      dispatch(registerActions.SET_REPRESENTATIVE(e.target.id));
    }
  };

  return (
    <Fragment>
      <Typography
        sx={{
          color: 'red',
        }}
      >
        {warning && '대표게임으로 설정하려면 우선 게임 정보를 입력해야 합니다.'}
      </Typography>
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
              key={content.gameName}
              gameIcon={content.gameIcon}
              altMessage={content.altMessage}
              gameName={content.gameName}
              onClickHandler={setRepresentative}
              selected={representative === content.gameName ? true : false}
            />
          );
        })}
      </Box>
    </Fragment>
  );
};

export default RegisterFavGame;
