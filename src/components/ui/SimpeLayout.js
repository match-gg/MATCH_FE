import { Container, Box, Typography } from '@mui/material';
import Copyright from '../../components/ui/Copyright';

const SimpleLayout = (props) => {

  return (
    <Container component='main' maxWidth='md'>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          overflow: 'none',
        }}
      >
        <Typography
          component='h1'
          variant='h3'
          sx={{
            marginTop: 5,
            fontStyle: 'italic',
            fontSize: { xs: 35, sm: 45 },
            fontWeight: '700',
          }}
        >
          Match.GG
        </Typography>
        <Box
          sx={{
            marginTop: { xs: 1, sm: 1 },
            display: 'flex',
            flexDirection: 'row',
            justifyContetns: 'center',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
          }}
        ></Box>
        <Box
          component='div'
          sx={{
            width: '100%',
            display: 'flex',
            height: { xs: 'calc(100% - 250px)', sm: 'calc(100% - 305px)' },
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'auto',
            gap: 2,
          }}
        >
          {props.children}
        </Box>
        <Box
          component='div'
          sx={{
            position: 'fixed',
            bottom: 0,
            height: { xs: 70, sm: 100 },
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'start',
            justifyContent: 'center',
            backgroundColor: 'white',
            gap: 4,
          }}
        >
          <Copyright
            sx={{ position: 'absolute', bottom: 0, fontSize: { xs: 13, sm: 15 }, width: 500 }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default SimpleLayout;
