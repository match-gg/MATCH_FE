import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';

import TermSection from './TermSection';
import { RegisterTermContents } from './datas/Register.data';
import { registerActions } from '../../store/register-slice';

const RegisterTerm = (props) => {
  const dispatch = useDispatch();

  const { firstTerm, secondTerm } = useSelector((state) => state.register);

  const firstTermHandler = (event) => {
    dispatch(registerActions.SET_FIRST_TERM(event.target.checked));
  };

  const secondTermHandler = (event) => {
    dispatch(registerActions.SET_SECOND_TERM(event.target.checked));
  };

  return (
    <Box
      maxWidth='lg'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 2
      }}
    >
      <TermSection
        title={'MATCH.GG 약관 동의'}
        term={firstTerm}
        termHandler={firstTermHandler}
        termContents={RegisterTermContents[0]}
      />
      <TermSection
        title={'개인정보 약관 동의'}
        term={secondTerm}
        termHandler={secondTermHandler}
        termContents={RegisterTermContents[1]}
      />
    </Box>
  );
};

export default RegisterTerm;
