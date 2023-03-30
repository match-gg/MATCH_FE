import { Typography, Box } from '@mui/material';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Recruitment = props => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 88,
        width: '100%',
        pt: 3,
        pb: 3
      }}>
      <ErrorOutlineIcon />
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 800,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          ml: 1
        }}>
        모집중
      </Typography>
    </Box>
  );
}

export default Recruitment;