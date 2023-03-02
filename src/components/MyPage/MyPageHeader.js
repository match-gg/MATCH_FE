import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const MyPageHeader = () => {
  return (
    <Box>
      <AppBar
        component='nav'
        position='relative'
        elevation={0}
        sx={{
          backgroundColor: 'white',
          color: '#000000',
          height: 100,
          justifyContent: 'center'
        }}>
        <Box
          sx={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'none'
          }}>
          <Toolbar>
            <Typography
              component={RouterLink}
              to='/'
              variant='h3'
              sx={{
                fontStyle: 'italic',
                textDecoration: 'none',
                color: 'black',
                fontSize: { xs: 35, sm: 45 },
                fontWeight: '700'
              }}>
              Match.GG
            </Typography>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
};

export default MyPageHeader;
