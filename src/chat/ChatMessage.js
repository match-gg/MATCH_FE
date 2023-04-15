import { Box, Typography } from '@mui/material';
import moment from 'moment';

const ChatMessage = (props) => {
  const { user, message } = props;
  // console.log(user);

  const timeFromNow = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  const isMessageMine = (message, user) => {
    return message.name === user.nickname;
  };

  return (
    <Box
      sx={{
        // width: '200px',
        maxWidth: '200px',
        backgroundColor: '#e2e2e2',
        marginTop: '14px',
        borderRadius: '20px',
        padding: '5px',
        position: isMessageMine(message, user) && 'relative',
        left: isMessageMine(message, user) && '80px',
      }}
    >
      <Typography textAlign='center' sx={{ fontSize: 'small' }}>
        <strong>{message.name}</strong> 님
      </Typography>
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
