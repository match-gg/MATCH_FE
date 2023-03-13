import React, { Fragment } from 'react';

import { Box, Checkbox, Typography, Container } from '@mui/material';

const TermSection = (props) => {
  const { title, termContents, term, termHandler } = props;

  return (
    <Fragment>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: 24,
        }}
      >
        {title}
      </Typography>
      <Box
        component='div'
        sx={{
          padding: 4,
          backgroundColor: '#f7f7f7',
          borderRadius: 4,
          height: 360,
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
        <Box>
          <Checkbox checked={term} onChange={termHandler}/>
          {`위의 ${title}을 읽었으며, 위 사항에 동의합니다.`}
        </Box>
      </Container>
    </Fragment>
  );
};

export default TermSection;
