import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatBtn from './ChatBtn';

const ChatToggleBtn = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return open ? (
    <ChatList open={open} handleOpen={handleOpen} />
  ) : (
    <ChatBtn open={open} handleOpen={handleOpen} />
  );
};

export default ChatToggleBtn;
