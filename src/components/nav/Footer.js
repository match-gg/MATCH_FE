import { Box, Container, Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '50vh',
        backgroundColor: '#6b6b6b',
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Grid container direction='column' alignItems='center' justifyContent="space-between">
          <Grid item xs={12}>
            <Typography color='black' variant='h2'>
              Match.GG
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color='textSecondary' variant='subtitle1'>
              {`${new Date().getFullYear()} | React | Material UI | React Router`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
