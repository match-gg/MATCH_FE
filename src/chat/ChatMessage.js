import { Box, Typography } from '@mui/material';
import moment from 'moment';

const ChatMessage = (props) => {
  const { user, message } = props;

  const timeFromNow = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  const isMessageMine = (message, user) => {
    return message.name === user.nickname;
  };

  return (
    <Box
      sx={{
        maxWidth: '200px',
        backgroundColor: '#e2e2e2',
        marginTop: '14px',
        borderRadius: '12px',
        padding: '5px',
        position: isMessageMine(message, user) && 'relative',
        left: isMessageMine(message, user) && '60px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'end',
        }}
      >
        <Typography sx={{ fontSize: 'small', textAlign: 'start' }}>
          <strong>{message.name}</strong> 님
        </Typography>
        <Typography
          sx={{
            fontSize: '4px',
            marginLeft: '12px',
            textAlign: 'end',
          }}
        >
          {timeFromNow(message.timestamp)}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: '5px ',
          maxWidth: '180px',
        }}
      >
        <Typography
          sx={{
            fontSize: 'small',
            whiteSpace: 'normal',
            width: '180px',
            maxWidth: '180px',
            lineBreak: 'anywhere',
          }}
        >
          {message.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
