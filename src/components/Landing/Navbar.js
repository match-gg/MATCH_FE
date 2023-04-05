import React from 'react';

import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar
      component='nav'
      position='fixed'
      sx={{
        backgroundColor: 'white',
        color: '#3d3939',
        height: 80,
        justifyContent: 'center',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar>
          <Typography
            component={RouterLink}
            to='/'
            sx={{
              flexGrow: 1,
              fontSize: 40,
              fontWeight: '700',
              fontStyle: 'italic',
              color: '#3d3939',
              textDecoration: 'none',
            }}
          >
            Match.GG
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button
              component={RouterLink}
              to='/login'
              variant='text'
              color='inherit'
              sx={{
                fontSize: 16,
                fontWeight: '600',
                '&:hover': {
                  borderRadius: '0',
                  color: 'black',
                  backgroundColor: 'white',
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
