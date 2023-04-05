import { Box, Container, Grid, Link as MuiLink, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#3d3939',
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 4 }}>
            <Typography
              sx={{ fontSize: 48, fontStyle: 'italic', fontWeight: 700, color: '#DDDDDD' }}
            >
              Match.GG
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
            }}
          >
            <Box sx={{ display: 'flex', gap: 8, alignItems: 'center', px: 4, mb:2 }}>
              <MuiLink href='https://github.com/match-gg' color='#DDDDDD'>
                GitHub
              </MuiLink>
              <MuiLink href='#' color='#DDDDDD'>
                Notion
              </MuiLink>
              <MuiLink href='#' color='#DDDDDD'>
                Discord
              </MuiLink>
            </Box>
            <Typography sx={{ fontSize: 12, color: '#DDDDDD' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
