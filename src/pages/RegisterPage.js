import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Box } from '@mui/material';

import RegisterHeader from '../components/Register/RegisterHeader';
import RegisterTerm from '../components/Register/RegisterTerms';
import RegisterGames from '../components/Register/RegisterGames';
import RegisterFavGame from '../components/Register/RegisterFavGame';
import RegisterSuccess from '../components/Register/RegisterSuccess';
import RegisterFooter from '../components/Register/RegisterFooter';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState(0);

  const increasePhase = () => {
    phase < 3 ? setPhase(phase + 1) : navigate('/');
  };

  const decreasePhase = () => {
    phase > 0 ? setPhase(phase - 1) : navigate('/login');
  };

  return (<Container component='main' maxWidth='xl'>
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
      {phase === 0 && <RegisterTerm />}
      {phase === 1 && <RegisterGames />}
      {phase === 2 && <RegisterFavGame />}
      {phase === 3 && <RegisterSuccess />}
    </Box>
    {phase < 3 && (
      <RegisterFooter
        phase={phase}
        increasePhase={increasePhase}
        decreasePhase={decreasePhase}
      />
    )}
  </Box>
</Container>)
};

export default RegisterPage;
