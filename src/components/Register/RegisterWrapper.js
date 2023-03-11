import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Box } from '@mui/material';

import RegisterFooter from './RegisterFooter';
import RegisterHeader from './RegisterHeader';
import RegisterTerm from './RegisterTerms';
import RegisterGames from './RegisterGames';
import RegisterFavGame from './RegisterFavGame';
import RegisterSuccess from './RegisterSuccess';

const RegisterWrapper = (props) => {
  const { registerInfo, setRegisterInfo } = props;

  const navigate = useNavigate();

  const [phase, setPhase] = useState(0);
  const [agreeAllTerm, setAgreeAllTerm] = useState(false);
  const [games, setGames] = useState({ ...registerInfo.games });

  const increasePhase = () => {
    phase < 3 ? setPhase(phase + 1) : navigate('/');
  };
  const decreasePhase = () => {
    phase > 0 ? setPhase(phase - 1) : navigate('/login');
  };

  const handleNextBtn = () => {
    setRegisterInfo({
      ...registerInfo,
      games: games,
    });
  };

  const setFavGame = (favGame) => {
    setRegisterInfo({ ...registerInfo, favGame: favGame });
  };

  const activateNextBtn = () => {
    setAgreeAllTerm(true);
  };
  const deactivateNextBtn = () => {
    setAgreeAllTerm(false);
  };

  return (
    <Container component='main' maxWidth='md'>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          overflow: 'none',
        }}
      >
        <RegisterHeader phase={phase} />
        <Box
          component='div'
          sx={{
            margin: '10px',
            width: '100%',
            display: 'flex',
            height: {
              xs: 'calc(100% - 250px)',
              sm: 'calc(100% - 305px)',
            },
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'auto',
            gap: 2,
          }}
        >
          {/* 페이지별 내용 */}
          {phase === 0 && (
            <RegisterTerm
              registerInfo={registerInfo}
              setRegisterInfo={setRegisterInfo}
              activateNextBtn={activateNextBtn}
              deactivateNextBtn={deactivateNextBtn}
            />
          )}
          {phase === 1 && (
            <RegisterGames
              games={games}
              setGames={setGames}
              registerInfo={registerInfo}
            />
          )}
          {phase === 2 && (
            <RegisterFavGame
              registerInfo={registerInfo}
              setRegisterInfo={setRegisterInfo}
              setFavGame={setFavGame}
            />
          )}
          {phase === 3 && <RegisterSuccess />}
        </Box>
        {phase < 3 && (
          <RegisterFooter
            registerInfo={registerInfo}
            phase={phase}
            increasePhase={increasePhase}
            decreasePhase={decreasePhase}
            termAllChecked={agreeAllTerm}
            handleNextBtn={handleNextBtn}
          />
        )}
      </Box>
    </Container>
  );
};

export default RegisterWrapper;
