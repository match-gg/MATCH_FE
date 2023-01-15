import React from 'react';

import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';

const Navbar = () => {
  return (
    <AppBar
      component='nav'
      position='fixed'
      sx={{
        background: 'transparent',
        backgroundColor: 'e8e8e8',
        color: '#000000',
        height: '5rem',
        justifyContent: 'center',
        // boxShadow: 'none',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar>
          <Typography
            variant='h4'
            component='div'
            sx={{
              flexGrow: 1,
            }}
          >
            Match.gg
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button
              variant='text'
              color='inherit'
              sx={{
                marginRight: '1rem',
                '&:hover': {
                  borderRadius: '0',
                  color: 'black',
                  borderBottom: '3px solid black',
                },
              }}
            >
              About US
            </Button>
            <Button
              variant='text'
              color='inherit'
              sx={{
                '&:hover': {
                  borderRadius: '0',
                  color: 'black',
                  borderBottom: '3px solid black',
                },
              }}
            >
              Login / Register
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
