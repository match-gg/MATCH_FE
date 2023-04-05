import React from 'react';
import { Container, Box, Typography, Link as MuiLink } from '@mui/material';

const MainFooter = () => {
  return (
    <Box sx={{ height: '100%', width: '100%', backgroundColor: '#f3f3f3', pt: 4 }}>
      <Container
        maxWidth='sm'
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <MuiLink href='https://github.com/match-gg' color='#3d3939'>
            GitHub
          </MuiLink>
          <MuiLink href='' color='#3d3939'>
            Notion
          </MuiLink>
          <MuiLink href='' color='#3d3939'>
            Discord
          </MuiLink>
        </Box>
        <Typography sx={{ color: '3d3939', fontSize: 12, mt: 1 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Typography>
        <Typography sx={{ color: '3d3939', fontSize: 12, my: 1 }}>
          SangMyung Univ. Capstone Project 2023
        </Typography>
        <Typography sx={{ fontSize: 48, fontWeight: 700, fontStyle: 'italic', color: '#3d3939' }}>
          Match.GG
        </Typography>
      </Container>
    </Box>
  );
};

export default MainFooter;
