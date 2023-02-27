import { Box, Container, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#202124',
        padding: '20px',
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          height='100%'
          width='100%'
          color='white'
          textAlign='center'
          justifyContent='center'
          justifyItems='center'
          backgroundColor='5c5c5c'
        >
          <Grid item xs={3} margin='auto 0'>
            <Typography variant='h3'>MATCH.GG</Typography>
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant='h6'>
              2023 Sangmyung Univ Capstone Project
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant='h5'>members</Typography>
                <Typography variant='subtitle1'>
                  201810948 송민우
                  <br />
                  201810949 송수근
                  <br />
                  201811432 나주엽
                  <br />
                  202010859 노명욱
                  <br />
                  202010894 이성규
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h5'>services</Typography>
                <Link
                  href='#'
                  variant='subtitle1'
                  underline='hover'
                  color='white'
                >
                  LEAGE OF LEGENDS
                  <br />
                </Link>
                <Link
                  href='#'
                  variant='subtitle1'
                  underline='hover'
                  color='white'
                >
                  BATTLEGROUNDS
                  <br />
                </Link>
                <Link
                  href='#'
                  variant='subtitle1'
                  underline='hover'
                  color='white'
                >
                  OVERWATCH2
                  <br />
                </Link>
                <Link
                  href='#'
                  variant='subtitle1'
                  underline='hover'
                  color='white'
                >
                  MAPLE STORY
                  <br />
                </Link>
                <Link
                  href='#'
                  variant='subtitle1'
                  underline='hover'
                  color='white'
                >
                  LOSTARK
                </Link>
              </Grid>
              <Grid item xs={4} paddingTop='5px'>
                <Link
                  href='https://github.com/match-gg'
                  variant='subtitle2'
                  underline='hover'
                >
                  Github
                </Link>
              </Grid>
              <Grid item xs={4} paddingTop='5px'>
                <Link href='#' variant='subtitle2' underline='hover'>
                  Notion
                </Link>
              </Grid>
              <Grid item xs={4} paddingTop='5px'>
                <Link href='#' variant='subtitle2' underline='hover'>
                  e-mail : matchgg@naver.com
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
