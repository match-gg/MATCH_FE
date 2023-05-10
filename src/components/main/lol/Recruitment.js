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
        minHeight: 80,
        width: 520,
        backgroundColor: '#F3F3F3',
        color: '#5C5C5C',
        border: '1px solid #CCCCCC',
        borderRadius: 2,
        p: 2,
        mb: 1
      }}>
      <ErrorOutlineIcon/>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 600,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          pl: 1,
        }}>
        모집 중
      </Typography>
    </Box>
  );
}

export default Recruitment;