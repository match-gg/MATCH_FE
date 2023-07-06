import React from 'react';

import { Button } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';

const ShortcutIconButton = (props) => {
  const { open, handleOpen } = props;

  return (
    <Button
      onClick={handleOpen}
      variant='contained'
      sx={{
        width: '60px',
        height: '60px',
        position: 'fixed',
        zIndex: '100',
        right: '40px',
        bottom: '40px',
        borderRadius: '15px',
        backgroundColor: open ? 'rgba(60,57,57,0.5)' : '#3c3939',
        '&:hover': {
          backgroundColor: 'rgba(60,57,57,0.65)',
        },
      }}
    >
      <GroupsIcon fontSize='large' />
    </Button>
  );
};

export default ShortcutIconButton;
