import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, TextField, Button } from '@mui/material';

import { registerActions } from '../../store/register-slice';
import GameIcon from './GameIcon';
import { api } from '../../api/api';

const InputGameInfo = ({ gameIcon, labelText, altMessage, gameName, helperText }) => {
  const { games } = useSelector((state) => state.register);

  const [warning, setWarning] = useState(false);

  const dispatch = useDispatch();

  const changeTextField = (e) => {
    dispatch(
      registerActions.SET_GAMES_WITH_ID({
        id: e.target.id,
        value: e.target.value.replaceAll(' ', ''),
      })
    );
  };

  useEffect(() => {
    if (games[gameName] === '') {
      dispatch(registerActions.SET_GAMESCHECK_WITH_ID({ id: gameName }));
      setWarning(false);
    }
  }, [dispatch, gameName, games]);

  const verifyingNickname = async () => {
    await api
      .get(`/api/${gameName}/exist/${games[gameName]}`)
      .then((response) => {
        console.log(response.data);
        if (JSON.stringify(response.data).indexOf('true') !== -1) {
          dispatch(registerActions.SET_GAMESCHECK_WITH_ID({ id: gameName }));
          setWarning(false);
        } else {
          setWarning(true);
        }
      })
      .catch((error) => {
        setWarning(true);
      });
  };

  return (
    <Box
      component='div'
      sx={{
        width: '40%',
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContents: 'center',
      }}
    >
      <GameIcon gameIcon={gameIcon} altMessage={altMessage} />
      <Box
        component='div'
        sx={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          id={gameName}
          fullWidth
          label={labelText}
          error={warning ? true : false}
          helperText={warning && helperText}
          variant='outlined'
          onChange={changeTextField}
          defaultValue={games[gameName]}
          value={games[gameName]}
          InputProps={{
            endAdornment: games[gameName] && (
              <Button onClick={verifyingNickname} sx={{ width: 80 }}>
                인증하기
              </Button>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default InputGameInfo;
