import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ChatMessageInDetail = (props) => {
  const { messageInfo, msgBySameSender } = props;
  const oauth2Id = useSelector((state) => state.user.oauth2Id);
  const isMessageMine = (messageInfo, oauth2Id) => {
    return messageInfo.user.oauth2Id === oauth2Id;
  };

  const date = messageInfo.timestamp ? new Date(messageInfo.timestamp) : null;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMessageMine(messageInfo, oauth2Id) ? 'flex-end' : 'flex-start',
        width: '100%',
      }}
    >
      <Typography sx={{ textAlign: 'center', mt: !msgBySameSender ? 1 : 0 }}>
        {!isMessageMine(messageInfo, oauth2Id) && !msgBySameSender && (
          <strong>{messageInfo.user.nickname}</strong>
        )}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: isMessageMine ? 'row' : 'row-reverse' }}>
        <Box
          sx={{
            mt: !msgBySameSender ? 1 : 0,
            ml: 2,
            p: 1,
            display: 'flex',
            flexDirection: 'row',
            wordBreak: 'break-all',
            width: 'fit-content',
            maxWidth: '80%',
            borderRadius: '8px',
            backgroundColor: isMessageMine(messageInfo, oauth2Id) ? 'white' : '#e2e2e2',
            boxShadow: '0 0 1px 1px #ececec',
          }}
        >
          <Typography>{messageInfo.content}</Typography>
        </Box>
        {date && (
          <Box sx={{ display: 'flex', alignItems: 'flex-end', pl: 1, pb: 0.5 }}>
            <Typography sx={{ color: 'grey', fontSize: 12 }}>
              {date.toTimeString().split(' ')[0].slice(0, 5)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatMessageInDetail;
