import React from 'react';

import { Box, Checkbox, Typography, Container, FormControlLabel } from '@mui/material';

const TermSection = (props) => {
  const { title, termContents, term, termHandler } = props;

  return (
    <Box>
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
          height: 500,
          width: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'scroll',
          gap: 2,
        }}
      >
        {termContents}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={term} onChange={termHandler} />}
          label={`위의 내용을 읽었으며, 위 사항에 동의합니다.`}
        />
      </Box>
    </Box>
  );
};

export default TermSection;
