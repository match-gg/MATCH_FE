import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Box } from '@mui/material';

import RegisterFooter from './RegisterFooter';
import RegisterHeader from './RegisterHeader';
import RegisterBody from './RegisterBody';
import RegisterTerm from './RegisterTerms';

const RegisterWrapper = () => {
  const navigate = useNavigate();

  const [phase, setPhase] = useState(0);
  const [termAllChecked, setTermAllChecked] = useState(false);
  const allTermChecked = () => {
    setTermAllChecked(true);
  };

  const increasePhase = () => {
    phase < 4 ? setPhase(phase + 1) : navigate('/');
  };
  const decreasePhase = () => {
    phase < 0 ? setPhase(phase - 1) : navigate('/');
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
          {RegisterBody[phase].contents.map((content, idx) => {
            if (phase === 0) {
              return <RegisterTerm key={idx} AllChecked={allTermChecked} />;
            } else {
              return (
                <Container
                  key={idx}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {content}
                </Container>
              );
            }
          })}
        </Box>
        <RegisterFooter
          increasePhase={increasePhase}
          decreasePhase={decreasePhase}
          termAllChecked={termAllChecked}
        />
      </Box>
    </Container>
  );
};

export default RegisterWrapper;
