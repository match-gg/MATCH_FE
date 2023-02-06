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
        color: '#000000',
        height: '5rem',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth='lg'>
        <Toolbar>
          <Typography
            component={RouterLink}
            to='/'
            variant='h4'
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'black',
            }}
          >
            Match.GG
          </Typography>
          <Stack direction='row' spacing={2}>
            {/* <Button
              component={RouterLink}
              to='/aboutus'
              variant='text'
              color='inherit'
              sx={{
                marginRight: '1rem',
                '&:hover': {
                  borderRadius: '0',
                  color: 'black',
                  backgroundColor:'white',
                  borderBottom: '3px solid black',
                },
              }}
            >
              About US
            </Button> */}
            <Button
              component={RouterLink}
              to='/login'
              variant='text'
              color='inherit'
              sx={{
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
