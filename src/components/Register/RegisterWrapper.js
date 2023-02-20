import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Box } from '@mui/material';

import RegisterFooter from './RegisterFooter';
import RegisterHeader from './RegisterHeader';
import RegisterTerm from './RegisterTerms';
import RegisterGames from './RegisterGames';
import RegisterFavGame from './RegisterFavGame';
import RegisterNotification from './RegisterNotification';
import RegisterSuccess from './RegisterSuccess';

const RegisterWrapper = (props) => {
  const { registerInfo, setRegisterInfo } = props;

  const navigate = useNavigate();

  const [phase, setPhase] = useState(0);
  const [agreeAllTerm, setAgreeAllTerm] = useState(false);
  const [games, setGames] = useState({});
  const [favGame, setFavGame] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();

  const increasePhase = () => {
    phase < 4 ? setPhase(phase + 1) : navigate('/');
  };
  const decreasePhase = () => {
    phase > 0 ? setPhase(phase - 1) : navigate('/');
  };

  const handleNextBtn = () => {
    setRegisterInfo({
      agreeAllTerm: agreeAllTerm,
      games: games,
      favGame: favGame,
      phoneNumber: phoneNumber,
    });
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
              activateNextBtn={activateNextBtn}
              deactivateNextBtn={deactivateNextBtn}
            />
          )}
          {phase === 1 && <RegisterGames games={games} setGames={setGames} />}
          {phase === 2 && <RegisterFavGame setFavGame={setFavGame} />}
          {phase === 3 && (
            <RegisterNotification setPhoneNumber={setPhoneNumber} />
          )}
          {phase === 4 && <RegisterSuccess />}
        </Box>
        <RegisterFooter
          phase={phase}
          increasePhase={increasePhase}
          decreasePhase={decreasePhase}
          termAllChecked={agreeAllTerm}
          handleNextBtn={handleNextBtn}
        />
      </Box>
    </Container>
  );
};

export default RegisterWrapper;
