import { Box, Typography } from '@mui/material';

const SystemMessage = (props) => {
  const { messageInfo } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        color: 'gray',
      }}
    >
      <Typography sx={{ fontSize: 'small' }}>{messageInfo.content}</Typography>
    </Box>
  );
};

export default SystemMessage;
