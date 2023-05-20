import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
// import moment from 'moment';

const ChatMessage = (props) => {
  const { messageInfo } = props;
  // const oauth2Id = useSelector((state) => state.user.oauth2Id);
  const oauth2Id = 'kakaoTT123';

  const isMessageMine = (messageInfo, oauth2Id) => {
    return messageInfo.user.oauth2Id === oauth2Id;
  };

  return (
    <Box
      sx={{
        maxWidth: '200px',
        // backgroundColor: '#e2e2e2',
        border: '1px solid #ececec',
        marginTop: '14px',
        borderRadius: '12px',
        padding: '5px',
        position: isMessageMine(messageInfo, oauth2Id) && 'relative',
        left: isMessageMine(messageInfo, oauth2Id) && '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        <Typography
          sx={{
            fontSize: 'small',
            textAlign: 'start',
          }}
        >
          <strong>{messageInfo.user.nickname}</strong>님
        </Typography>
      </Box>
      <Box
        sx={{
          padding: '5px ',
          maxWidth: '180px',
          backgroundColor: '#e2e2e2',
          borderRadius: '4px',
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
          {messageInfo.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
