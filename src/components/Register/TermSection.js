import React from 'react';

import { Box, Checkbox, Typography, Container } from '@mui/material';
import { Fragment } from 'react';

const TermSection = (props) => {
  const { term, agreeTerm, disagreeTerm, title, termContents } = props;

  return (
    <Fragment>
      <Typography
        sx={{
          textAlign: 'center',
        }}
      >
        {title}
      </Typography>
      <Box
        component='div'
        sx={{
          padding: '10px',
          paddingLeft: '20px',
          backgroundColor: '#f7f7f7',
          borderRadius: '5px',
          height: '15vh',
          marginBottom: '0px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'auto',
          gap: 2,
        }}
      >
        {termContents}
      </Box>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        {'위의 약관을 읽었으며, 이에 동의하시겠습니까?'}
        <Box>
          <Checkbox checked={term} onClick={agreeTerm} />
          {'동의합니다'}
          <Checkbox checked={!term} onClick={disagreeTerm} />
          {'동의하지 않습니다.'}
        </Box>
      </Container>
    </Fragment>
  );
};

export default TermSection;
