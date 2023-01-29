import { Typography, Link } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.https://github.com/match-gg/'>
        Match.GG
      </Link>
      {' - '}
      {'SangMyung Univ. Capstone Project'}
    </Typography>
  );
}

export default Copyright;
