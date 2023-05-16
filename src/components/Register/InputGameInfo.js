import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, TextField, Button, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { registerActions } from '../../store/register-slice';
import GameIcon from './GameIcon';
import { api } from '../../api/api';

const InputGameInfo = ({ gameIcon, labelText, altMessage, gameName, helperText }) => {
  const { games, gamesCheck } = useSelector((state) => state.register);

  const [warning, setWarning] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const dispatch = useDispatch();

  const changeTextField = (e) => {
    dispatch(
      registerActions.SET_GAMES_WITH_ID({
        id: e.target.id,
        value: e.target.value.trim(),
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
    if (games[gameName] !== '') {
      setIsPending(true);
      await api
        .get(`/api/${gameName}/exist/${games[gameName]}`)
        .then((response) => {
          if (response.status === 200) {
            dispatch(registerActions.SET_GAMESCHECK_WITH_ID({ id: gameName }));
            setWarning(false);
          } else {
            setWarning(true);
          }
          setIsPending(false);
        })
        .catch((error) => {
          setIsPending(false);
          setWarning(true);
        });
    }
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
          focused={gamesCheck[gameName] && games[gameName]}
          value={games[gameName]}
          InputProps={{
            endAdornment:
              games[gameName] && isPending ? (
                <CircularProgress size={'1.5rem'} color='inherit' />
              ) : gamesCheck[gameName] && games[gameName] !== '' ? (
                <CheckIcon color='primary' />
              ) : (
                <Button
                  onClick={verifyingNickname}
                  sx={{ width: 80, display : games[gameName] === '' ? 'none' : 'block'}}
                >
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
