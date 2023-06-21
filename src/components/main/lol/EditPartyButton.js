import React from 'react';

import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const EditPartyButton = (props) => {
  const { id } = props;
  return (
    <Link
      to={`/lol/edit?id=${id}`}
      style={{ width: '100%' }}
      state={{ background: '/lol' }}
    >
      <Button
        fullWidth
        variant='outlined'
        size='small'
        color='primary'
        sx={{
          p: 1,
          height: 40,
          borderColor: '#CCCCCC',
          fontWeight: 700,
          ':hover': {
            borderColor: '#dddddd',
            backgroundColor: '#f3f3f3',
          },
        }}
      >
        게시글 수정
      </Button>
    </Link>
  );
};

export default EditPartyButton;
