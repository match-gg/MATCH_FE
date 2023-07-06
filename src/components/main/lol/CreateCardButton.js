import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

const CreateCardButton = () => {
  const location = useLocation();
  return (
    <Link to='new' state={{ background: location }}>
      <Button
        variant='outlined'
        sx={{
          height: 36,
          borderColor: '#dddddd',
          color: 'black',
          '&:hover': {
            borderColor: '#dddddd',
            color: 'black',
            backgroundColor: '#f3f3f3',
          },
        }}
      >
        글 작성하기
      </Button>
    </Link>
  );
};

export default CreateCardButton;
