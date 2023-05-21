import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ChatMessageInDetail = (props) => {
  const { messageInfo } = props;
  const oauth2Id = useSelector((state) => state.user.oauth2Id);
  const isMessageMine = (messageInfo, oauth2Id) => {
    return messageInfo.user.oauth2Id === oauth2Id;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMessageMine(messageInfo, oauth2Id) && 'flex-end',
        width: '100%',
      }}
    >
      <Box
        sx={{
          p: 0.8,
          minWidth: '180px',
          minHeight: '50px',
          maxWidth: '180px',
          borderRadius: '4px',
          m: 0.8,
          backgroundColor: isMessageMine(messageInfo, oauth2Id)
            ? 'white'
            : '#e2e2e2',
          boxShadow: '0 0 1px 1px #ececec',
        }}
      >
        <Typography sx={{ textAlign: 'center' }}>
          {!isMessageMine(messageInfo, oauth2Id) && (
            <strong>{messageInfo.user.nickname}</strong>
          )}
        </Typography>
        <Typography>{messageInfo.content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatMessageInDetail;
